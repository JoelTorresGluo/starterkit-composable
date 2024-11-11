import { useActor } from '@xstate/react'
import { Actions, fromPromise } from 'xstate'
import { threeStepStateMachine } from '../../machines/experiences/three-step-machine'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  getPreviousCheckoutExperienceStorageKey,
  getStorageKey,
} from '../../utils'

import { CheckoutExperienceProps } from '../../types'
import { checkoutSelectedShippingOptionIdKey } from '../../constants'
import { CheckoutLayout, FinishingCheckout } from './components'

import {
  deliveryOptionsMachine,
  paymentMachine,
  reviewOrderMachine,
} from '../../machines'

import { PaymentStep, ReviewStep, DeliveryOptionsStep } from './steps'
import { customerInfoActor } from '../../machines/sections/customer-info-actor'
import { shippingOptionsActor } from '../../machines/sections/shipping-options-actor'

export const B2bCheckout = ({
  customerManagement,
  cartManagement,
  paymentManagement,
  orderManagement,
  shippingManagement,
  DesktopCartSummary,
  MobileCartSummary,
  analytics,
}: CheckoutExperienceProps) => {
  const router = useRouter()
  const { cart } = cartManagement

  const userId = cart?.customerId || cart?.anonymousId

  const [state, send, threeStepActorRef] = useActor(
    threeStepStateMachine.provide({
      actors: {
        deliveryOptionsActor: deliveryOptionsMachine.provide({
          actors: {
            customerInfoActor: customerInfoActor.provide({
              actors: {
                updateCustomerInfoActor: fromPromise(({ input }) =>
                  customerManagement.updateCustomerAddress(input?.address)
                ),
                fetchCustomerInfoActor: fromPromise(() =>
                  customerManagement.fetchCustomer()
                ),
                loginActor: fromPromise(({ input }) =>
                  customerManagement.login(input)
                ),
              },
            }),
            shippingOptionsActor: shippingOptionsActor.provide({
              actions: {
                setShippingOptionSelected: ({ context }) => {
                  shippingManagement.onSelectedShippingOption?.(
                    context.shippingOptionSelectedId
                  )
                },
              },
              actors: {
                fetchShippingOptionsActor: fromPromise(() =>
                  shippingManagement.fetchShippingOptions()
                ),
              },
            }),
            submitDeliveryOptions: cartManagement.submitDeliveryOptions
              ? fromPromise(async ({ input }) =>
                  cartManagement.submitDeliveryOptions?.(input)
                )
              : fromPromise(async () => Promise.resolve()),
          },
        }),
        paymentActor: paymentMachine.provide({
          actors: {
            fetchStripeInitialDataActor: fromPromise(({ input }) =>
              paymentManagement.fetchStripeSetupIntent(input.customerEmail)
            ),
            submitBillingAddressActor: cartManagement.submitBillingAddress
              ? fromPromise(async ({ input: { billingAddress } }) =>
                  cartManagement.submitBillingAddress?.(billingAddress)
                )
              : fromPromise(async () => Promise.resolve()),
          },
        }),

        reviewOrderActor: reviewOrderMachine.provide({
          actors: {
            confirmOrderActor: fromPromise(
              async ({ input }) => await paymentManagement.confirmOrder(input)
            ),
          },
        }),

        afterPaymentRedirectionActor: fromPromise(async ({ input }) =>
          paymentManagement.onRedirectAfterPayment?.(
            input.paymentMethod.key,
            cart.id
          )
        ),
        setOrderIdActor: fromPromise(({ input }) =>
          Promise.resolve(orderManagement.setOrderId(input.orderId))
        ),
        redirectActor: fromPromise(({ input }) =>
          Promise.resolve(router.push(input.redirectUrl))
        ),
        cleanUpActor: fromPromise(async () => {
          await cartManagement.clearCart()

          localStorage.removeItem(
            getPreviousCheckoutExperienceStorageKey(cartManagement.cart.id)
          )
          localStorage.removeItem(checkoutSelectedShippingOptionIdKey)

          localStorage.removeItem(
            getStorageKey({
              prefix: 'threeStepActorRef',
              userId,
              cartId: cartManagement.cart.id,
            })
          )
        }),
      },
      actions: {
        ...(analytics as any),
      },
    }),
    {
      input: {
        cart: cartManagement?.cart,
      },
      snapshot: JSON.parse(
        localStorage?.getItem(
          getStorageKey({
            prefix: 'threeStepActorRef',
            userId,
            cartId: cartManagement?.cart.id!,
          })
        ) || 'null'
      ),
    }
  )

  useEffect(() => {
    if (cart) {
      const subscription = threeStepActorRef.subscribe((_state) => {
        // dont update if already in done
        if (_state.matches('done')) return
        localStorage.setItem(
          getStorageKey({
            prefix: 'threeStepActorRef',
            userId,
            cartId: cart.id!,
          }),
          JSON.stringify(threeStepActorRef?.getPersistedSnapshot())
        )
      })
      return () => subscription.unsubscribe()
    }
  }, [threeStepActorRef, cart])

  if (state.matches('finishing') || state.matches('done')) {
    return <FinishingCheckout experienceRef={threeStepActorRef} />
  }

  return (
    <CheckoutLayout
      DesktopCartSummary={DesktopCartSummary}
      MobileCartSummary={MobileCartSummary}
      experienceRef={threeStepActorRef}
    >
      <>
        {state.matches('delivery') && state.context.deliveryOptionsRef && (
          <DeliveryOptionsStep
            deliveryOptionsRef={state.context.deliveryOptionsRef}
          />
        )}
        {state.matches('payment') && state.context.paymentRef && (
          <PaymentStep paymentRef={state.context.paymentRef} />
        )}

        {state.matches('review') && state.context.reviewOrderRef && (
          <ReviewStep reviewOrderRef={state.context.reviewOrderRef} />
        )}
      </>
    </CheckoutLayout>
  )
}
