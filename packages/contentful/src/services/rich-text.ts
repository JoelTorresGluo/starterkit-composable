import { ContentfulSdkClient, ContentfulSdkRichTextEntry } from '../types'

export interface ContentfulRichTextFetchServiceParams {
  client: ContentfulSdkClient
  slug: string
  locale: string
}

export const contentfulRichTextFetchService = async ({
  client,
  slug,
  locale,
}: ContentfulRichTextFetchServiceParams) => {
  return await client.getEntries<ContentfulSdkRichTextEntry>({
    content_type: 'richText',
    'fields.slug': slug,
    locale,
    limit: 1,
  })
}
