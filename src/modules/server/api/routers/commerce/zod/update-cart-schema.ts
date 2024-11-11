import { z } from 'zod'

import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import {
  ComposableAddressSchema,
  getComposableAddressSchema,
} from '@oriuminc/commerce-generic'

const updateCartActionsSchema = () =>
  z.object({
    addLineItem: z
      .object({
        productId: z.string().optional(),
        variantId: z.number().optional(),
        quantity: z.number().optional(),
      })
      .optional(),

    addDiscountCode: z
      .object({
        code: z.string(),
        validateDuplicates: z.boolean().optional(),
      })
      .optional(),

    addPayment: z
      .object({
        payment: z.object({
          typeId: z.string().optional(),
          id: z.string().optional(),
          key: z.string().optional(),
        }),
      })
      .optional(),

    changeLineItemQuantity: z
      .object({
        lineItemId: z.string(),
        quantity: z.number(),
      })
      .optional(),

    removeDiscountCode: z
      .object({
        discountCode: z.object({
          typeId: z.string(),
          id: z.string(),
        }),
      })
      .optional(),

    removeLineItem: z
      .object({
        lineItemId: z.string(),
      })
      .optional(),

    setShippingAddress: z
      .object({
        address: ComposableAddressSchema,
      })
      .optional(),

    setBillingAddress: z
      .object({
        address: ComposableAddressSchema,
      })
      .optional(),

    setShippingMethod: z
      .object({
        shippingMethod: z.object({
          id: z.string(),
        }),
      })
      .optional(),

    setCustomerEmail: z
      .object({
        email: z.string(),
      })
      .optional(),
  })

export const updateCartSchema = () =>
  z.object({
    id: z.string(),
    locale: LocaleSchema,
    currency: CurrencySchema,
    actions: z.array(updateCartActionsSchema()).or(updateCartActionsSchema()),
  })
