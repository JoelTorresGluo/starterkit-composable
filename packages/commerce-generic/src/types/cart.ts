import { z } from 'zod'
import { Currency, Locale } from '@oriuminc/base'
import { ComposableProduct, ComposableProductVariant } from './product'
import { ComposableAddress, ComposableAddressSchema } from './address'

export interface ComposableCartItem {
  itemId: string
  productId: ComposableProduct['id']
  productKey: ComposableProduct['key']
  title: ComposableProduct['title']
  slug: ComposableProduct['slug']
  quantity: number
  variant: ComposableProductVariant
}

export interface ComposableDiscountCode {
  id: string
  code: string
}

export interface ComposableCart {
  id: string
  anonymousId?: string
  customerId?: string
  customerEmail?: string
  locale: Locale
  currency: Currency
  isActive: boolean
  items: ComposableCartItem[]
  itemsTotalQuantity: number
  price: {
    /** subtotal: sum, in cents, of cost of all cart items. Includes discounted line item prices */
    subtotal: number
    /** tax amount in cents */
    tax?: number
    /** shipping amount in cents */
    shipping?: number
    /** discounted amount in cents */
    discounts: number
    /** total amount, with applied taxes if available, in cents */
    total: number
  }
  discountCodes?: ComposableDiscountCode[]
  shippingAddress?: ComposableAddress
  billingAddress?: ComposableAddress
  checkoutUrl?: string
}

export const CartAddItemActionSchema = z.object({
  action: z.literal('addLineItem'),
  productId: z.string().optional(),
  variantId: z.string().optional(),
  quantity: z.number().optional(),
})

export const CartAddDiscountCodeActionSchema = z.object({
  action: z.literal('addDiscountCode'),
  code: z.string(),
})

export const CartAddPaymentActionSchema = z.object({
  action: z.literal('addPayment'),
  payment: z.object({
    id: z.string().optional(),
    key: z.string().optional(),
  }),
})

export const CartChangeLineItemQuantityActionSchema = z.object({
  action: z.literal('changeLineItemQuantity'),
  lineItemId: z.string(),
  quantity: z.number(),
  variantId: z.string().optional(),
})

export const CartRemoveDiscountCodeActionSchema = z.object({
  action: z.literal('removeDiscountCode'),
  discountCode: z.object({
    id: z.string(),
  }),
})

export const CartRemoveLineItemActionSchema = z.object({
  action: z.literal('removeLineItem'),
  lineItemId: z.string(),
})

export const CartSetShippingAddressActionSchema = z.object({
  action: z.literal('setShippingAddress'),
  address: ComposableAddressSchema,
})

export const CartSetBillingAddressActionSchema = z.object({
  action: z.literal('setBillingAddress'),
  address: ComposableAddressSchema,
})

export const CartSetShippingMethodActionSchema = z.object({
  action: z.literal('setShippingMethod'),
  shippingMethod: z.object({
    id: z.string(),
  }),
})

export const CartSetCustomerEmailActionSchema = z.object({
  action: z.literal('setCustomerEmail'),
  email: z.string(),
})

export const UpdateCartActionSchema = z.union([
  CartAddItemActionSchema,
  CartAddDiscountCodeActionSchema,
  CartAddPaymentActionSchema,
  CartChangeLineItemQuantityActionSchema,
  CartRemoveDiscountCodeActionSchema,
  CartRemoveLineItemActionSchema,
  CartSetShippingAddressActionSchema,
  CartSetBillingAddressActionSchema,
  CartSetShippingMethodActionSchema,
  CartSetCustomerEmailActionSchema,
])

export type UpdateCartAction = z.infer<typeof UpdateCartActionSchema>
