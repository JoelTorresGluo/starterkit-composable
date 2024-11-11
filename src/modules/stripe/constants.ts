export const ENABLE_STRIPE_ADDRESS_ELEMENT = Boolean(
  parseInt(process.env.NEXT_PUBLIC_ENABLE_STRIPE_ADDRESS_ELEMENT ?? '0')
)

// https://stripe.com/docs/elements/address-element?platform=web#autocomplete
export const GOOGLE_MAPS_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

/**
 * List of valid payment methods types:
 * https://docs.stripe.com/api/payment_methods/object#payment_method_object-type
 */
export const STRIPE_PAYMENT_METHOD_TYPES_ENABLED = [
  /** enables credit cards and wallets like Google and Apple pay */
  'card',
  /** enables Link if the user has an account. If not, it will show the option to sign up */
  'link',
]
