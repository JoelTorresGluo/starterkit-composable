import { BLOCKS } from '@contentful/rich-text-types'
import { ComposableRichText, RichTextSchema } from '@oriuminc/cms-generic'
import { EntryFields } from 'contentful'
import { ContentfulSdkRichTextResponse } from '../types'
import { contentfulRichTextContentToComposableRichTextHtml } from '../utils/sdk-utils/rich-text'

export const isRichTextField = (fieldValue: EntryFields.RichText) => {
  return (
    fieldValue &&
    typeof fieldValue === 'object' &&
    fieldValue.nodeType === BLOCKS.DOCUMENT
  )
}

export const contentfulRichTextToComposableRichText = (
  rawSiteConfigData: ContentfulSdkRichTextResponse
): ComposableRichText | null => {
  const item = rawSiteConfigData.items[0]
  const fields = item?.fields
  if (!fields || !Object.entries(fields).length) {
    return null
  }
  return RichTextSchema.parse({
    contentType: 'richText',
    id: item.sys.id,
    ...fields,
    html: contentfulRichTextContentToComposableRichTextHtml(
      fields.richText as any
    ),
  })
}
