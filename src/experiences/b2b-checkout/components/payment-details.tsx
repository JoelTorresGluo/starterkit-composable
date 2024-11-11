import { Divider, Stack } from '@chakra-ui/react'
import { CheckoutDetailItem } from '@oriuminc/templates/checkout'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'
import { ActorRefFrom } from 'xstate'
import { reviewOrderMachine } from '../../../machines/sections/review-order-machine'
import { useSelector } from '@xstate/react'
import { IStripePaymentMethod } from '@oriuminc/stripe'

interface PaymentDetailsProps {
  reviewOrderRef: ActorRefFrom<typeof reviewOrderMachine>
}
export const PaymentDetails = ({ reviewOrderRef }: PaymentDetailsProps) => {
  const intl = useIntl()
  const state = useSelector(reviewOrderRef, (state) => state)

  const stripePaymentDetails = useMemo(() => {
    const stripePaymentMethodDetails = state.context.paymentMethodData?.stripe
      ?.setupIntent?.payment_method as IStripePaymentMethod

    if (!stripePaymentMethodDetails) return undefined
    const card = stripePaymentMethodDetails?.card
    const cardData = card
      ? [
          `${card.brand} XXXX-${card.last4}`,
          `${card.exp_month}/${card.exp_year}`,
        ]
      : undefined
    const stripeLinkData = Boolean(stripePaymentMethodDetails.link)
      ? [
          intl.formatMessage({
            id: 'checkout.paymentSection.stripeLink.paymentMethodTitle',
          }),
        ]
      : undefined
    return (
      cardData ??
      stripeLinkData ?? [
        intl.formatMessage({
          id: 'checkout.paymentSection.stripe.paymentMethodTitle',
        }),
      ]
    )
  }, [state.context.paymentMethodData?.stripe])

  const purchaseOrderPaymentDetails = [
    intl.formatMessage({
      id: 'checkout.paymentSection.createPurchaseOrder',
    }),
  ]

  return (
    <Stack spacing={4} divider={<Divider />}>
      {state.context.selectedPaymentMethod && (
        <CheckoutDetailItem
          title={intl.formatMessage({
            id: 'checkout.success.orderDetails.paymentMethod',
          })}
          details={
            state.context.selectedPaymentMethod === 'stripe'
              ? stripePaymentDetails
              : purchaseOrderPaymentDetails
          }
          onClickEdit={() => reviewOrderRef.send({ type: 'go.step.payment' })}
        />
      )}
      {Object.values(state.context.billingAddress).some((val) => !!val) && (
        <CheckoutDetailItem
          title={intl.formatMessage({
            id: 'checkout.billingSection.title',
          })}
          details={
            state.context.billingIsShipping
              ? [
                  intl.formatMessage({
                    id: 'checkout.billingSection.sameAsShipping',
                  }),
                ]
              : [
                  `${state.context.billingAddress.payload.firstName} ${state.context.billingAddress.payload.lastName}`,
                  `${state.context.billingAddress.payload.streetNumber} ${state.context.billingAddress.payload.streetName}`,
                  `${state.context.billingAddress.payload.city}, ${state.context.billingAddress.payload.state}, ${state.context.billingAddress.payload.postalCode}, ${state.context.billingAddress.payload.country}`,
                ]
          }
          onClickEdit={() => reviewOrderRef.send({ type: 'go.step.payment' })}
        />
      )}
    </Stack>
  )
}
