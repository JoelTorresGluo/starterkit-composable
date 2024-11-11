import {
  analyticsTrackAddShippingInfo,
  analyticsTrackAddPaymentInfo,
} from '@modules/general'
import { ComposableCheckoutAnalytics } from '@oriuminc/checkout-app-router'

/**
 * Provides functions for tracking analytics events in the checkout experience
 *
 * @returns {Object} An object containing the following functions:
 * - track.next.on.delivery: A function that tracks the shipping information.
 * - track.next.on.payment: A function that tracks the payment information.
 */
export const useCheckoutAnalytics = (): ComposableCheckoutAnalytics => {
  return {
    'track.next.on.delivery': ({ context }) => {
      const { shippingOptions, shippingOptionSelectedId } =
        context.deliveryOptionsRef
          ?.getSnapshot()
          .context.shippingOptionsRef?.getSnapshot().context || {}

      if (shippingOptions) {
        analyticsTrackAddShippingInfo({
          cart: context.cart,
          shippingTier: shippingOptions?.find(
            (option) => option.id === shippingOptionSelectedId
          )?.title,
        })
      }
    },
    'track.next.on.payment': ({ context }) => {
      const { selectedPaymentMethod } =
        context.paymentRef?.getSnapshot().context || {}

      analyticsTrackAddPaymentInfo({
        cart: context.cart,
        paymentType: selectedPaymentMethod ?? 'unknown',
      })
    },
  }
}
