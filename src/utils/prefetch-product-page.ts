import { ComposableProductPage } from '@oriuminc/cms-generic'
import { QueryClient } from '@tanstack/react-query'
import { getContentfulProductPageKey } from '../hooks'
import { contentfulProductPageToComposableProductPage } from '../mappers'
import {
  contentfulProductPageFetchService,
  initContentfulClient,
} from '../services'

export const prefetchProductPage = async ({
  slug,
  locale,
  queryClient,
  isPreview = false,
}: {
  slug: string
  locale: string
  queryClient: QueryClient
  isPreview?: boolean
}): Promise<ComposableProductPage | null> => {
  const _locale = locale || ''

  const page = await contentfulProductPageFetchService({
    client: initContentfulClient({ isPreview }),
    slug,
    locale: _locale,
  }).then((resp) => contentfulProductPageToComposableProductPage(resp))

  await queryClient.prefetchQuery(
    getContentfulProductPageKey(slug, _locale),
    () => page
  )

  return page
}
