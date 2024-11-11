import { Locale } from '@oriuminc/base'
import { SdkClient } from '../../types'

export const getCategories = async ({
  client,
  limit,
  offset,
}: {
  client: SdkClient
  limit?: number
  offset?: number
}) => {
  return (
    await client
      .categories()
      .get({
        queryArgs: {
          limit,
          offset,
        },
      })
      .execute()
  ).body
}

export const getCategoryBySlug = async ({
  client,
  slug,
  locale,
}: {
  client: SdkClient
  slug: string
  locale: Locale
}) => {
  return (
    await client
      .categories()
      .get({
        queryArgs: {
          where: `slug(${locale}="${slug}")`,
          limit: 1,
        },
      })
      .execute()
  ).body.results[0]
}
