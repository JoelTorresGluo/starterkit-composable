import { useComposable } from '@oriuminc/base'
import { useQuery } from '@tanstack/react-query'
import { contentfulSearchConfigToComposableSearchConfiguration } from '../mappers'
import {
  contentfulSearchConfigFetchService,
  initContentfulClient,
} from '../services'

export const getContentfulSearchConfigKey = (key: string, locale: string) => [
  'useContentfulSearchConfig',
  key ?? '',
  locale ?? '',
]

export const useContentfulSearchConfig = (key: string) => {
  const { locale } = useComposable()
  return useQuery(
    getContentfulSearchConfigKey(key, locale),
    async () => {
      return contentfulSearchConfigFetchService({
        client: initContentfulClient({ isPreview: false }),
        key,
        locale,
      }).then((resp) =>
        contentfulSearchConfigToComposableSearchConfiguration(resp)
      )
    },
    {
      keepPreviousData: true,
      enabled: Boolean(key),
    }
  )
}
