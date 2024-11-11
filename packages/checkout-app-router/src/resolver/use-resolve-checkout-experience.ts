import { useEffect, useMemo } from 'react'
import { CheckoutExperienceCondition, CheckoutExperienceKey } from './types'
import { resolveCheckoutExperience } from './resolver'
import { getPreviousCheckoutExperienceStorageKey } from '../utils'

interface UseResolveCheckoutExperienceParams<InputType> {
  conditions: CheckoutExperienceCondition<InputType>[]
  input: InputType
  id: string | undefined
}

export function useResolveCheckoutExperience<InputType>({
  conditions,
  input,
  id: cartId,
}: UseResolveCheckoutExperienceParams<InputType>) {
  const checkoutExperienceKey = useMemo(() => {
    if (!cartId) return null

    const previous = sessionStorage.getItem(
      getPreviousCheckoutExperienceStorageKey(cartId)
    ) as CheckoutExperienceKey
    return (
      previous ||
      resolveCheckoutExperience<InputType>({
        conditions,
        input,
        defaultCheckout: 'threeStepCheckout',
      })
    )
  }, [conditions, input, cartId])

  useEffect(() => {
    if (checkoutExperienceKey && cartId) {
      sessionStorage.setItem(
        getPreviousCheckoutExperienceStorageKey(cartId),
        checkoutExperienceKey
      )
    }
  }, [checkoutExperienceKey, input])

  return {
    checkoutExperienceKey,
  }
}
