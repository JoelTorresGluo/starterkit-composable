import { CartPage } from '@modules/cart'
import { getServerIntl, getSupportedLocale } from '@modules/intl'
import { Locale } from '@oriuminc/base'
import { Metadata } from 'next'

import routeSegmentConfig from '@modules/server/next-cache-config'

export const { dynamic } = routeSegmentConfig.cartPage

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const locale = getSupportedLocale(params.locale)
  const intl = await getServerIntl(locale)
  return {
    title: intl.formatMessage({ id: 'cart.title.myBag' }),
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default CartPage
