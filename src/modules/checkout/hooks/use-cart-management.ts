import { useCart } from '@modules/commerce'
import { useHandleError } from '@modules/general'
import {
  ComposableCheckoutCartManagement,
  ComposableSubmitDeliveryOptionsPayload,
} from '@oriuminc/checkout-app-router'
import { ComposableAddress } from '@oriuminc/commerce-generic'
import { useCallback } from 'react'

/**  Provides functions for fetching the cart and submitting billing and shipping addresses,
 *  and setting the selected delivery option.
 *
 * @returns {Object} An object containing the following functions:
 *  - fetchCart: A function that fetches the cart data.
 *  - submitBillingAddress: A function that submits the billing address.
 *  - submitShippingAddress: A function that submits the shipping address.
 *  - submitDeliveryOptions: A function that submits the delivery options.
 *  - clearCart: A function that clears the cart.
 *
 */
export const useCartManagement = (): ComposableCheckoutCartManagement => {
  const { updateCart, deleteCart, cart } = useCart()
  const { createHandleError } = useHandleError()

  const submitBillingAddress = useCallback(
    async (billingAddress: ComposableAddress) => {
      return updateCart.mutateAsync(
        {
          actions: [
            {
              action: 'setBillingAddress',
              address: billingAddress,
            },
          ],
        },
        {
          onError: createHandleError(),
        }
      )
    },
    [updateCart]
  )

  const submitShippingAddress = useCallback(
    async (
      shippingAddress: ComposableAddress & {
        email: string
      }
    ) => {
      return updateCart.mutateAsync(
        {
          actions: [
            {
              action: 'setShippingAddress',
              address: shippingAddress,
            },
          ],
        },
        {
          onError: createHandleError(),
        }
      )
    },
    [updateCart]
  )

  const submitDeliveryOptions = useCallback(
    async ({
      shippingOptionSelected,
      shippingAddress,
      customerEmail,
    }: ComposableSubmitDeliveryOptionsPayload) => {
      try {
        await updateCart.mutateAsync({
          actions: [
            {
              action: 'setShippingAddress',
              address: shippingAddress,
            },
            {
              action: 'setShippingMethod',
              shippingMethod: {
                id: shippingOptionSelected,
              },
            },
            {
              action: 'setCustomerEmail',
              email: customerEmail,
            },
          ],
        })
      } catch (err) {
        throw new Error('Error submitting delivery options')
      }
    },
    [updateCart]
  )

  return {
    submitBillingAddress,
    submitShippingAddress,
    submitDeliveryOptions,
    clearCart: deleteCart,
    cart,
  }
}
