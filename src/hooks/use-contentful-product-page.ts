import { useComposable } from '@oriuminc/base'
import { useQuery } from '@tanstack/react-query'
import { contentfulProductPageToComposableProductPage } from '../mappers'
import {
  contentfulProductPageFetchService,
  initContentfulClient,
} from '../services'

export const getContentfulProductPageKey = (slug: string, locale: string) => [
  'useContentfulProductPage',
  slug ?? '',
  locale ?? '',
]

export const useContentfulProductPage = (
  slug: string,
  isPreview: boolean = false
) => {
  const { locale } = useComposable()
  const query = useQuery(
    getContentfulProductPageKey(slug, locale),
    () => {
      return contentfulProductPageFetchService({
        client: initContentfulClient({ isPreview }),
        slug,
        locale,
      }).then((resp) => contentfulProductPageToComposableProductPage(resp))
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
