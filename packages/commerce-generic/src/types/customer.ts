import { z } from 'zod'
import { ComposableAddress, ComposableAddressSchema } from './address'
import { LocaleSchema } from '@oriuminc/base'

/**
 * This is only used to forward the session to Bold checkout - remove if possible
 */
export interface ComposableSessionData {
  accessToken?: string
  refreshToken?: string
}

export interface ComposableAnonymousUser {
  id: string
  /**
   * This is only used to forward the session to Bold checkout - remove if possible
   */
  session?: ComposableSessionData
}

export interface ComposableCustomer {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  customerGroup?: string
  defaultShippingAddressId?: string
  defaultLocale?: string
  addresses?: ComposableAddress[]
  /**
   * This is only used to forward the session to Bold Checkout/Shopify - remove if possible
   */
  session?: ComposableSessionData
}

export const CustomerAddShippingAddressActionSchema = z.object({
  action: z.literal('saveShippingAddress'),
  address: ComposableAddressSchema,
})

export const CustomerUpdateShippingAddressActionSchema = z.object({
  action: z.literal('updateShippingAddress'),
  addressId: z.string().optional(),
  addressKey: z.string().optional(),
  address: ComposableAddressSchema,
})

export const CustomerDeleteShippingAddressActionSchema = z.object({
  action: z.literal('deleteShippingAddress'),
  addressId: z.string().optional(),
  addressKey: z.string().optional(),
})

export const CustomerSetDefaultShippingAddressActionSchema = z.object({
  action: z.literal('setDefaultShippingAddress'),
  addressId: z.string().optional(),
  addressKey: z.string().optional(),
})

export const CustomerUpdateEmailActionSchema = z.object({
  action: z.literal('updateEmail'),
  email: z.string(),
})

export const CustomerUpdateFirstNameActionSchema = z.object({
  action: z.literal('updateFirstName'),
  firstName: z.string(),
})

export const CustomerUpdateLastNameActionSchema = z.object({
  action: z.literal('updateLastName'),
  lastName: z.string(),
})

export const CustomerUpdateDefaultLocaleActionSchema = z.object({
  action: z.literal('updateDefaultLocale'),
  locale: LocaleSchema,
})

export const UpdateCustomerActionSchema = z.union([
  CustomerAddShippingAddressActionSchema,
  CustomerUpdateShippingAddressActionSchema,
  CustomerDeleteShippingAddressActionSchema,
  CustomerSetDefaultShippingAddressActionSchema,
  CustomerUpdateEmailActionSchema,
  CustomerUpdateFirstNameActionSchema,
  CustomerUpdateLastNameActionSchema,
  CustomerUpdateDefaultLocaleActionSchema,
])

export type UpdateCustomerAction = z.infer<typeof UpdateCustomerActionSchema>

export interface ComposableForgotPasswordToken {
  token: string
}
