import { z } from 'zod'
import { Currency, Locale } from '@oriuminc/base'
import { ComposableCartItem, ComposableDiscountCode } from './cart'
import { ComposablePayment } from './payment'
import { ComposableShippingMethod } from './shipping-method'
import { ComposableAddress } from './address'

export type ComposableOrderStatus =
  | 'Cancelled'
  | 'Complete'
  | 'Confirmed'
  | 'Open'
export const ComposableOrderPaymentStatusSchema = z.enum([
  'BalanceDue',
  'CreditOwed',
  'Failed',
  'Paid',
  'Pending',
])
export type ComposableOrderPaymentStatus = z.infer<
  typeof ComposableOrderPaymentStatusSchema
>

export interface ComposableOrder {
  id: string
  cartId?: string
  anonymousId?: string
  customerId?: string
  customerEmail?: string
  status: ComposableOrderStatus
  paymentStatus?: ComposableOrderPaymentStatus
  locale: Locale
  currency: Currency
  items: ComposableCartItem[]
  itemsTotalQuantity: number
  price: {
    subtotal: number
    tax: number
    shipping: number
    discounts: number
    total: number
  }
  discountCodes?: ComposableDiscountCode[]
  shippingAddress?: ComposableAddress
  billingAddress?: ComposableAddress
  shippingMethod?: ComposableShippingMethod
  payments?: ComposablePayment[]
  createdAt: string
}

export const OrderSetPaymentStatusActionSchema = z.object({
  action: z.literal('setPaymentStatus'),
  status: ComposableOrderPaymentStatusSchema,
})

export const OrderCancelActionSchema = z.object({
  action: z.literal('cancelOrder'),
})

// TODO: add more order update actions if needed
export const UpdateOrderActionSchema = z.union([
  OrderSetPaymentStatusActionSchema,
  OrderCancelActionSchema,
])

export type UpdateOrderAction = z.infer<typeof UpdateOrderActionSchema>
