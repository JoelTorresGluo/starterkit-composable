import {
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import {
  documentToHtmlString,
  Options,
} from '@contentful/rich-text-html-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { Table } from '@oriuminc/ui'
import NextLink from 'next/link'
import React from 'react'
import { ContentfulSdkRichTextFields } from '../../types'
import { transformRichTextTable } from './transformers'
import { EntryFields } from 'contentful'

const defaultOptions = {
  // other options...
  renderNode: {
    // other options...
    [BLOCKS.HEADING_1]: (node: any, children: any) => {
      return (
        <Heading as='h1' size='xl' fontWeight='extrabold'>
          {children}
        </Heading>
      )
    },
    [BLOCKS.HEADING_2]: (node: any, children: any) => {
      return (
        <Heading as='h2' size='lg'>
          {children}
        </Heading>
      )
    },
    [BLOCKS.HEADING_3]: (node: any, children: any) => {
      return (
        <Heading as='h3' size='md'>
          {children}
        </Heading>
      )
    },
    [BLOCKS.HEADING_4]: (node: any, children: any) => {
      return (
        <Heading as='h4' size='sm'>
          {children}
        </Heading>
      )
    },
    [BLOCKS.HEADING_5]: (node: any, children: any) => {
      return (
        <Heading as='h5' fontSize={{ base: 'mobile.sm', md: 'desktop.sm' }}>
          {children}
        </Heading>
      )
    },
    [BLOCKS.HEADING_6]: (node: any, children: any) => {
      return (
        <Heading
          as='h6'
          fontWeight='normal'
          fontSize={{ base: 'mobile.xs', md: 'desktop.xs' }}
        >
          {children}
        </Heading>
      )
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      return (
        <Text
          maxWidth='full'
          as='p'
          fontSize={{ base: 'mobile.body', md: 'desktop.body' }}
          paddingBottom={3}
        >
          {children}
        </Text>
      )
    },
    [BLOCKS.UL_LIST]: (node: any, children: any) => {
      return (
        <UnorderedList pl={2}>
          {React.Children.toArray(
            children?.map((child: any) => (
              // eslint-disable-next-line react/jsx-key
              <ListItem>{child?.props?.children}</ListItem>
            ))
          )}
        </UnorderedList>
      )
    },
    [BLOCKS.OL_LIST]: (node: any, children: any) => {
      return (
        <OrderedList pl={2}>
          {React.Children.toArray(
            children?.map((child: any) => (
              // eslint-disable-next-line react/jsx-key
              <ListItem>{child?.props?.children}</ListItem>
            ))
          )}
        </OrderedList>
      )
    },
    [BLOCKS.QUOTE]: (node: any, children: any) => {
      return (
        <Text
          as='blockquote'
          variant='blockquote'
          sx={{
            borderColor: 'text',
            color: 'background',
          }}
        >
          {children}
        </Text>
      )
    },
    [BLOCKS.HR]: (node: any, children: any) => {
      return <hr style={{ width: '100%' }} />
    },
    [INLINES.HYPERLINK]: (node: any) => {
      return (
        <Link
          as={NextLink}
          href={node?.data?.uri ?? ''}
          isExternal
          fontSize='sm'
          fontWeight='bold'
          textDecoration='underline'
          lineHeight='tight'
          textUnderlineOffset='4px'
          textDecorationThickness='1px'
          overflow='visible'
          py='4'
        >
          {node?.content?.[0]?.value}
        </Link>
      )
    },
    [BLOCKS.TABLE]: (node: any) => {
      const table = transformRichTextTable(node)
      return (
        <Table
          size='sm'
          variant='simple'
          header={table.headers.map((h) => ({
            title: h.map((headerParagraph) => {
              if (!headerParagraph) return null
              return !headerParagraph.href ? (
                <Text key={headerParagraph.text}>{headerParagraph.text}</Text>
              ) : (
                <Link
                  key={headerParagraph.text}
                  as={NextLink}
                  href={headerParagraph.href ?? ''}
                  fontSize='sm'
                  textDecoration='underline'
                >
                  {headerParagraph.text}
                </Link>
              )
            }),
          }))}
          tableData={table.data.map((row) =>
            row.map((cell) => ({
              data: cell.map((dataParagraph) => {
                if (!dataParagraph) return null
                return !dataParagraph.href ? (
                  <Text key={dataParagraph.text}>{dataParagraph.text}</Text>
                ) : (
                  <Link
                    key={dataParagraph.text}
                    as={NextLink}
                    href={dataParagraph.href ?? ''}
                    fontSize='sm'
                    textDecoration='underline'
                  >
                    {dataParagraph.text}
                  </Link>
                )
              }),
            }))
          )}
        />
      )
    },
    // [BLOCKS.EMBEDDED_ASSET]: (node: Node, next: any) => {
    //   return null
    // },
    // [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: any) => {
    //   return null
    // },
  },
  // renderMark: {
  //   [MARKS.BOLD]: (
  //     text:
  //       | boolean
  //       | ReactChild
  //       | ReactFragment
  //       | ReactPortal
  //       | null
  //       | undefined
  //   ) => <strong>${text}</strong>,
  // },
}

const options = {
  renderNode: { ...defaultOptions.renderNode },
  // renderMark: defaultOptions.renderMark, // uncomment this if need to override bold, italic, underline and code
}

/**
 * This options object was built to use with @contentful/rich-text-react-renderer,
 * and then turn the React component into a string using react-dom/server renderToString.
 * With RSC we cant use react-dom/server anymore,
 * so we switched to use @contentful/rich-text-html-renderer instead.
 *
 * TODO: see how we can refactor 'options' to use with documentToHtmlString options.
 *
 */

export const contentfulRichTextContentToComposableRichTextHtml = (
  rawRichTextContent: ContentfulSdkRichTextFields['richText']
) => {
  if (!rawRichTextContent) return undefined
  try {
    return contentfulRichTextContentToHtmlString(
      rawRichTextContent as any
      // options
    )
  } catch (err) {
    return null
  }
}

const contentfulRichTextContentToHtmlString = (
  contentfulRichText: EntryFields.RichText,
  options?: Options
) => {
  return documentToHtmlString(contentfulRichText, options)
}