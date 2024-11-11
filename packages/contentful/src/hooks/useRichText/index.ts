import { useComposable } from '@oriuminc/base'
import { useQuery } from '@tanstack/react-query'
import { contentfulRichTextToComposableRichText } from '../../mappers'
import {
  contentfulRichTextFetchService,
  ContentfulRichTextFetchServiceParams,
  initContentfulClient,
} from '../../services'

export const getRichTextKey = (
  variables: Omit<ContentfulRichTextFetchServiceParams, 'client'>
) => ['useRichText', variables.locale ?? '', variables.slug ?? '']

export const useRichText = (slug: string, isPreview: boolean = false) => {
  const { locale } = useComposable()
  const query = useQuery(
    getRichTextKey({ locale, slug }),
    async () => {
      try {
        const response = await contentfulRichTextFetchService({
          client: initContentfulClient({ isPreview }),
          locale,
          slug,
        }).then((resp) => contentfulRichTextToComposableRichText(resp))
        return response
      } catch (error) {
        return null
      }
    },
    {
      enabled: Boolean(locale && slug),
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
