import { CmsInterface } from '@oriuminc/cms-generic'
import {
  ComponentBannerPreview,
  Footer,
  MegaDrawer,
  MegaMenu,
  RichText,
} from './components'
import { CLOSE_PREVIEW_MODE_PATH, MEGA_MENU_ID } from './constants'
import {
  useContentfulAlgoliaConfig,
  useContentfulContentPage,
  useContentfulProductListingPage,
  useContentfulProductPage,
  useContentfulSearchConfig,
  useContentfulSiteConfig,
} from './hooks'
import { contentfulSiteConfigToComposableSiteConfig } from './mappers'
import {
  ContentfulContentPage,
  ContentfulProductListingPage,
  ContentfulProductPage,
} from './pages'
import {
  contentfulSiteConfigFetchService,
  initContentfulClient,
} from './services'
import {
  prefetchAlgoliaConfig,
  prefetchCommonComponents,
  prefetchContentPage,
  prefetchProductListingPage,
  prefetchSearchConfig,
} from './utils'
import { prefetchProductPage } from './utils/prefetch-product-page'

export const contentfulInterface: CmsInterface = {
  genericContentPage: {
    getStaticPaths: () => {
      return { paths: [], fallback: 'blocking' }
    },
  },
  PDP: {
    shippingAndReturn: ({ slug }) => <RichText slug={slug} />,
  },
  getSiteConfig: (params) =>
    contentfulSiteConfigFetchService({
      client: initContentfulClient({ isPreview: false }),
      key: params?.key,
      locale: params?.locale,
    }).then((resp) => contentfulSiteConfigToComposableSiteConfig(resp)),
  useSiteConfig: useContentfulSiteConfig,
  components: {
    ContentPage: ContentfulContentPage,
    ProductListingPage: ContentfulProductListingPage,
    ProductPage: ContentfulProductPage,
    MegaMenu: <MegaMenu megaMenuId={MEGA_MENU_ID.MAIN_NAV} />,
    MegaDrawer: <MegaDrawer megaMenuId={MEGA_MENU_ID.MAIN_NAV} />,
    Footer: <Footer megaMenuId={MEGA_MENU_ID.FOOTER} />,
    BannerPreview: (
      <ComponentBannerPreview closeRoute={CLOSE_PREVIEW_MODE_PATH} />
    ),
  },
  contentPage: {
    prefetch: prefetchContentPage,
    useCMSContentPage: useContentfulContentPage,
  },
  productListingPage: {
    prefetch: prefetchProductListingPage,
    useCMSProductListingPage: useContentfulProductListingPage,
  },
  productPage: {
    prefetch: prefetchProductPage,
    useCMSProductPage: useContentfulProductPage,
  },
  algoliaConfiguration: {
    prefetch: prefetchAlgoliaConfig,
    useAlgoliaConfiguration: useContentfulAlgoliaConfig,
  },
  searchConfiguration: {
    prefetch: prefetchSearchConfig,
    useSearchConfiguration: useContentfulSearchConfig,
  },
  common: {
    prefetch: prefetchCommonComponents,
  },
}
