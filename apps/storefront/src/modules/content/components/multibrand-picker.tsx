import { BRAND_NAME } from '@modules/general'
import { ComposableSiteConfig, parseUrlTemplate } from '@oriuminc/base'
import { BrandPicker } from '@oriuminc/ui'

export const MultiBrandPicker = async ({
  siteConfig,
}: {
  siteConfig: ComposableSiteConfig | null
}) => {
  const sites = siteConfig?.siblingSites
    ? [siteConfig, ...siteConfig?.siblingSites]
    : []

  if (!BRAND_NAME || !siteConfig || !sites || sites.length < 2) {
    return null
  }

  return (
    <BrandPicker
      sites={sites.map((site) => ({
        ...site,
        url: parseUrlTemplate(site.url),
      }))}
      currentBrand={BRAND_NAME}
      brandContainerProps={{
        filter: 'brightness(0) invert(0.95)',
      }}
    />
  )
}
