export * from './checkout-conditions'

export const PAYMENT_METHOD_STRIPE = 'stripe'
export const PAYMENT_METHOD_CASH = 'cash'
export const PAYMENT_METHOD_PAYPAL = 'paypal'
export const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY || ''
