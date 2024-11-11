import { useToast } from '@chakra-ui/react'
import { useCart, useUser } from '@modules/commerce'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

import {
  ComposableCheckoutPaymentManagement,
  ComposableConfirmOrderPayload,
  SubmitOrderPaymentMethodData,
} from '@oriuminc/checkout-app-router'
import { useComposable } from '@modules/general'
import { getCurrency } from '@oriuminc/base'
import { api } from '@modules/trpc/react'

/**
 *  Provides functions for working with Stripe
 *
 * @returns {Object} An object containing the following functions:
 * - fetchStripeSetupIntent: A function that fetches the Stripe setup intent.
 * - stripeAfterPaymentRedirectConfirmation: A function that confirms the Stripe order after payment.
 * - onRedirectAfterPayment: A function that redirects the user after payment.
 * - confirmOrder: A function that confirms the order.
 *
 */
export const usePaymentManagement = (): ComposableCheckoutPaymentManagement => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const { locale } = useComposable()
  const { cart } = useCart()
  const { updateCustomer } = useUser()
  const toast = useToast()
  const searchParams = useSearchParams()
  const paymentIntentQueryParam = searchParams.get('payment_intent')

  const {
    client: { stripe, commerce },
  } = api.useUtils()

  const fetchStripeSetupIntent = useCallback(async (customerEmail: string) => {
    return stripe.setupPaymentIntent.query({
      customerEmail: customerEmail ?? '',
    })
  }, [])

  const confirmStripeOrder = useCallback(
    async ({
      paymentMethodId,
      stripeCustomerId,
    }: {
      paymentMethodId: string
      stripeCustomerId: string
    }) => {
      try {
        const cartId = cart.id ?? ''
        const { paymentIntent } = await stripe.createPaymentIntent.mutate({
          cartId,
          paymentMethodId,
          stripeCustomerId,
          basePathUrl: window.location.href,
          locale,
          currency,
        })

        const confirmationRedirectUrl =
          paymentIntent?.next_action?.redirect_to_url?.url
        if (confirmationRedirectUrl) {
          return {
            redirectUrl: confirmationRedirectUrl,
          }
        } else {
          const order = await stripe.confirmPayment.mutate({
            cartId,
            paymentIntentId: paymentIntent?.id || '',
            locale,
            currency,
          })

          const orderId = order?.id ?? ''
          await stripe.updatePayment.mutate({
            orderId,
            locale,
            currency,
          })
          return {
            redirectUrl: '/checkout/success',
            orderId,
          }
        }
      } catch (err) {
        toast({
          status: 'error',
          position: 'top',
          description: intl.formatMessage({
            id: 'checkout.error.payment.toastMessage',
          }),
        })
        throw err
      }
    },
    [cart]
  )

  const stripeAfterPaymentRedirectConfirmation = useCallback(
    async (cartId: string) => {
      try {
        const order = await stripe.confirmPayment.mutate({
          cartId: cartId,
          paymentIntentId: paymentIntentQueryParam as string,
          locale,
          currency,
        })
        const orderId = order?.id ?? ''
        await stripe.updatePayment.mutate({
          orderId,
          locale,
          currency,
        })
        return {
          redirectUrl: '/checkout/success',
          orderId,
        }
      } catch (err) {
        toast({
          status: 'error',
          position: 'top',
          description: intl.formatMessage({
            id: 'checkout.error.payment.toastMessage',
          }),
        })
        throw err
      }
    },
    [cart, paymentIntentQueryParam]
  )

  const confirmOfflinePaymentOrder = useCallback(async () => {
    const order = await commerce.confirmOfflinePayment.mutate({
      cartId: cart.id ?? '',
      locale,
      currency,
    })
    return { redirectUrl: '/checkout/success', orderId: order?.id }
  }, [cart])

  const onRedirectAfterPayment = async (
    paymentMethod: SubmitOrderPaymentMethodData['key'],
    cartId: string
  ) => {
    switch (paymentMethod) {
      case 'stripe': {
        return await stripeAfterPaymentRedirectConfirmation(cartId)
      }
    }
    return {
      redirectUrl: '/checkout/success',
    }
  }

  const confirmOrder = async ({
    paymentMethod: { key, data },
    saveNewAddress,
    shippingAddress,
  }: ComposableConfirmOrderPayload) => {
    try {
      let orderConfirmed = null
      switch (key) {
        case 'stripe': {
          orderConfirmed = await confirmStripeOrder({
            paymentMethodId: (data?.setupIntent?.payment_method as any)?.id,
            stripeCustomerId: data?.customer?.id as string,
          })
          break
        }
        case 'offline': {
          orderConfirmed = await confirmOfflinePaymentOrder()
          break
        }
      }

      if (saveNewAddress) {
        await updateCustomer
          .mutateAsync({
            actions: [
              {
                action: 'saveShippingAddress',
                address: shippingAddress,
              },
            ],
          })
          .catch(() => {
            // ignore this error for now to continue the checkout flow
          })
      }

      return orderConfirmed
    } catch (err) {
      throw err
    }
  }

  return {
    fetchStripeSetupIntent,
    onRedirectAfterPayment,
    confirmOrder,
  }
}
