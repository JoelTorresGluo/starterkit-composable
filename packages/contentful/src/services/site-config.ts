import { ContentfulSdkClient, ContentfulSdkSiteConfigEntry } from '../types'

export interface ContentfulSiteConfigFetchServiceParams {
  client: ContentfulSdkClient
  key?: string
  locale?: string
}

export const contentfulSiteConfigFetchService = async (
  params?: ContentfulSiteConfigFetchServiceParams
) => {
  if (!params) return null
  const { client, key, locale } = params
  return await client.getEntries<ContentfulSdkSiteConfigEntry>({
    content_type: 'siteConfig',
    'fields.key': key,
    locale,
    limit: 1,
  })
}
