import { getProductsCached } from '@modules/server/cache'
import { FALLBACK_LOCALE, getSiteUrl } from '@oriuminc/base'
import { ComposableProduct } from '@oriuminc/commerce-generic'
import { MetadataRoute } from 'next'
import { cache } from 'react'

export const dynamic = 'force-dynamic'

/**
 *
 * /sitemap/products/sitemap.xml -> this is the index, references the -paginated- products sitemaps
 *
 * /sitemap/products/sitemap-1.xml -> this is a products page sitemap, references product urls
 *
 * This implementation works with a rewrite on the next.config.js file.
 *
 */

const SITEMAP_PRODUCTS_LIMIT = 100

export async function generateSitemaps() {
  const allProducts = await getAllProductPagesCached()
  return [
    // always return id: 0, as it is the index
    { id: 0 },
    ...allProducts.map((_, index) => ({ id: index + 1 })),
  ]
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  const isIndex = id === 0
  if (isIndex) {
    const productPages = await getAllProductPagesCached()
    return productPages.map((_, index) => ({
      url: `${getSiteUrl()}/sitemap/products/sitemap-${index + 1}.xml`,
      lastModified: new Date(),
      priority: 0.9,
      changefreq: 'daily',
    }))
  }

  const products = await getProductsCached(
    FALLBACK_LOCALE,
    undefined,
    SITEMAP_PRODUCTS_LIMIT,
    (id - 1) * SITEMAP_PRODUCTS_LIMIT
  )

  return products.results.map((product) => ({
    url: `${getSiteUrl()}/product/${product.slug}`,
    lastModified: new Date(),
    priority: 0.9,
    changefreq: 'daily',
  }))
}

async function getAllProductPages() {
  const pages: ComposableProduct[][] = []
  let offset = 0
  let isLastPage = false
  while (!isLastPage) {
    const productsPage = await getProductsCached(
      FALLBACK_LOCALE,
      undefined,
      SITEMAP_PRODUCTS_LIMIT,
      offset
    )
    pages.push(productsPage.results)
    offset = offset + SITEMAP_PRODUCTS_LIMIT
    isLastPage = productsPage.results.length < SITEMAP_PRODUCTS_LIMIT
  }
  return pages
}

const getAllProductPagesCached = cache(() => getAllProductPages())
