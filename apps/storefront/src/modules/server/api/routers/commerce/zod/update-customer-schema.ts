import { z } from 'zod'
import { ComposableAddressSchema } from '@oriuminc/commerce-generic'

export const customerActionsSchema = z.object({
  addAddress: z.object({ address: ComposableAddressSchema }).optional(),

  changeAddress: z
    .object({
      addressId: z.string().optional(),
      addressKey: z.string().optional(),
      address: ComposableAddressSchema,
    })
    .optional(),

  changeEmail: z
    .object({
      email: z.string(),
    })
    .optional(),

  removeAddress: z
    .object({
      addressId: z.string().optional(),
      addressKey: z.string().optional(),
    })
    .optional(),

  setDefaultShippingAddress: z
    .object({
      addressId: z.string().optional(),
      addressKey: z.string().optional(),
    })
    .optional(),

  setFirstName: z
    .object({
      firstName: z.string(),
    })
    .optional(),

  setLastName: z
    .object({
      lastName: z.string(),
    })
    .optional(),

  setLocale: z
    .object({
      locale: z.string(),
    })
    .optional(),
})

export const customerSchema = z.object({
  version: z.number(),
  actions: z.array(customerActionsSchema).or(customerActionsSchema),
})

export type UpdateCustomerActionsSchema = z.infer<typeof customerActionsSchema>
