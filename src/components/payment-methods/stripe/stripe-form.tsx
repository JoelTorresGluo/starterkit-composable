'use client'

import { Box } from '@chakra-ui/react'
import { IStripeSetupIntent, useStripeCard } from '@oriuminc/stripe'
import { useToast } from '@oriuminc/ui'
import { PaymentElement } from '@stripe/react-stripe-js'
import { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'

export interface StripeFormProps {
  setStripeFormIsValid: (value: boolean) => void
  isInSubmittingState: boolean
  onConfirmSuccess: (setupIntent: IStripeSetupIntent) => void
  onConfirmError: () => void
  customerEmail?: string
}

export const StripeForm = ({
  setStripeFormIsValid,
  isInSubmittingState,
  onConfirmSuccess,
  onConfirmError,
  customerEmail,
}: StripeFormProps) => {
  const intl = useIntl()
  const toast = useToast()
  const { confirmSetupIntent } = useStripeCard()
  const isSubmitting = useRef(false)

  useEffect(() => {
    if (isInSubmittingState && !isSubmitting.current) {
      isSubmitting.current = true
      confirmSetupIntent({ expandResponse: ['payment_method'] })
        .then((resp) => {
          onConfirmSuccess(resp.setupIntent as IStripeSetupIntent)
        })
        .catch((err) => {
          if (err.message) {
            toast({
              status: 'error',
              description:
                err.message ||
                intl.formatMessage({
                  id: 'checkout.paymentSection.stripe.confirmSetupIntentUnknownError',
                }),
            })
            onConfirmError()
          }
          isSubmitting.current = false
        })
    }
  }, [isInSubmittingState, confirmSetupIntent])

  return (
    <Box
      // TODO: Replace pixel value with token.
      mt='xs'
      mb='lg'
      minH='200px'
    >
      <PaymentElement
        onChange={({ complete }) => setStripeFormIsValid(complete)}
        options={
          customerEmail
            ? {
                defaultValues: {
                  billingDetails: {
                    // passing the email here for Link
                    email: customerEmail,
                  },
                },
              }
            : undefined
        }
      />
    </Box>
  )
}
