'use client'

import { useCart } from '@modules/commerce'
import {
  analyticsTrackBeginCheckout,
  analyticsTrackViewCart,
  useComposable,
} from '@modules/general'
import {
  ALGOLIA_TRACK_EVENT_DESCRIPTION,
  useAlgoliaInsights,
} from '@oriuminc/algolia'
import { AnalyticsScript } from '@oriuminc/templates/general'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export const Analytics = () => {
  const pathname = usePathname()
  const { path, cartDrawer } = useComposable()
  const { cart } = useCart()
  const { trackAlgoliaViewedObjectIDs, isUsingAlgolia } = useAlgoliaInsights()

  // Track View Cart (cart page)
  useEffect(() => {
    const inCartPage = pathname === path.getCart()
    if (inCartPage && cart.id) {
      analyticsTrackViewCart({ cart })
      if (isUsingAlgolia && cart.items) {
        trackAlgoliaViewedObjectIDs(
          cart.items.map((item) => item.itemId),
          ALGOLIA_TRACK_EVENT_DESCRIPTION.PRODUCT_VIEWED_CART_PAGE
        )
      }
    }
  }, [pathname])

  // Track View Cart (drawer)
  useEffect(() => {
    if (cartDrawer.isOpen && cart.id) {
      analyticsTrackViewCart({ cart, isDrawer: true })
      if (isUsingAlgolia && cart.items) {
        trackAlgoliaViewedObjectIDs(
          cart.items.map((item) => item.itemId),
          ALGOLIA_TRACK_EVENT_DESCRIPTION.PRODUCT_VIEWED_CART_DRAWER
        )
      }
    }
  }, [cartDrawer.isOpen])

  // Track Checkout Begin
  useEffect(() => {
    const isCheckoutPage = pathname === path.getCheckout()
    if (isCheckoutPage && cart.id) {
      analyticsTrackBeginCheckout({ cart })
    }
  }, [pathname, path])

  return <AnalyticsScript />
}
