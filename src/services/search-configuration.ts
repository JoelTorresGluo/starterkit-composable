import { ContentfulSdkSearchConfigEntry, ContentfulSdkClient } from '../types'

export const contentfulSearchConfigFetchService = async ({
  client,
  key,
  locale,
}: {
  client: ContentfulSdkClient
  key: string
  locale: string
}) => {
  return await client.getEntries<ContentfulSdkSearchConfigEntry>({
    content_type: 'algoliaConfiguration',
    'fields.key': key,
    locale,
    limit: 1,
  })
}
