import { Locale, LocaleAndCurrency } from '@oriuminc/base'
import { PaginatedResponse, PaginationParams } from './pagination'
import {
  ComposableAccessToken,
  ComposableAnonymousUser,
  ComposableCart,
  ComposableCategory,
  ComposableCustomer,
  ComposableForgotPasswordToken,
  ComposableOrder,
  ComposablePayment,
  ComposableProduct,
  ComposableProductSearchQueryParams,
  ComposableShippingMethod,
  UpdateCartAction,
  UpdateCustomerAction,
  UpdateOrderAction,
} from './types'

export type GetProducts = (
  params: {
    query?: ComposableProductSearchQueryParams
    customerGroup?: ComposableCustomer['customerGroup']
  } & PaginationParams &
    LocaleAndCurrency
) => Promise<PaginatedResponse<ComposableProduct>>

export type GetProductBySlug = (
  params: {
    slug: string
    customerGroup?: ComposableCustomer['customerGroup']
    stockChannel?: string
  } & LocaleAndCurrency
) => Promise<ComposableProduct | null>

export type GetCustomer = (params: {
  customerId: string
  token?: string
}) => Promise<ComposableCustomer | null>

export type CreateCustomer = (params: {
  email: string
  password: string
  firstName?: string
  lastName?: string
}) => Promise<ComposableCustomer>

export type UpdateCustomer = (params: {
  customerId: string
  actions: UpdateCustomerAction[]
}) => Promise<ComposableCustomer>

export type ChangePassword = (params: {
  customerId: string
  currentPassword: string
  newPassword: string
}) => Promise<ComposableCustomer>

export type ForgotPassword = (params: {
  email: string
  ip?: string
}) => Promise<ComposableForgotPasswordToken>

export type ResetPassword = (params: {
  newPassword: string
  token: string
}) => Promise<ComposableCustomer>

export type CreateCart = (
  params: {
    anonymousId?: string
    customerId?: string
    customerEmail?: string
    context?: any
    customerAccessToken?: string
  } & LocaleAndCurrency
) => Promise<ComposableCart>

export type GetLastCart = (
  params: {
    anonymousId?: string
    customerId?: string
    cartId?: string
    accessToken?: string
    customerEmail?: string
  } & LocaleAndCurrency
) => Promise<ComposableCart | null>

export type GetCartById = (
  params: {
    cartId: string
  } & LocaleAndCurrency
) => Promise<ComposableCart | null>

export type UpdateCart = (
  params: {
    id: string
    actions: UpdateCartAction[]
  } & LocaleAndCurrency
) => Promise<ComposableCart>

export type ReplicateCart = (
  params: {
    cartId: string
  } & LocaleAndCurrency
) => Promise<ComposableCart>

export type GetShippingMethods = (
  params: {
    cartId?: string
    country?: string
    state?: string
    city?: string
    postalCode?: string
  } & LocaleAndCurrency &
    PaginationParams
) => Promise<PaginatedResponse<ComposableShippingMethod>>

export type CreateOrderFromCart = (
  params: {
    cartId: string
    payments: {
      /** amount in cents */
      amount: number
      paymentInterface: ComposablePayment['paymentInterface']
    }[]
  } & LocaleAndCurrency
) => Promise<ComposableOrder>

export type GetOrderById = (
  params: {
    orderId: string
  } & LocaleAndCurrency
) => Promise<ComposableOrder | null>

export type GetCustomerOrders = (
  params: {
    customerId: string
    sort?: string
  } & LocaleAndCurrency &
    PaginationParams
) => Promise<PaginatedResponse<ComposableOrder>>

export type UpdateOrder = (
  params: {
    orderId: string
    actions: UpdateOrderAction[]
  } & LocaleAndCurrency
) => Promise<ComposableOrder>

export type GetCategories = (
  params: { locale: Locale } & PaginationParams
) => Promise<PaginatedResponse<ComposableCategory>>

export type GetCategoryBySlug = (params: {
  slug: string
  locale: Locale
}) => Promise<ComposableCategory | null>

/**
 * This is only used to forward the session to Bold checkout - remove if possible
 */
export type GetAccessToken = (params: {
  anonymousUser?: ComposableAnonymousUser
  customer?: ComposableCustomer
}) => Promise<ComposableAccessToken>

/**
 * This is only used to forward the session to SFCC checkout - remove if possible
 */
export type GetOcapiSessinBridgeClient = () => Promise<{
  hostedCheckoutRedirectUrl: string
}>
