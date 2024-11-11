import { useComposable } from '@oriuminc/base'
import { useQuery } from '@tanstack/react-query'
import { contentfulMegaMenuToComposableMegaMenu } from '../../mappers'
import {
  contentfulMegaMenuFetchService,
  ContentfulMegaMenuFetchServiceParams,
  initContentfulClient,
} from '../../services'

export const getContentfulMegaMenuKey = (
  variables: Omit<ContentfulMegaMenuFetchServiceParams, 'client'>
) => ['useContentfulMegaMenu', variables.locale ?? '', variables.id ?? '']

export const useContentfulMegaMenu = (id: string) => {
  const { locale } = useComposable()

  const query = useQuery(
    getContentfulMegaMenuKey({ locale, id }),
    () => {
      return contentfulMegaMenuFetchService({
        client: initContentfulClient({ isPreview: false }),
        locale,
        id,
      }).then((resp) => contentfulMegaMenuToComposableMegaMenu(resp))
    },
    {
      refetchOnMount: false,
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
