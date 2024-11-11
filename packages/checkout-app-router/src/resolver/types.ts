export type CheckoutExperienceKey = 'oneStepCheckout' | 'threeStepCheckout'

export interface CheckoutExperienceCondition<InputType> {
  checkoutExperience: CheckoutExperienceKey
  condition: (params: InputType) => boolean
}
