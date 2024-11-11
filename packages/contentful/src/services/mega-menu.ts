import { ContentfulSdkClient, ContentfulSdkMegaMenuEntry } from '../types'

export interface ContentfulMegaMenuFetchServiceParams {
  client: ContentfulSdkClient
  id: string
  locale: string
}

export const contentfulMegaMenuFetchService = async ({
  client,
  id,
  locale,
}: ContentfulMegaMenuFetchServiceParams) => {
  return await client.getEntries<ContentfulSdkMegaMenuEntry>({
    content_type: 'megaMenu',
    'fields.identifier': id,
    locale,
    limit: 1,
    include: 3, // should match the max depth of nested items
  })
}
