'use client'

import { useCallback, useState } from 'react'
import { useElements, useStripe } from '@stripe/react-stripe-js'

export interface StripeCardCreatedTokenData {
  name?: string
  address_country?: string
  address_zip?: string
  address_line1?: string
  address_line2?: string
}

export const useStripeCard = () => {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)

  const createCardToken = useCallback(
    async (params?: { data?: StripeCardCreatedTokenData }) => {
      if (!stripe || !elements) {
        throw new Error('Invalid Stripe or Elements')
      }

      const cardElement = elements.getElement('card')

      if (!cardElement) {
        throw new Error('Invalid card element')
      }

      setIsLoading(true)

      const { error, token } = await stripe.createToken(
        cardElement,
        params?.data
      )

      setIsLoading(false)

      if (error || !token || !token.card) {
        throw new Error(error?.message || 'Unexpected Stripe response')
      }

      return {
        token,
        isLoading,
      }
    },
    [stripe, elements, isLoading]
  )

  const confirmSetupIntent = useCallback(
    async ({ expandResponse }: { expandResponse?: string[] } = {}) => {
      if (!stripe || !elements) {
        throw new Error('Invalid Stripe or Elements')
      }

      setIsLoading(true)

      const { error, setupIntent } = await stripe.confirmSetup({
        elements,
        redirect: 'if_required',
        confirmParams: {
          expand: expandResponse,
        },
      })

      setIsLoading(false)

      if (error) {
        throw new Error(error?.message || 'Unexpected Stripe response')
      }

      return {
        setupIntent,
        isLoading,
      }
    },
    [stripe, elements, isLoading]
  )

  return {
    isLoading,
    createCardToken,
    confirmSetupIntent,
  }
}
