import { ComposableAlgoliaConfiguration } from '@oriuminc/cms-generic'
import { QueryClient } from '@tanstack/react-query'
import { getContentfulAlgoliaConfigKey } from '../hooks'
import { contentfulAlgoliaConfigToComposableAlgoliaConfiguration } from '../mappers'
import {
  contentfulAlgoliaConfigFetchService,
  initContentfulClient,
} from '../services'

export const prefetchAlgoliaConfig = async ({
  key,
  locale,
  queryClient,
}: {
  key: string
  locale: string
  queryClient: QueryClient
}): Promise<ComposableAlgoliaConfiguration | null> => {
  const algoliaConfig = await contentfulAlgoliaConfigFetchService({
    client: initContentfulClient({ isPreview: false }),
    key,
    locale,
  }).then((resp) =>
    contentfulAlgoliaConfigToComposableAlgoliaConfiguration(resp)
  )
  await queryClient.prefetchQuery(
    getContentfulAlgoliaConfigKey(key, locale),
    () => algoliaConfig
  )
  return algoliaConfig
}
