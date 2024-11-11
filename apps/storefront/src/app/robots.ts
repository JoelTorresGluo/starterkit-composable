import { getSiteUrl } from '@oriuminc/base'
import { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api'],
    },
    host: getSiteUrl(),
    sitemap: [
      `${getSiteUrl()}/sitemap/content/sitemap.xml`,
      `${getSiteUrl()}/sitemap/products/sitemap.xml`,
      `${getSiteUrl()}/sitemap/categories/sitemap.xml`,
    ],
  }
}
