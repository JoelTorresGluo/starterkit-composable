export const checkoutSelectedShippingOptionIdKey =
  'checkout-selectedShippingOptionId'

export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
export const ENABLE_STRIPE_ADDRESS_ELEMENT = Boolean(
  parseInt(process.env.NEXT_PUBLIC_ENABLE_STRIPE_ADDRESS_ELEMENT ?? '0')
)

// only enable Google standalone if Stripe form for is not enabled and the api key is set
export const ENABLE_GOOGLE_STANDALONE_AUTOCOMPLETE =
  !ENABLE_STRIPE_ADDRESS_ELEMENT && Boolean(GOOGLE_MAPS_API_KEY)
