import { ComposableProductListingPage } from '@oriuminc/cms-generic'
import { QueryClient } from '@tanstack/react-query'
import { getContentfulProductListingPageKey } from '../hooks'
import { contentfulProductListingPageToComposableProductListingPage } from '../mappers'
import {
  contentfulProductListingPageFetchService,
  initContentfulClient,
} from '../services'

export const prefetchProductListingPage = async ({
  slug,
  locale,
  queryClient,
  isPreview = false,
}: {
  slug: string
  locale: string
  queryClient: QueryClient
  isPreview?: boolean
}): Promise<ComposableProductListingPage | null> => {
  const _locale = locale || ''

  const page = await contentfulProductListingPageFetchService({
    client: initContentfulClient({ isPreview }),
    slug,
    locale: _locale,
  }).then((resp) =>
    contentfulProductListingPageToComposableProductListingPage(resp)
  )

  await queryClient.prefetchQuery(
    getContentfulProductListingPageKey(slug, _locale),
    () => page
  )

  return page
}
