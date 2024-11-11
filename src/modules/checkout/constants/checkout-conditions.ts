import { CheckoutExperienceCondition } from '@oriuminc/checkout-app-router'
import { useCart, useUser } from '@modules/commerce'

export interface CheckoutExperienceDataInput {
  customer: ReturnType<typeof useUser>['customer']
  cart: ReturnType<typeof useCart>['cart']
  windowWidth?: number
  queryParams?: Record<string, any>
}

export const checkoutExperienceConditions: CheckoutExperienceCondition<CheckoutExperienceDataInput>[] =
  [
    {
      checkoutExperience: 'oneStepCheckout',
      condition: ({ windowWidth }) =>
        windowWidth != undefined && windowWidth < 800,
    },
    {
      checkoutExperience: 'threeStepCheckout',
      condition: ({ customer }) => Boolean(customer),
    },
  ]
