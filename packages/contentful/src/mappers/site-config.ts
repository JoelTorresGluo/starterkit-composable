import { ComposableSiteConfig } from '@oriuminc/base'
import { ContentfulSdkSiteConfigResponse } from '../types'
import { formatComponentFields } from './common'

export const contentfulSiteConfigToComposableSiteConfig = (
  rawSiteConfigData: ContentfulSdkSiteConfigResponse | null
): ComposableSiteConfig => {
  const fields = rawSiteConfigData?.items?.[0]?.fields
  if (!fields || !Object.entries(fields).length)
    throw new Error('site config fields not found in data')
  return {
    ...formatComponentFields(fields),
    siblingSites:
      fields.siblingSites?.map((site: any) => ({
        ...formatComponentFields(site.fields),
        siblingSites: null, // remove more nested siblings
      })) ?? null,
  }
}
