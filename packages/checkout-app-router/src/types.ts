import { IStripeCustomer, IStripeSetupIntent } from '@oriuminc/stripe'
import { FieldValues, UseFormProps } from 'react-hook-form'
import { ReactNode } from 'react'
import { ActorRefFrom } from 'xstate'
import {
  deliveryOptionsMachine,
  paymentMachine,
  reviewOrderMachine,
} from './machines'
import {
  ComposableShippingMethod,
  ComposableAddress,
} from '@oriuminc/commerce-generic'
import { CheckoutHeaderProps } from './experiences/three-step-checkout/components/layout/checkout-header'

type PickNullable<T> = {
  [P in keyof T as null extends T[P] ? P : never]: T[P]
}

type PickNotNullable<T> = {
  [P in keyof T as null extends T[P] ? never : P]: T[P]
}

type OptionalNullable<T> = {
  [K in keyof PickNullable<T>]?: Exclude<T[K], null>
} & {
  [K in keyof PickNotNullable<T>]: T[K]
}

export interface CheckoutExperienceProps {
  customerManagement: ComposableCheckoutCustomerManagement
  cartManagement: ComposableCheckoutCartManagement
  paymentManagement: ComposableCheckoutPaymentManagement
  orderManagement: ComposableCheckoutOrderManagement
  shippingManagement: ComposableCheckoutShippingManagement
  DesktopCartSummary: ReactNode
  MobileCartSummary?: React.ReactElement
  analytics: ComposableCheckoutAnalytics
  headerLogo?: CheckoutHeaderProps['headerLogo']
}

export interface UseCheckoutFormProps<T extends FieldValues> {
  initialValues: T
  formKey: string
  onChange: (event: { data: T; isValid: boolean }) => void
  hookFormProps?: UseFormProps<T>
}

export interface ComposableCheckoutLoginParams {
  email: string
  password: string
}
export type ComposableCheckoutLogin = ({
  email,
  password,
}: ComposableCheckoutLoginParams) => Promise<void>

export type ComposableCheckoutFetchShippingOptions = () => Promise<
  ComposableShippingMethod[]
>

export interface ComposableCheckoutAnalytics {
  'track.next.on.delivery': ({ context }: CheckoutMachineContext) => void
  'track.next.on.payment': ({ context }: CheckoutMachineContext) => void
}

export interface ComposableCheckoutCartManagement {
  cart: ComposableCheckoutCart
  clearCart: () => void
  submitShippingAddress: (
    shippingAddress: ComposableAddress & { email: string }
  ) => Promise<any>
  submitBillingAddress?: (billingAddress: ComposableAddress) => Promise<any>
  submitDeliveryOptions?: (
    data: ComposableSubmitDeliveryOptionsPayload
  ) => Promise<any>
}

export interface ComposableCheckoutPaymentManagement {
  confirmOrder: (data: ComposableConfirmOrderPayload) => Promise<{
    redirectUrl: string
    orderId?: string
  } | null>
  fetchStripeSetupIntent: (customerEmail: string) => Promise<any>
  onRedirectAfterPayment: (
    paymentMethod: SubmitOrderPaymentMethodData['key'],
    cartId: string
  ) => Promise<{
    redirectUrl: string
    orderId?: string
  }>
}

export interface ComposableCheckoutOrderManagement {
  setOrderId: (orderId: string) => void
}
export interface ComposableCheckoutShippingManagement {
  fetchShippingOptions: ComposableCheckoutFetchShippingOptions
  onSelectedShippingOption: (shippingOptionId: string | null) => void
  selectShippingOption: (shippingOptionId: string) => Promise<any>
}

export interface ComposableCheckoutCustomerManagement {
  login: ComposableCheckoutLogin
  fetchCustomer: ComposableCheckoutFetchCustomer
  updateCustomerAddress: (address: ComposableAddress) => Promise<any>
}

export interface ComposableSubmitDeliveryOptionsPayload {
  customerEmail: string
  shippingAddress: ComposableAddress
  shippingOptionSelected: string
}

export interface ComposableConfirmOrderPayload {
  customerEmail: string
  shippingAddress: ComposableAddress
  shippingMethodId: string
  billingAddress: ComposableAddress
  billingIsShipping: boolean
  paymentMethod: SubmitOrderPaymentMethodData
  saveNewAddress: boolean
}

export interface ComposableCheckoutShippingOption {
  id: string
  name: string
  description?: string | null
  zoneRates: {
    shippingRates: {
      price: {
        currencyCode: string
        centAmount: number
      }
    }[]
  }[]
}

export interface ComposableCheckoutCustomer {
  id?: string | null
  email: string
  addresses: ComposableAddress[]
  addressSelected?: ComposableAddress
  firstName: string
  lastName: string
}

export type ComposableCheckoutFetchCustomer =
  () => Promise<ComposableCheckoutCustomer>

export interface ComposableCheckoutAddress {
  shipping?: ComposableAddress
  billing?: ComposableAddress
}

export interface ComposableCheckoutCart {
  [key: string]: any
}

export interface ComposableCheckoutPaymentOption {
  id: string
  type: string // 'credit_card', 'paypal'
  cardNumber?: string
  expiry?: string
  cvv?: string
}

export interface ComposableCheckoutOrderSummary {
  items: ComposableCheckoutOrderItem[]
  subtotal: number
  taxes: number
  shipping: number
  total: number
}

export interface ComposableCheckoutOrderItem {
  productId: string
  name: string
  quantity: number
  price: number
}

export type ContextPaymentMethodData = {
  stripe?: {
    customer?: IStripeCustomer
    setupIntent?: IStripeSetupIntent
  }
  offline?: null
  purchaseOrder?: null
}

export type PaymentMethodData<T extends keyof ContextPaymentMethodData> = {
  key: T
  data: ContextPaymentMethodData[T]
}

export type StripePaymentMethodData = PaymentMethodData<'stripe'>
export type OfflinePaymentMethodData = PaymentMethodData<'offline'>
export type PurchaseOrderPaymentMethodData = PaymentMethodData<'purchaseOrder'>

export type SubmitOrderPaymentMethodData =
  | StripePaymentMethodData
  | OfflinePaymentMethodData
  | PurchaseOrderPaymentMethodData

export interface CheckoutMachineContext {
  context: {
    deliveryOptionsRef: ActorRefFrom<typeof deliveryOptionsMachine> | undefined
    paymentRef: ActorRefFrom<typeof paymentMachine> | undefined
    reviewOrderRef: ActorRefFrom<typeof reviewOrderMachine> | undefined

    cart: any
    orderId: string | null
    redirectUrl: string | null
  }
  input: {
    cart: any
  }
}
