import { useComposable } from '@oriuminc/base'
import { useQuery } from '@tanstack/react-query'
import { contentfulSiteConfigToComposableSiteConfig } from '../mappers'
import {
  contentfulSiteConfigFetchService,
  initContentfulClient,
} from '../services'

export const getContentfulSiteConfigKey = (key: string, locale: string) => [
  'useContentfulSiteConfig',
  key ?? '',
  locale ?? '',
]

export const useContentfulSiteConfig = (key: string) => {
  const { locale } = useComposable()
  return useQuery(
    getContentfulSiteConfigKey(key, locale),
    async () => {
      return contentfulSiteConfigFetchService({
        client: initContentfulClient({ isPreview: false }),
        key,
        locale,
      }).then((resp) => contentfulSiteConfigToComposableSiteConfig(resp))
    },
    {
      keepPreviousData: true,
      enabled: Boolean(key),
    }
  )
}
