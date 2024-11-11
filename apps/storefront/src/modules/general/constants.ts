export const PORT = process.env.PORT ?? 3003

export const ALGOLIA_BASE_INDEX =
  process.env.NEXT_PUBLIC_ALGOLIA_BASE_INDEX ?? ''
export const CMS_ALGOLIA_CONFIG_KEY =
  process.env.NEXT_PUBLIC_CMS_ALGOLIA_CONFIG_KEY ?? ''

export const IMAGE_PLACEHOLDER = '/img/image-placeholder.svg'

// export const GOOGLE_TAG_MANAGER_ID =
//   process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID

// export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

// /* Brand name determines what contentful content will be pulled
// for ex:
// - single site can set BRAND_NAME to '',
// - multi-site: set BRAND_A, BRAND_B etc
// */
export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? ''

export const PRODUCT_CHANNEL =
  process.env.NEXT_PUBLIC_COMMERCETOOLS_INVENTORY_CHANNEL ??
  (BRAND_NAME ? `${BRAND_NAME}-channel` : undefined)

export const countries = [
  {
    name: 'Canada',
    code: 'CA',
    intlId: 'text.canada',
  },
  {
    name: 'Mexico',
    code: 'MX',
    intlId: 'text.mexico',
  },
  {
    name: 'United States',
    code: 'US',
    intlId: 'text.unitedStates',
  },
]

export const RICHTEXT_SCHEMA = {
  //SCHEMA need to be match with CMS to fetch content
  pdp: {
    shippingAndReturn: 'product/category/{{category}}/shipping_and_return',
  },
  account: {
    shippingAndReturn: 'account/shipping_and_return',
  },
}

export const ENABLE_BOLD_CHECKOUT = process.env.NEXT_PUBLIC_CHECKOUT
  ? process.env.NEXT_PUBLIC_CHECKOUT === 'bold'
  : false

export const BOLD_CHECKOUT_HOST =
  process.env.NEXT_PUBLIC_BOLD_CHECKOUT_HOST ?? ''

export const BOLD_COMMERCE_SHOP_ALIAS =
  process.env.NEXT_PUBLIC_BOLD_COMMERCE_SHOP_ALIAS ?? ''

export const CMS_PAGE_SLUGS = {
  NO_SEARCH_RESULTS: 'no-search-results',
}

const BRANDPREFIX = BRAND_NAME ? `${BRAND_NAME}/` : ''

export const HOME_PAGE = `${BRANDPREFIX}homepage`

export const MEGA_MENU_ID = {
  MAIN_NAV: `${BRANDPREFIX}mega-menu-nav`,
  FOOTER: `${BRANDPREFIX}mega-menu-footer`,
} as const

export const PROD_SERVER_ERROR_MESSAGE_ID = 'app.failure' //see locale translations in packages/templates/general/intl

export const DRAFT_MODE_DATA_COOKIE_NAME = 'previewData'

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
export const ENABLE_STRIPE_ADDRESS_ELEMENT = Boolean(
  parseInt(process.env.NEXT_PUBLIC_ENABLE_STRIPE_ADDRESS_ELEMENT ?? '0')
)

// only enable Google standalone if Stripe form for is not enabled and the api key is set
export const ENABLE_GOOGLE_STANDALONE_AUTOCOMPLETE =
  !ENABLE_STRIPE_ADDRESS_ELEMENT && Boolean(GOOGLE_MAPS_API_KEY)

const getPrefetchConfig = (
  prefetchSetting: string | undefined
): boolean | undefined => {
  // see https://nextjs.org/docs/app/api-reference/components/link#prefetch for prefetch documentation
  if (prefetchSetting === 'true') {
    return true
  } else if (prefetchSetting === 'false') {
    return false
  } else if (prefetchSetting === 'default') {
    return undefined
  }

  // Handle case where environment variable is not set
  return false
}

export const PREFETCH_PRODUCT_CARD_LINKS = getPrefetchConfig(
  process.env.NEXT_PUBLIC_PREFETCH_PRODUCT_CARD_LINKS
)

export const PREFETCH_TOP_NAV_LINKS = getPrefetchConfig(
  process.env.NEXT_PUBLIC_PREFETCH_TOP_NAV_LINKS
)

export const PREFETCH_CHILD_NAV_LINKS = getPrefetchConfig(
  process.env.NEXT_PUBLIC_PREFETCH_CHILD_NAV_LINKS
)
export const PREFETCH_FOOTER_NAV_LINKS = getPrefetchConfig(
  process.env.NEXT_PUBLIC_PREFETCH_FOOTER_NAV_LINKS
)
