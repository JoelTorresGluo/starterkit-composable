import { ComposableSearchConfiguration } from '@oriuminc/cms-generic'
import { QueryClient } from '@tanstack/react-query'
import { getContentfulSearchConfigKey } from '../hooks'
import { contentfulSearchConfigToComposableSearchConfiguration } from '../mappers'
import {
  contentfulSearchConfigFetchService,
  initContentfulClient,
} from '../services'

export const prefetchSearchConfig = async ({
  key,
  locale,
  queryClient,
}: {
  key: string
  locale: string
  queryClient: QueryClient
}): Promise<ComposableSearchConfiguration | null> => {
  const searchConfig = await contentfulSearchConfigFetchService({
    client: initContentfulClient({ isPreview: false }),
    key,
    locale,
  }).then((resp) => contentfulSearchConfigToComposableSearchConfiguration(resp))
  await queryClient.prefetchQuery(
    getContentfulSearchConfigKey(key, locale),
    () => searchConfig
  )
  return searchConfig
}
