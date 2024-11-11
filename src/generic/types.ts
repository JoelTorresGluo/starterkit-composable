import {
  GaAddPaymentInfoEvent,
  GaAddShippingInfoEvent,
  GaLoginEvent,
  GaSignUpEvent,
} from '../ga4'

export type GenericEvent<Name = string, Params = any> = {
  name: Name
  params?: Params
}

export type GenericEventsCollection =
  | GenericAddToCartEvent
  | GenericViewItemEvent
  | GenericRemoveFromCartEvent
  | GenericViewCartEvent
  | GenericViewCartDrawerEvent
  | GenericBeginCheckoutEvent
  | GenericPurchaseEvent
  | GenericViewItemListEvent
  | GenericAddPaymentInfoEvent
  | GenericAddShippingInfoEvent
  | GenericGaLoginEvent
  | GenericSignUpEvent
  | GenericSearchEvent

export type GenericAddToCartEvent = GenericEvent<
  'add_to_cart',
  {
    cart_id: string
    currency: string
    value: number
    items: {
      id: string
      name: string
      sku?: string
      brand?: string
      price?: number
      quantity?: number
      variant?: string
      size?: string
      product_url?: string
      source?: string
      list_id?: string
      list_name?: string
      categories?: string[]
      image_url?: string
      coupon?: string
      discount?: number
      index?: number
      location_id?: string
      affiliation?: string
    }[]
  }
>

export type GenericRemoveFromCartEvent = GenericEvent<
  'remove_from_cart',
  {
    cart_id: string
    currency: string
    value: number
    items: {
      id: string
      name: string
      sku?: string
      brand?: string
      price?: number
      quantity?: number
      variant?: string
      size?: string
      product_url?: string
      source?: string
      list_id?: string | number
      list_name?: string
      categories?: string[]
      image_url?: string
      coupon?: string
      discount?: number
      index?: number
      location_id?: string
      affiliation?: string
    }[]
  }
>

export type GenericViewItemEvent = GenericEvent<
  'view_item',
  {
    currency: string
    value: number
    items: {
      id: string
      name: string
      sku?: string
      brand?: string
      price?: number
      quantity?: number
      variant?: string
      size?: string
      product_url?: string
      source?: string
      list_id?: string
      list_name?: string
      categories?: string[]
      image_url?: string
      coupon?: string
      discount?: number
      index?: number
      location_id?: string
      affiliation?: string
    }[]
  }
>

export type GenericViewCartEvent = GenericEvent<
  'view_cart',
  {
    cart_id: string
    currency: string
    value: number
    email?: string
    items: {
      id: string
      name: string
      sku?: string
      brand?: string
      price?: number
      quantity?: number
      variant?: string
      size?: string
      product_url?: string
      source?: string
      list_id?: string | number
      list_name?: string
      categories?: string[]
      image_url?: string
      coupon?: string
      discount?: number
      index?: number
      location_id?: string
      affiliation?: string
    }[]
  }
>

export type GenericViewCartDrawerEvent = GenericEvent<
  'view_cart_drawer',
  GenericViewCartEvent['params']
>

export type GenericBeginCheckoutEvent = GenericEvent<
  'begin_checkout',
  {
    cart_id: string
    currency: string
    value: number
    coupon?: string
    guest?: boolean
    list_id?: number
    list_name?: string
    items: {
      id: string
      name: string
      sku?: string
      brand?: string
      price?: number
      quantity?: number
      variant?: string
      size?: string
      product_url?: string
      source?: string
      list_id?: string | number
      list_name?: string
      categories?: string[]
      image_url?: string
      coupon?: string
      discount?: number
      index?: number
      location_id?: string
      affiliation?: string
    }[]
  }
>

export type GenericPurchaseEvent = GenericEvent<
  'purchase',
  {
    cart_id?: string
    currency: string
    transaction_id: string
    affiliation?: string
    coupon?: string
    discount?: number
    email?: string
    subtotal?: number
    shipping?: number
    tax?: number
    value: number
    bopis?: boolean
    billing_address?: {
      address1?: string
      address2?: string
      city?: string
      country?: string
      first_name?: string
      last_name?: string
      phone?: string
      state?: string
      zip?: string
    }
    shipping_address?: {
      address1?: string
      address2?: string
      city?: string
      company?: string
      country?: string
      first_name?: string
      last_name?: string
      phone?: string
      state?: string
      zip?: string
    }
    items: {
      id: string
      name: string
      sku?: string
      brand?: string
      price?: number
      quantity?: number
      variant?: string
      product_url?: string
      categories?: string[]
      image_url?: string
      coupon?: string
      discount?: number
      index?: number
      list_id?: number
      list_name?: string
      location_id?: string
      affiliation?: string
    }[]
  }
>

export type GenericViewItemListEvent = GenericEvent<
  'view_item_list',
  {
    list_id?: string | number
    list_name?: string
    items: {
      id: string
      name: string
      sku?: string
      brand?: string
      price?: number
      quantity?: number
      variant?: string
      product_url?: string
      categories?: string[]
      image_url?: string
      coupon?: string
      discount?: number
      index?: number
      location_id?: string
      affiliation?: string
    }[]
  }
>

export type GenericSearchEvent = GenericEvent<
  'search',
  {
    search_term: string
  }
>

/* for now, only GA has the following events */

export type GenericAddPaymentInfoEvent = GaAddPaymentInfoEvent
export type GenericAddShippingInfoEvent = GaAddShippingInfoEvent
export type GenericGaLoginEvent = GaLoginEvent
export type GenericSignUpEvent = GaSignUpEvent
