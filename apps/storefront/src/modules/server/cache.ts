import {
  BRAND_NAME,
  CMS_ALGOLIA_CONFIG_KEY,
  PRODUCT_CHANNEL,
} from '@modules/general'
import { staticApi } from '@modules/trpc/server'
import { Locale, getCurrency } from '@oriuminc/base'
import { ComposableProductSearchQueryParams } from '@oriuminc/commerce-generic'
import { unstable_cache as cache } from 'next/cache'

const STATIC_REVALIDATE_SECONDS = process.env.STATIC_REVALIDATE_SECONDS
  ? Number(process.env.STATIC_REVALIDATE_SECONDS)
  : null
/** 5 minutes */
const STATIC_REVALIDATE_SECONDS_FALLBACK = 300

/**
 * Dont use objects as params of these cached functions
 * as they will be compared by reference (Object.is),
 * and if a different object (even with the same properties and values) is passed,
 * it will not use the cached value
 */

export const getContentPageCached = cache(
  async (slug: string, locale: Locale, previewData?: any) => {
    return await staticApi.cms.getContentPage({
      slug,
      locale,
      previewData,
    })
  },
  undefined,
  {
    revalidate: STATIC_REVALIDATE_SECONDS ?? STATIC_REVALIDATE_SECONDS_FALLBACK,
  }
)

export const getProductPageCached = cache(
  async (slug: string, locale: Locale, previewData?: any) => {
    return await staticApi.cms.getProductPage({
      slug,
      locale,
      previewData,
    })
  },
  undefined,
  {
    revalidate: STATIC_REVALIDATE_SECONDS ?? STATIC_REVALIDATE_SECONDS_FALLBACK,
  }
)

export const getProductListingPageCached = cache(
  async (slug: string, locale: Locale, previewData?: any) => {
    return await staticApi.cms.getProductListingPage({
      slug,
      locale,
      previewData,
    })
  },
  undefined,
  {
    revalidate: STATIC_REVALIDATE_SECONDS ?? STATIC_REVALIDATE_SECONDS_FALLBACK,
  }
)

export const getMegaMenuCached = cache(
  async (id: string, locale: Locale, previewData?: any) => {
    return await staticApi.cms.getMegaMenu({
      id,
      locale,
      previewData,
    })
  },
  undefined,
  {
    revalidate: STATIC_REVALIDATE_SECONDS ?? STATIC_REVALIDATE_SECONDS_FALLBACK,
  }
)

export const getSiteConfigCached = cache(
  async (locale: Locale, previewData?: any) => {
    return await staticApi.cms.getSiteConfig({
      key: BRAND_NAME,
      locale,
      previewData,
    })
  },
  undefined,
  {
    revalidate: STATIC_REVALIDATE_SECONDS ?? STATIC_REVALIDATE_SECONDS_FALLBACK,
  }
)

export const getAlgoliaConfigurationCached = cache(
  async (locale: Locale, previewData?: any) => {
    return await staticApi.cms.getAlgoliaConfiguration({
      key: CMS_ALGOLIA_CONFIG_KEY,
      locale,
      previewData,
    })
  },
  undefined,
  {
    revalidate: STATIC_REVALIDATE_SECONDS ?? STATIC_REVALIDATE_SECONDS_FALLBACK,
  }
)

export const getProductBySlugCached = cache(
  async (slug: string, locale: Locale) => {
    return await staticApi.commerce.getProductBySlug({
      slug,
      locale,
      currency: getCurrency(locale),
      inventoryChannelKey: PRODUCT_CHANNEL,
    })
  },
  undefined,
  {
    revalidate: STATIC_REVALIDATE_SECONDS ?? STATIC_REVALIDATE_SECONDS_FALLBACK,
  }
)

export const getProductsCached = cache(
  async (
    locale: Locale,
    query?: ComposableProductSearchQueryParams,
    limit?: number,
    offset?: number
  ) => {
    return await staticApi.commerce.getProducts({
      query,
      locale,
      currency: getCurrency(locale),
      limit,
      offset,
    })
  },
  undefined,
  {
    revalidate: STATIC_REVALIDATE_SECONDS ?? STATIC_REVALIDATE_SECONDS_FALLBACK,
  }
)

export const getRichTextContentCached = cache(
  async (slug: string, locale: Locale) => {
    return await staticApi.cms.getRichTextContent({
      slug,
      locale,
    })
  },
  undefined,
  {
    revalidate: STATIC_REVALIDATE_SECONDS ?? STATIC_REVALIDATE_SECONDS_FALLBACK,
  }
)
