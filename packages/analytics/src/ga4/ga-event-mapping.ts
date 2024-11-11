import {
  GenericAddToCartEvent,
  GenericBeginCheckoutEvent,
  GenericEventsCollection,
  GenericPurchaseEvent,
  GenericRemoveFromCartEvent,
  GenericViewCartDrawerEvent,
  GenericViewCartEvent,
  GenericViewItemEvent,
  GenericViewItemListEvent,
} from '../generic'
import {
  GaAddToCartEvent,
  GaBeginCheckoutEvent,
  GaEventsCollection,
  GaPurchaseEvent,
  GaRemoveFromCartEvent,
  GaViewCartDrawerEvent,
  GaViewCartEvent,
  GaViewItemEvent,
  GaViewItemListEvent,
} from './types'

export function castToGoogleAnalyticsEvent(
  event: GenericEventsCollection
): GaEventsCollection | undefined {
  switch (event.name) {
    case 'add_to_cart':
      return castAddToCartEvent(event)
    case 'remove_from_cart':
      return castRemoveFromCartEvent(event)
    case 'view_item':
      return castViewItemEvent(event)
    case 'view_cart':
      return castViewCartEvent(event)
    case 'view_cart_drawer':
      return castViewCartDrawerEvent(event)
    case 'begin_checkout':
      return castBeginCheckoutEvent(event)
    case 'purchase':
      return castPurchaseEvent(event)
    case 'view_item_list':
      return castViewItemListEvent(event)
    case 'add_payment_info':
    case 'add_shipping_info':
    case 'login':
    case 'sign_up':
      return event // so far only for ga
    case 'search':
      return event
  }
}

function castAddToCartEvent({
  params,
}: GenericAddToCartEvent): GaAddToCartEvent {
  return {
    name: 'add_to_cart',
    params: {
      currency: params?.currency ?? '',
      value: params?.value ?? 0,
      items:
        params?.items?.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          affiliation: item.affiliation,
          coupon: item.coupon,
          discount: item.discount,
          index: item.index,
          item_brand: item.brand,
          item_category: item.categories?.[0],
          item_category2: item.categories?.[1],
          item_category3: item.categories?.[2],
          item_category4: item.categories?.[3],
          item_category5: item.categories?.[4],
          item_list_id: item.list_id,
          item_list_name: item.list_name,
          item_variant: item.variant,
          location_id: item.location_id,
          price: item.price,
          quantity: item.quantity,
        })) ?? [],
    },
  }
}

function castRemoveFromCartEvent({
  params,
}: GenericRemoveFromCartEvent): GaRemoveFromCartEvent {
  return {
    name: 'remove_from_cart',
    params: {
      currency: params?.currency ?? '',
      value: params?.value ?? 0,
      items:
        params?.items?.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          affiliation: item.affiliation,
          coupon: item.coupon,
          discount: item.discount,
          index: item.index,
          item_brand: item.brand,
          item_category: item.categories?.[0],
          item_category2: item.categories?.[1],
          item_category3: item.categories?.[2],
          item_category4: item.categories?.[3],
          item_category5: item.categories?.[4],
          item_list_id: item.list_id?.toString(),
          item_list_name: item.list_name,
          item_variant: item.variant,
          location_id: item.location_id,
          price: item.price,
          quantity: item.quantity,
        })) ?? [],
    },
  }
}

function castViewItemEvent({ params }: GenericViewItemEvent): GaViewItemEvent {
  return {
    name: 'view_item',
    params: {
      currency: params?.currency ?? '',
      value: params?.value ?? 0,
      items:
        params?.items?.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          affiliation: item.affiliation,
          coupon: item.coupon,
          discount: item.discount,
          index: item.index,
          item_brand: item.brand,
          item_category: item.categories?.[0],
          item_category2: item.categories?.[1],
          item_category3: item.categories?.[2],
          item_category4: item.categories?.[3],
          item_category5: item.categories?.[4],
          item_list_id: item.list_id,
          item_list_name: item.list_name,
          item_variant: item.variant,
          location_id: item.location_id,
          price: item.price,
          quantity: item.quantity,
        })) ?? [],
    },
  }
}

function castViewCartEvent({ params }: GenericViewCartEvent): GaViewCartEvent {
  return {
    name: 'view_cart',
    params: {
      currency: params?.currency ?? '',
      value: params?.value ?? 0,
      items:
        params?.items?.map((item) => ({
          item_id: item.sku || item.id,
          item_name: item.name,
          affiliation: item.affiliation,
          coupon: item.coupon,
          discount: item.discount,
          index: item.index,
          item_brand: item.brand,
          item_category: item.categories?.[0],
          item_category2: item.categories?.[1],
          item_category3: item.categories?.[2],
          item_category4: item.categories?.[3],
          item_category5: item.categories?.[4],
          item_list_id: item.list_id?.toString(),
          item_list_name: item.list_name,
          item_variant: item.variant,
          location_id: item.location_id,
          price: item.price,
          quantity: item.quantity,
        })) ?? [],
    },
  }
}

function castViewCartDrawerEvent({
  params,
}: GenericViewCartDrawerEvent): GaViewCartDrawerEvent {
  return {
    name: 'view_cart_drawer',
    params: {
      currency: params?.currency ?? '',
      value: params?.value ?? 0,
      items:
        params?.items?.map((item) => ({
          item_id: item.sku || item.id,
          item_name: item.name,
          affiliation: item.affiliation,
          coupon: item.coupon,
          discount: item.discount,
          index: item.index,
          item_brand: item.brand,
          item_category: item.categories?.[0],
          item_category2: item.categories?.[1],
          item_category3: item.categories?.[2],
          item_category4: item.categories?.[3],
          item_category5: item.categories?.[4],
          item_list_id: item.list_id?.toString(),
          item_list_name: item.list_name,
          item_variant: item.variant,
          location_id: item.location_id,
          price: item.price,
          quantity: item.quantity,
        })) ?? [],
    },
  }
}

function castBeginCheckoutEvent({
  params,
}: GenericBeginCheckoutEvent): GaBeginCheckoutEvent {
  return {
    name: 'begin_checkout',
    params: {
      currency: params?.currency ?? '',
      value: params?.value ?? 0,
      coupon: params?.coupon,
      items:
        params?.items?.map((item) => ({
          item_id: item.sku || item.id,
          item_name: item.name,
          affiliation: item.affiliation,
          coupon: item.coupon,
          discount: item.discount,
          index: item.index,
          item_brand: item.brand,
          item_category: item.categories?.[0],
          item_category2: item.categories?.[1],
          item_category3: item.categories?.[2],
          item_category4: item.categories?.[3],
          item_category5: item.categories?.[4],
          item_list_id: item.list_id?.toString(),
          item_list_name: item.list_name,
          item_variant: item.variant,
          location_id: item.location_id,
          price: item.price,
          quantity: item.quantity,
        })) ?? [],
    },
  }
}

function castPurchaseEvent({ params }: GenericPurchaseEvent): GaPurchaseEvent {
  return {
    name: 'purchase',
    params: {
      currency: params?.currency ?? '',
      transaction_id: params?.transaction_id ?? '',
      value: params?.value ?? 0,
      affiliation: params?.affiliation,
      coupon: params?.coupon,
      shipping: params?.shipping,
      tax: params?.tax,
      items:
        params?.items?.map((item) => ({
          item_id: item.sku || item.id,
          item_name: item.name,
          affiliation: item.affiliation,
          coupon: item.coupon,
          discount: item.discount,
          index: item.index,
          item_brand: item.brand,
          item_category: item.categories?.[0],
          item_category2: item.categories?.[1],
          item_category3: item.categories?.[2],
          item_category4: item.categories?.[3],
          item_category5: item.categories?.[4],
          item_list_id: item.list_id?.toString(),
          item_list_name: item.list_name,
          item_variant: item.variant,
          location_id: item.location_id,
          price: item.price,
          quantity: item.quantity,
        })) ?? [],
    },
  }
}

function castViewItemListEvent({
  params,
}: GenericViewItemListEvent): GaViewItemListEvent {
  return {
    name: 'view_item_list',
    params: {
      item_list_id: params?.list_id?.toString(),
      item_list_name: params?.list_name,
      items:
        params?.items?.map((item) => ({
          item_id: item.sku || item.id,
          item_name: item.name,
          affiliation: item.affiliation,
          coupon: item.coupon,
          discount: item.discount,
          index: item.index,
          item_brand: item.brand,
          item_category: item.categories?.[0],
          item_category2: item.categories?.[1],
          item_category3: item.categories?.[2],
          item_category4: item.categories?.[3],
          item_category5: item.categories?.[4],
          item_list_id: params?.list_id?.toString(),
          item_list_name: params?.list_name,
          item_variant: item.variant,
          location_id: item.location_id,
          price: item.price,
          quantity: item.quantity,
        })) ?? [],
    },
  }
}
