import {
  PrefetchCommonComponentsParams,
  getSiteConfigKey,
} from '@oriuminc/base'
import { BRAND_NAME, MEGA_MENU_ID } from '../constants'
import { getContentfulMegaMenuKey } from '../hooks'
import {
  contentfulMegaMenuToComposableMegaMenu,
  contentfulSiteConfigToComposableSiteConfig,
} from '../mappers'
import {
  contentfulMegaMenuFetchService,
  contentfulSiteConfigFetchService,
  initContentfulClient,
} from '../services'

export const prefetchCommonComponents = async ({
  queryClient,
  locale,
  isPreview = false,
}: PrefetchCommonComponentsParams) => {
  const client = initContentfulClient({ isPreview })
  await Promise.all([
    queryClient.prefetchQuery(
      getContentfulMegaMenuKey({ locale, id: MEGA_MENU_ID.MAIN_NAV }),
      async () =>
        await contentfulMegaMenuFetchService({
          client,
          locale,
          id: MEGA_MENU_ID.MAIN_NAV,
        }).then((resp) => contentfulMegaMenuToComposableMegaMenu(resp))
    ),
    queryClient.prefetchQuery(
      getContentfulMegaMenuKey({ locale, id: MEGA_MENU_ID.FOOTER }),
      async () =>
        await contentfulMegaMenuFetchService({
          client,
          locale,
          id: MEGA_MENU_ID.FOOTER,
        }).then((resp) => contentfulMegaMenuToComposableMegaMenu(resp))
    ),
    queryClient.prefetchQuery(
      getSiteConfigKey(locale),
      async () =>
        await contentfulSiteConfigFetchService({
          client,
          key: BRAND_NAME,
          locale,
        }).then((resp) => contentfulSiteConfigToComposableSiteConfig(resp))
    ),
  ])
}
