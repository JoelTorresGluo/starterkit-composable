import { CheckoutExperienceCondition, CheckoutExperienceKey } from './types'

export function resolveCheckoutExperience<InputType>({
  conditions,
  defaultCheckout,
  input,
}: {
  conditions: CheckoutExperienceCondition<InputType>[]
  defaultCheckout: CheckoutExperienceKey
  input: InputType
}): CheckoutExperienceKey {
  let result: CheckoutExperienceKey = defaultCheckout

  for (const { condition, checkoutExperience } of conditions) {
    if (condition(input)) {
      result = checkoutExperience
      break
    }
  }
  return result
}
