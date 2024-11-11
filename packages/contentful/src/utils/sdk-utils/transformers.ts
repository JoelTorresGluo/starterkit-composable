import { BLOCKS, INLINES } from '@contentful/rich-text-types'

export interface RichTextTable {
  nodeType: 'table'
  data: Data
  content: RichTextTableRow[]
}

interface RichTextTableRow {
  nodeType: 'table-row'
  data: Data
  content: RichTextTableCell[]
}

interface RichTextTableCell {
  nodeType: 'table-header-cell' | 'table-cell'
  data: Data
  content: RichTextTableParagraph[]
}

interface RichTextTableParagraph {
  nodeType: 'paragraph'
  data: Data
  content: (RichTextTableText | RichTextTableHyperLink)[]
}

interface RichTextTableText {
  nodeType: 'text'
  value: string
  marks: any[]
  data: Data
}

interface RichTextTableHyperLink {
  nodeType: 'hyperlink'
  data: Data<{
    uri: string
  }>
  content: RichTextTableText[]
}

type Data<T = {}> = {} & T

type TableNodeContent = {
  text: string
  href?: string
} | null

export const transformRichTextTable = (richTextTable: RichTextTable) => {
  return {
    // each cell can have multiple lines (paragraphs) within
    headers: extractHeadersContent(richTextTable),
    data: extractDataCellsContent(richTextTable),
  }
}

const extractHeadersContent = (richTextTable: RichTextTable) => {
  return richTextTable.content.reduce<TableNodeContent[][]>((acc, row) => {
    const headingsContent = row.content
      .filter((cell) => cell.nodeType === BLOCKS.TABLE_HEADER_CELL)
      .reduce<TableNodeContent[][]>((accum, row) => {
        const headingCellParagraphsContent = row.content.map((p) =>
          getRichTextTableParagraphContent(p)
        )
        return [...accum, headingCellParagraphsContent]
      }, [])
    return [...acc, ...headingsContent]
  }, [])
}

const extractDataCellsContent = (richTextTable: RichTextTable) => {
  return richTextTable.content.reduce<TableNodeContent[][][]>((acc, row) => {
    const tableCells = row.content.filter(
      (cell) => cell.nodeType === BLOCKS.TABLE_CELL
    )
    if (tableCells.length === 0) return acc

    const cellContent = tableCells.reduce<TableNodeContent[][]>(
      (accum, row) => {
        const cellParagraphsContent = row.content.map((p) =>
          getRichTextTableParagraphContent(p)
        )
        return [...accum, cellParagraphsContent]
      },
      []
    )
    return [...acc, cellContent]
  }, [])
}

const getRichTextTableParagraphContent = (p: RichTextTableParagraph) => {
  // hyperlinks attach empty text nodes before and after the hyperlink for some reason (ignore those)
  const hyperlinkNode = p.content.find(
    (node) => node.nodeType === INLINES.HYPERLINK
  )
  if (hyperlinkNode && hyperlinkNode.nodeType == INLINES.HYPERLINK) {
    return {
      text: hyperlinkNode.content?.[0].value ?? hyperlinkNode.data.uri,
      href: hyperlinkNode.data.uri,
    }
  }
  // if there is no hyperlink, it's a text node
  const textNode = p.content[0]
  if (textNode && textNode.nodeType === 'text') {
    return {
      text: textNode.value,
    }
  }
  return null
}
