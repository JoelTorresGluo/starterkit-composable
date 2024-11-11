import { GetStaticPaths, GetStaticPropsContext } from 'next'
import { ReactNode } from 'react'
import { QueryClient, UseQueryResult } from '@tanstack/react-query'
import {
  ComposableAlgoliaConfiguration,
  ComposableContentPage,
  ComposableSearchConfiguration,
  ProductListingPage,
  ProductPage,
} from './cms-generic'

export interface TranslationsKeys {
  [key: string]: string
}

export interface IntlConfig {
  code: string
  title: string
  keys: TranslationsKeys
  translationKey: string
  currency: string
}

export type GridLayoutOption =
  | 'standard'
  | 'comfortable'
  | 'condensed'
  | 'single'

export interface GetSiteConfigServiceParams {
  key?: string
  locale?: string
  isFresh?: string
}

export type GetSiteConfigService = (
  params?: GetSiteConfigServiceParams
) => Promise<ComposableSiteConfig | null>

export interface ComposableSiteConfig {
  name?: string | null
  order?: number | null
  key?: string | null
  url?: string | null
  displayMultiBrandBanner?: boolean | null
  brandLogo?: SiteConfigImage | null
  brandLogoSmall?: SiteConfigImage | null
  shortcutIcon?: SiteConfigImage | null
  siblingSites?: ComposableSiteConfig[] | null
}

export interface SiteConfigImage {
  url: string
}

export interface PrefetchCommonComponentsParams {
  queryClient: QueryClient
  locale: string
  isPreview?: boolean
}

export interface CmsInterface {
  useCtConnector?: UseCtConnector
  genericContentPage: {
    getStaticPaths?: GetStaticPaths
  }
  PDP?: {
    shippingAndReturn?: ({ slug }: { slug: string }) => ReactNode
  }
  getSiteConfig?: GetSiteConfigService
  useSiteConfig: (key: string) => UseQueryResult<ComposableSiteConfig | null>
  components: {
    ContentPage: React.FC<CmsPageComponentProps>
    ProductListingPage: React.FC<CmsProductListingPageComponentProps>
    ProductPage: React.FC<CmsProductPageComponentProps>
    MegaMenu?: ReactNode
    MegaDrawer?: ReactNode
    Footer?: ReactNode
    BannerPreview?: ReactNode
  }
  algoliaConfiguration: {
    prefetch: (params: {
      key: string
      locale: string
      queryClient: QueryClient
    }) => Promise<ComposableAlgoliaConfiguration | null>
    useAlgoliaConfiguration: (
      key: string
    ) => UseQueryResult<ComposableAlgoliaConfiguration | null>
  }
  searchConfiguration: {
    prefetch: (params: {
      key: string
      locale: string
      queryClient: QueryClient
    }) => Promise<ComposableSearchConfiguration | null>
    useSearchConfiguration: (
      key: string
    ) => UseQueryResult<ComposableSearchConfiguration | null>
  }
  contentPage: {
    prefetch: (params: {
      slug?: string
      locale: string
      isPreview?: boolean
      queryClient: QueryClient
    }) => Promise<ComposableContentPage | null>
    useCMSContentPage: (
      slug: string,
      isPreview?: boolean
    ) => {
      data?: ComposableContentPage | null
      isNoMatch: boolean
      isLoading: boolean
      isLoaded: boolean
    }
  }
  productListingPage?: {
    prefetch?: (params: {
      slug: string
      locale: string
      isPreview?: boolean
      queryClient: QueryClient
    }) => Promise<ProductListingPage | null>
    useCMSProductListingPage: (
      slug: string,
      isPreview?: boolean
    ) => {
      data?: ProductListingPage | null
      isNoMatch: boolean
      isLoading: boolean
      isLoaded: boolean
    }
  }
  productPage?: {
    prefetch?: (params: {
      slug: string
      locale: string
      isPreview?: boolean
      queryClient: QueryClient
    }) => Promise<ProductPage | null>
    useCMSProductPage: (
      slug: string,
      isPreview?: boolean
    ) => {
      data?: ProductPage | null
      isNoMatch: boolean
      isLoading: boolean
      isLoaded: boolean
    }
  }
  common: {
    prefetch: (params: PrefetchCommonComponentsParams) => Promise<void>
  }
}

export interface CmsPageComponentProps {
  NoMatchPage: () => React.ReactElement | null
  ExitPreviewModeBanner?: () => React.ReactElement | null
  ProductsConnector?: (props: any) => React.ReactElement | null // TODO: delete
  useCtConnector?: UseCtConnector // TODO: delete
  isPreview?: boolean
  slug?: string
  [key: string]: any
}

export interface CmsProductListingPageComponentProps
  extends Omit<CmsPageComponentProps, 'NoMatchPage' | 'slug'> {
  slug: string
  showPrice?: boolean | null
  children: ReactNode
}

export type CmsProductPageComponentProps = CmsProductListingPageComponentProps

export type UseCtConnector<TData = unknown> = (params: {
  // TODO: delete?
  queryParam: 'ids' | 'keys' | 'skus' | 'slugs'
  values: string[]
}) => {
  data: TData
}

export type UseSFCCConnector<TData = unknown> = (params: {
  queryParam: 'ids'
  values: string[]
}) => {
  data: TData
}

export type AlgoliaIndexNameResolver = (params: {
  locale: string
  sortBy?: string | false
  isLoggedIn?: boolean
}) => string

export type AlgoliaQuerySuggestionsIndexNameResolver = (params: {
  locale: string
  sortBy?: string
  isLoggedIn?: boolean
  querySuggestionsPostfix?: string
}) => string
