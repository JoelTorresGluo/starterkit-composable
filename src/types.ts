import { AxiosInstance } from 'axios'

export interface IStripeServiceDeps<T = {}> {
  client: AxiosInstance
  params: T
}

export interface IStripePaymentIntentOptions {
  amount: number
  currency: string
  confirm?: boolean
  off_session?: boolean
  capture_method?: 'manual' | 'automatic'
  automatic_payment_methods?: {
    enabled: boolean
  }
  payment_method?: string
  customer?: string
  return_url?: string
}

export interface IStripePaymentIntent {
  id: string
  client_secret: string
  status: IStripePaymentIntentStatus
  payment_method?: string
  next_action?: {
    redirect_to_url: {
      return_url: string
      url: string
    }
    type: string
  }
}

export type IStripePaymentIntentStatus =
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_action'
  | 'processing'
  | 'requires_capture'
  | 'canceled'
  | 'succeeded'

export interface IStripeCharge {
  id: string
  payment_method_details: {
    type: string
    card?: IStripeCard
  }
}

export interface IStripeCard {
  brand: string
  country: string
  exp_month: number
  exp_year: number
  last4: string
}

export interface IStripeLink {
  email: string
}

export interface IStripeCustomerOptions {
  email: string
}

export interface IStripeCustomer {
  id: string
  email: string | null
}

export interface IStripeCustomerSearchResponse {
  data: IStripeCustomer[]
}

export interface IStripePaymentMethodOptions {
  id: string
}

export interface IStripePaymentMethod {
  id: string
  card?: IStripeCard
  link?: IStripeLink
}

export interface IStripeSetupIntentOptions {
  usage?: 'on_session' | 'off_session'
  customer?: string
  payment_method_types?: string[]
  automatic_payment_methods?: {
    enabled: boolean
  }
}

export interface IStripeSetupIntent {
  id: string
  client_secret: string
  payment_method: string | null
}

export type StripeAddress = {
  name: string
  firstName?: string
  lastName?: string
  address: {
    line1: string
    line2: string | null
    city: string
    state: string
    postal_code: string
    country: string
  }
  phone?: string
}
