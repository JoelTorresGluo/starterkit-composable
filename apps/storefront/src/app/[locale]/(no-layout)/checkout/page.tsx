'use client'

import {
  CheckoutLoadingCart,
  OneStepExperience,
  ThreeStepExperience,
  checkoutExperienceConditions,
} from '@modules/checkout'
import { useCart, useUser } from '@modules/commerce'
import routeSegmentConfig from '@modules/server/next-cache-config'
import { useResolveCheckoutExperience } from '@oriuminc/checkout-app-router'

export const { dynamic } = routeSegmentConfig.checkoutPage

const checkoutExperiences = {
  threeStepCheckout: <ThreeStepExperience />,
  oneStepCheckout: <OneStepExperience />,
}

export default function Checkout() {
  const { cart } = useCart()
  const { customer } = useUser()

  const { checkoutExperienceKey } = useResolveCheckoutExperience({
    conditions: checkoutExperienceConditions,
    input: {
      cart,
      customer,
      windowWidth:
        typeof window !== 'undefined' ? window.innerWidth : undefined,
    },
    id: cart.id,
  })

  if (cart.isLoading) {
    return <CheckoutLoadingCart />
  }

  return <>{checkoutExperiences[checkoutExperienceKey!]}</>
}
