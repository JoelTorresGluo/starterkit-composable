import { ContentfulSdkAlgoliaConfigEntry, ContentfulSdkClient } from '../types'

export const contentfulAlgoliaConfigFetchService = async ({
  client,
  key,
  locale,
}: {
  client: ContentfulSdkClient
  key: string
  locale: string
}) => {
  return await client.getEntries<ContentfulSdkAlgoliaConfigEntry>({
    content_type: 'algoliaConfiguration',
    'fields.key': key,
    locale,
    limit: 1,
  })
}
