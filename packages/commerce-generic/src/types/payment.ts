import { ComposableMoney } from './money'

export type ComposablePaymentInterface = 'OFFLINE' | 'STRIPE'

export interface ComposablePayment extends ComposableMoney {
  id: string
  paymentInterface: {
    /** ID of the transaction in the payment interface (e.g. a Stripe payment intent ID) */
    transactionId?: string
    identifier: ComposablePaymentInterface
    name: string
  }
}
