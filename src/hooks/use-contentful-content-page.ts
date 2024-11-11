import { useComposable } from '@oriuminc/base'
import { useQuery } from '@tanstack/react-query'
import { contentfulContentPageToComposableContentPage } from '../mappers'
import {
  contentfulContentPageFetchService,
  initContentfulClient,
} from '../services'

export const getContentfulContentPageKey = (slug: string, locale: string) => [
  'useContentfulContentPage',
  slug ?? '',
  locale ?? '',
]

export const useContentfulContentPage = (
  slug: string,
  isPreview: boolean = false
) => {
  const { locale } = useComposable()
  const query = useQuery(
    getContentfulContentPageKey(slug, locale),
    () => {
      return contentfulContentPageFetchService({
        client: initContentfulClient({ isPreview }),
        slug,
        locale,
      }).then((resp) => contentfulContentPageToComposableContentPage(resp))
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
