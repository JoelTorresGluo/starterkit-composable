import { parseUrlTemplate, useComposable } from '@oriuminc/base'
import { BrandPicker } from '@oriuminc/ui'

/**
 * banner for multi branded sites
 * the content is managed by contentful content type Site Config
 */
export const MultiBrandPicker = () => {
  const { appKey, siteConfig } = useComposable()
  const sites = siteConfig?.siblingSites
    ? [siteConfig, ...siteConfig?.siblingSites]
    : []

  if (!appKey || !siteConfig || !sites || sites.length < 2) {
    return null
  }

  return (
    <BrandPicker
      sites={sites.map((site) => ({
        ...site,
        url: parseUrlTemplate(site.url),
      }))}
      currentBrand={appKey}
      brandContainerProps={{
        filter: 'brightness(0) invert(0.95)',
      }}
    />
  )
}
