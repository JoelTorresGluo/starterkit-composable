import { useComposable } from '@oriuminc/base'
import { useQuery } from '@tanstack/react-query'
import { contentfulAlgoliaConfigToComposableAlgoliaConfiguration } from '../mappers'
import {
  contentfulAlgoliaConfigFetchService,
  initContentfulClient,
} from '../services'

export const getContentfulAlgoliaConfigKey = (key: string, locale: string) => [
  'useContentfulAlgoliaConfig',
  key ?? '',
  locale ?? '',
]

export const useContentfulAlgoliaConfig = (key: string) => {
  const { locale } = useComposable()
  return useQuery(
    getContentfulAlgoliaConfigKey(key, locale),
    async () => {
      return contentfulAlgoliaConfigFetchService({
        client: initContentfulClient({ isPreview: false }),
        key,
        locale,
      }).then((resp) =>
        contentfulAlgoliaConfigToComposableAlgoliaConfiguration(resp)
      )
    },
    {
      keepPreviousData: true,
      enabled: Boolean(key),
    }
  )
}
