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
  SegmentCartDrawerViewedEvent,
  SegmentCartUpdatedEvent,
  SegmentCartViewedEvent,
  SegmentCheckoutStartedEvent,
  SegmentEventsCollection,
  SegmentOrderSubmittedEvent,
  SegmentProductAddedEvent,
  SegmentProductListViewedEvent,
  SegmentProductViewedEvent,
} from './types'

export function castToSegmentEvent(
  event: GenericEventsCollection
): SegmentEventsCollection | undefined {
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
  }
}

function castAddToCartEvent({
  params,
}: GenericAddToCartEvent): SegmentProductAddedEvent {
  const item = params?.items[0]
  return {
    name: 'Product Added',
    params: {
      brand: item?.brand,
      cart_id: params?.cart_id,
      category1: item?.categories?.[0],
      category2: item?.categories?.[1],
      category3: item?.categories?.[2],
      image_url: item?.image_url,
      name: item?.name,
      position: item?.index,
      price: item?.price,
      product_id: item?.id,
      quantity: item?.quantity,
      size: item?.size,
      sku: item?.sku,
      source: item?.source,
      url: item?.product_url,
      variant: item?.variant,
      list_id: item?.list_id,
      list_name: item?.list_name,
    },
  }
}

function castRemoveFromCartEvent({
  params,
}: GenericRemoveFromCartEvent): SegmentCartUpdatedEvent {
  return {
    name: 'Cart Updated',
    params: {
      cart_id: params?.cart_id,
      action: 'Product Removed',
      products:
        params?.items?.map((item) => ({
          brand: item?.brand,
          image_url: item?.image_url,
          name: item?.name,
          url: item?.product_url,
          position: item?.index,
          price: item?.price,
          product_id: item?.id,
          quantity: item?.quantity,
          sku: item?.sku,
          variant: item?.variant,
          category1: item?.categories?.[0],
          category2: item?.categories?.[1],
          category3: item?.categories?.[2],
        })) ?? [],
    },
  }
}

function castViewItemEvent({
  params,
}: GenericViewItemEvent): SegmentProductViewedEvent {
  const item = params?.items[0]
  return {
    name: 'Product Viewed',
    params: {
      brand: item?.brand,
      category1: item?.categories?.[0],
      category2: item?.categories?.[1],
      category3: item?.categories?.[2],
      image_url: item?.image_url,
      name: item?.name,
      position: item?.index,
      price: item?.price,
      product_id: item?.id,
      size: item?.size,
      sku: item?.sku,
      url: item?.product_url,
      list_id: item?.list_id,
      list_name: item?.list_name,
    },
  }
}

function castViewCartEvent({
  params,
}: GenericViewCartEvent): SegmentCartViewedEvent {
  return {
    name: 'Cart Viewed',
    params: {
      cart_id: params?.cart_id,
      currency: params?.currency,
      email: params?.email,
      item_count: params?.items?.length ?? 0,
      total: params?.value,
      products:
        params?.items?.map((item) => ({
          brand: item.brand,
          url: item.product_url,
          price: item.price,
          product_id: item.id,
          image_url: item.image_url,
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          variant: item.variant,
          position: item.index,
          sku: item.sku,
          category1: item.categories?.[0],
          category2: item.categories?.[1],
          category3: item.categories?.[2],
          source: item.source,
        })) ?? [],
    },
  }
}

function castViewCartDrawerEvent({
  params,
}: GenericViewCartDrawerEvent): SegmentCartDrawerViewedEvent {
  return {
    name: 'Cart Drawer Viewed',
    params: {
      cart_id: params?.cart_id,
      currency: params?.currency,
      email: params?.email,
      item_count: params?.items?.length ?? 0,
      total: params?.value,
      products:
        params?.items?.map((item) => ({
          brand: item.brand,
          url: item.product_url,
          price: item.price,
          product_id: item.id,
          image_url: item.image_url,
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          variant: item.variant,
          position: item.index,
          sku: item.sku,
          category1: item.categories?.[0],
          category2: item.categories?.[1],
          category3: item.categories?.[2],
          source: item.source,
        })) ?? [],
    },
  }
}

function castBeginCheckoutEvent({
  params,
}: GenericBeginCheckoutEvent): SegmentCheckoutStartedEvent {
  return {
    name: 'Checkout Started',
    params: {
      cart_id: params?.cart_id,
      currency: params?.currency,
      total: params?.value,
      list_id: params?.list_id,
      list_name: params?.list_name,
      guest: params?.guest,
      products:
        params?.items?.map((item) => ({
          brand: item.brand,
          url: item.product_url,
          price: item.price,
          product_id: item.id,
          image_url: item.image_url,
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          variant: item.variant,
          position: item.index,
          sku: item.sku,
          category1: item.categories?.[0],
          category2: item.categories?.[1],
          category3: item.categories?.[2],
        })) ?? [],
    },
  }
}

function castPurchaseEvent({
  params,
}: GenericPurchaseEvent): SegmentOrderSubmittedEvent {
  return {
    name: 'Order Submitted',
    params: {
      order_id: params?.transaction_id ?? '',
      cart_id: params?.cart_id,
      bopis: params?.bopis,
      currency: params?.currency,
      email: params?.email,
      first_name:
        params?.shipping_address?.first_name ||
        params?.billing_address?.first_name,
      last_name:
        params?.shipping_address?.last_name ||
        params?.billing_address?.last_name,
      coupon: params?.coupon,
      quantity: params?.items?.length,
      subtotal: params?.subtotal,
      discount: params?.discount,
      tax: params?.tax,
      total: params?.value,
      shipping_address: params?.shipping_address,
      billing_address: params?.billing_address,
      products:
        params?.items?.map((item) => ({
          brand: item.brand,
          url: item.product_url,
          price: item.price,
          product_id: item.id,
          image_url: item.image_url,
          name: item.name,
          quantity: item.quantity,
          variant: item.variant,
          sku: item.sku,
          category1: item.categories?.[0],
          category2: item.categories?.[1],
          category3: item.categories?.[2],
        })) ?? [],
    },
  }
}

function castViewItemListEvent({
  params,
}: GenericViewItemListEvent): SegmentProductListViewedEvent {
  return {
    name: 'Product List Viewed',
    params: {
      list_id: params?.list_id,
      list_name: params?.list_name,
      products:
        params?.items?.map((item) => ({
          brand: item.brand,
          url: item.product_url,
          product_id: item.id,
          image_url: item.image_url,
          name: item.name,
          quantity: item.quantity,
          variant: item.variant,
          sku: item.sku,
          category1: item.categories?.[0],
          category2: item.categories?.[1],
          category3: item.categories?.[2],
        })) ?? [],
    },
  }
}
