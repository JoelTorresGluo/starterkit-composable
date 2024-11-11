import { staticApi } from '@modules/trpc/server'
import { FALLBACK_LOCALE, getSiteUrl } from '@oriuminc/base'
import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

// TODO: pagination for this sitemap

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await staticApi.commerce.getCategoryStaticPaths({
    locale: FALLBACK_LOCALE,
  })

  return categories.map(({ slug }) => ({
    url: `${getSiteUrl()}/category/${slug}`,
    lastModified: new Date(),
    priority: 0.7,
    changefreq: 'daily',
  }))
}
