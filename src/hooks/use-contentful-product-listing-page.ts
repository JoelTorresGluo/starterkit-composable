import { useComposable } from '@oriuminc/base'
import { useQuery } from '@tanstack/react-query'
import { contentfulProductListingPageToComposableProductListingPage } from '../mappers'
import {
  contentfulProductListingPageFetchService,
  initContentfulClient,
} from '../services'

export const getContentfulProductListingPageKey = (
  slug: string,
  locale: string
) => ['useContentfulProductListingPage', slug ?? '', locale ?? '']

export const useContentfulProductListingPage = (
  slug: string,
  isPreview: boolean = false
) => {
  const { locale } = useComposable()
  const query = useQuery(
    getContentfulProductListingPageKey(slug, locale),
    () => {
      return contentfulProductListingPageFetchService({
        client: initContentfulClient({ isPreview }),
        slug,
        locale,
      }).then((resp) =>
        contentfulProductListingPageToComposableProductListingPage(resp)
      )
    },
    {
      keepPreviousData: true,
    }
  )

  return {
    data: query.data,
    isNoMatch: query.data === null,
    isLoading: query.data === undefined,
    isLoaded: Boolean(query.data),
  }
}
