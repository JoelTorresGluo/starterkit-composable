import { ComposableProductSearchQueryParams } from '@oriuminc/commerce-generic'
import { SdkClient } from '../../types'
import { Currency, Locale } from '@oriuminc/base'

export const getProducts = async ({
  client,
  query,
  customerGroupId,
  limit,
  offset,
  locale,
  currency,
}: {
  client: SdkClient
  query?: ComposableProductSearchQueryParams
  customerGroupId?: string
  limit?: number
  offset?: number
  locale: Locale
  currency: Currency
}) => {
  const formattedQuery = query ? formatQuery({ query, locale }) : undefined

  const productsFetched = (
    await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit,
          offset,
          priceCustomerGroup: customerGroupId,
          priceCurrency: currency,
          expand: ['categories[*]'],
          'filter.query': formattedQuery,
        },
      })
      .execute()
  ).body

  const sortedProducts = productsFetched.results?.sort((a, b) => {
    return (query?.ids?.indexOf(a.id) ?? -1) - (query?.ids?.indexOf(b.id) ?? -1)
  })

  return {
    ...productsFetched,
    results: sortedProducts,
  }
}

const formatQuery = ({
  query,
  locale,
}: {
  query: ComposableProductSearchQueryParams
  locale: Locale
}) => {
  const activeQueryParams = Object.entries(query).filter(
    ([property, values]) => values && values.length > 0
  )
  if (activeQueryParams.length > 1)
    throw new Error(
      'invalid query params: only use one (ids, keys, skus or slugs)'
    )
  if (query.ids) {
    return `id:${query.ids.map((id) => `"${id}"`)}`
  } else if (query.keys) {
    return `key:${query.keys.map((key) => `"${key}"`)}`
  } else if (query.skus) {
    return `variants.sku:${query.skus.map((sku) => `"${sku}"`)}`
  } else if (query.slugs) {
    return `slug.${locale}:${query.slugs.map((slug) => `"${slug}"`)}`
  }
}

export const getProductBySlug = async ({
  client,
  slug,
  locale,
  currency,
  customerGroupId,
}: {
  client: SdkClient
  slug: string
  locale: Locale
  currency: Currency
  customerGroupId?: string
}) => {
  const results = await client
    .productProjections()
    .get({
      queryArgs: {
        where: `slug(${locale}="${slug}")`,
        priceCurrency: currency,
        priceCustomerGroup: customerGroupId,
        expand: ['categories[*]'],
      },
    })
    .execute()
  return results.body.results?.[0]
}
