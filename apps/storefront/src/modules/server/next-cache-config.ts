/** For documentation on each property available in Route Segment Configuration, see:
 *  https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
 *
 *  configs are asserted as `const` to prevent type errors during build time
 * */

//used on account and cart pages
const accountPage = {
  dynamic: 'force-dynamic',
} as const
const cartPage = {
  dynamic: 'force-dynamic',
} as const
const checkoutPage = {
  dynamic: 'force-dynamic',
} as const

// Setting 'error' for contentPages forces static rendering of the page and alerts the developer if any changes unintentionally trigger dynamic rendering.
const contentPages = {
  dynamic: 'error',
  dynamicParams: true,
} as const

// Setting 'force-dynamic' for productPages guarantees the page is always rendered dynamically, ensuring the Loading UI Fallback is displayed.
const productPages = {
  dynamic: 'force-dynamic',
  dynamicParams: true,
} as const

// Setting 'error' for categoryPages forces static rendering of the page and alerts the developer if any changes unintentionally trigger dynamic rendering.
const categoryPages = {
  dynamic: 'error',
  dynamicParams: true,
} as const

const routeSegmentConfig = {
  accountPage,
  cartPage,
  checkoutPage,
  contentPages,
  productPages,
  categoryPages,
}

export default routeSegmentConfig
