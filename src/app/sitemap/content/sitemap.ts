import { HOME_PAGE } from '@modules/general'
import { staticApi } from '@modules/trpc/server'
import { FALLBACK_LOCALE, getSiteUrl } from '@oriuminc/base'
import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

// TODO: pagination for this sitemap

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contentPages = await staticApi.cms.getContentPages({
    locale: FALLBACK_LOCALE,
  })

  return contentPages.results
    .filter(({ slug }) => !!slug)
    .map(({ slug }) => {
      const isHomePage = slug === HOME_PAGE
      return {
        url: `${getSiteUrl()}/${isHomePage ? '' : slug}`,
        lastModified: new Date(),
        priority: isHomePage ? 1 : 0.7,
        changefreq: isHomePage ? 'daily' : 'weekly',
      }
    })
}
