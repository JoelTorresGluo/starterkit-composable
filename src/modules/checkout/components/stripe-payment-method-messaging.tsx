'use client'

import { Box, BoxProps } from '@chakra-ui/react'
import { loadStripe } from '@oriuminc/stripe'
import {
  Elements,
  PaymentMethodMessagingElement,
} from '@stripe/react-stripe-js'
import { useMemo } from 'react'
import { STRIPE_KEY } from '../constants'

export interface StripePaymentMethodMessagingProps {
  priceAmount?: number
  rootProps?: BoxProps
}

export const StripePaymentMethodMessaging = ({
  priceAmount,
  rootProps,
}: StripePaymentMethodMessagingProps) => {
  const stripePromise = useMemo(() => loadStripe(STRIPE_KEY), [])

  if (!priceAmount) {
    return null
  }

  return (
    <Box {...rootProps}>
      <Elements stripe={stripePromise}>
        <PaymentMethodMessagingElement
          options={{
            amount: priceAmount,
            currency: 'USD',
            paymentMethodTypes: ['klarna', 'afterpay_clearpay'],
            countryCode: 'US',
          }}
        />
      </Elements>
    </Box>
  )
}
