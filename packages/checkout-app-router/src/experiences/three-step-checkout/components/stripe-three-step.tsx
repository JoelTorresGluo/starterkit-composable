import { memo } from 'react'
import { StripePaymentMethod } from '../../../components'
import { ActorRefFrom } from 'xstate'
import { paymentMachine } from '../../../machines/sections/payment-machine'
import { useSelector } from '@xstate/react'

interface StripeThreeStepProps {
  paymentRef: ActorRefFrom<typeof paymentMachine>
  customerEmail?: string
}

export const StripeThreeStep = memo(
  ({ paymentRef, customerEmail }: StripeThreeStepProps) => {
    const state = useSelector(paymentRef, (state) => state)

    return (
      <StripePaymentMethod
        setupIntent={state.context.paymentMethodData?.stripe?.setupIntent}
        isResuming={
          state.matches({
            enteringData: {
              paymentMethod: { stripeSelected: 'previousSetupIntentConfirmed' },
            },
          }) ||
          state.matches({
            enteringData: {
              paymentMethod: 'paymentDataSubmitted',
            },
          })
        }
        isLoading={state.matches({
          enteringData: {
            paymentMethod: { stripeSelected: 'loadingStripeInitialData' },
          },
        })}
        isLoadError={
          !state.context.paymentMethodData?.stripe?.setupIntent ||
          state.matches({
            enteringData: { paymentMethod: { stripeSelected: 'errorLoading' } },
          })
        }
        onChangeStripeCard={() =>
          paymentRef.send({ type: 'stripe.changeCard' })
        }
        onRetryLoading={() => paymentRef.send({ type: 'stripe.reload' })}
        formProps={{
          setStripeFormIsValid: (complete) =>
            paymentRef.send({
              type: complete ? 'stripe.formComplete' : 'stripe.formIncomplete',
            }),
          isInSubmittingState: state.matches({
            enteringData: {
              paymentMethod: { stripeSelected: 'submittingStripePaymentData' },
            },
          }),
          onConfirmSuccess: (setupIntent) =>
            paymentRef.send({
              type: 'stripe.setConfirmedData',
              setupIntent,
            }),
          onConfirmError: () =>
            paymentRef.send({ type: 'stripe.confirmationError' }),
          customerEmail,
        }}
      />
    )
  }
)
