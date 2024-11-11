import { useRouter } from 'next/navigation'
import { CheckoutExperienceProps } from '../../types'
import { useActor, useSelector } from '@xstate/react'

import {
  deliveryOptionsMachine,
  oneStepStateMachine,
  paymentMachine,
  reviewOrderMachine,
} from '../../machines'
import { fromPromise } from 'xstate'
import {
  getPreviousCheckoutExperienceStorageKey,
  getStorageKey,
} from '../../utils'
import { checkoutSelectedShippingOptionIdKey } from '../../constants'
import {
  CheckoutLayout,
  FinishingCheckout,
} from '../three-step-checkout/components'
import { DeliveryOptionsStep, PaymentStep } from '../three-step-checkout/steps'
import { Box, Button, Spacer } from '@chakra-ui/react'
import { shippingOptionsActor } from '../../machines/sections/shipping-options-actor'
import { customerInfoActor } from '../../machines/sections/customer-info-actor'
import { useIntl } from 'react-intl'
import { useEffect } from 'react'

export const OneStepCheckout = ({
  analytics,
  cartManagement,
  customerManagement,
  DesktopCartSummary,
  MobileCartSummary,
  orderManagement,
  paymentManagement,
  shippingManagement,
  headerLogo,
}: CheckoutExperienceProps) => {
  const router = useRouter()
  const { cart } = cartManagement
  const intl = useIntl()

  const userId = cart?.customerId || cart?.anonymousId

  const shippingOptionsActorProvided = shippingOptionsActor.provide({
    actions: {
      setShippingOptionSelected: ({ event }) =>
        shippingManagement.selectShippingOption(event.shippingOptionId),
    },
    actors: {
      fetchShippingOptionsActor: fromPromise(() =>
        shippingManagement.fetchShippingOptions()
      ),
    },
  })

  const customerInfoActorProvided = customerInfoActor.provide({
    actors: {
      updateCustomerInfoActor: fromPromise(({ input }) =>
        customerManagement.updateCustomerAddress(input.address)
      ),
      fetchCustomerInfoActor: fromPromise(() =>
        customerManagement.fetchCustomer()
      ),
      loginActor: fromPromise(({ input }) => customerManagement.login(input)),
    },
  })

  // useActor hook returns [state, send, actorRef], in this case we are only interested in
  // the state and the actorRef
  const [state, _, oneStepActorRef] = useActor(
    oneStepStateMachine.provide({
      actors: {
        deliveryOptionsActor: deliveryOptionsMachine.provide({
          actors: {
            shippingOptionsActor: shippingOptionsActorProvided,
            customerInfoActor: customerInfoActorProvided,
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
            confirmOrderActor: fromPromise(async ({ input }) => {
              await cartManagement.submitBillingAddress?.({
                ...input.billingAddress,
              })

              return await paymentManagement.confirmOrder(input)
            }),
          },
        }),

        afterPaymentRedirectionActor: fromPromise(async ({ input }) =>
          paymentManagement.onRedirectAfterPayment?.(
            input.paymentMethod.key,
            cart.id
          )
        ),
        setOrderIdActor: fromPromise(({ input }) => {
          return Promise.resolve(orderManagement.setOrderId(input.orderId))
        }),
        redirectActor: fromPromise(async ({ input }) => {
          return await router.push(input.redirectUrl)
        }),
        cleanUpActor: fromPromise(async () => {
          cartManagement.clearCart()

          sessionStorage.removeItem(
            getPreviousCheckoutExperienceStorageKey(cartManagement.cart.id)
          )
          sessionStorage.removeItem(checkoutSelectedShippingOptionIdKey)

          sessionStorage.removeItem(
            getStorageKey({
              prefix: 'threeStepActorRef',
              userId,
              cartId: cartManagement.cart.id,
            })
          )
        }),
      },
      actions: {
        ...analytics,
      },
    }),
    {
      input: {
        cart: cartManagement.cart,
      },
      snapshot: JSON.parse(
        sessionStorage?.getItem(
          getStorageKey({
            prefix: 'oneStepActorRef',
            userId,
            cartId: cartManagement?.cart.id!,
          })
        ) || 'null'
      ),
    }
  )

  const reviewOrderSnapshot = useSelector(
    oneStepActorRef?.getSnapshot().context.reviewOrderRef,
    (state) => state
  )

  useEffect(() => {
    if (cart) {
      const subscription = oneStepActorRef.subscribe((_state) => {
        // dont update if already in done
        if (_state.matches('done')) return
        sessionStorage.setItem(
          getStorageKey({
            prefix: 'oneStepActorRef',
            userId,
            cartId: cart.id!,
          }),
          JSON.stringify(oneStepActorRef.getPersistedSnapshot())
        )
      })

      return () => subscription.unsubscribe()
    }
  }, [oneStepActorRef, cart])

  if (state.matches('finishing') || state.matches('done')) {
    return <FinishingCheckout experienceRef={oneStepActorRef} />
  }

  return (
    <CheckoutLayout
      DesktopCartSummary={DesktopCartSummary}
      MobileCartSummary={MobileCartSummary}
      headerLogo={headerLogo}
    >
      <>
        {state.context.deliveryOptionsRef && (
          <DeliveryOptionsStep
            deliveryOptionsRef={state.context.deliveryOptionsRef}
          />
        )}

        <PaymentStep paymentRef={state.context.paymentRef} />

        <Spacer h='5' />

        <Box textAlign='right' mx={{ base: 4, md: 0 }}>
          <Button
            fontSize='base'
            w={{ base: 'full', md: 'fit-content' }}
            variant='solid'
            onClick={() => {
              state.context.reviewOrderRef?.send({
                type: 'process.payment.confirm',
              })
            }}
            isDisabled={reviewOrderSnapshot?.matches('failed')}
            isLoading={
              reviewOrderSnapshot?.matches('processing') ||
              reviewOrderSnapshot?.matches('confirmingOrder')
            }
          >
            {intl.formatMessage({ id: 'action.placeOrder' })}
          </Button>
        </Box>
      </>
    </CheckoutLayout>
  )
}
