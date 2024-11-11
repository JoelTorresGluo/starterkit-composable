import { analyticsClient } from '@oriuminc/analytics'
import {
  ComposableCart,
  ComposableCartItem,
  ComposableOrder,
  ComposableProduct,
} from '@oriuminc/commerce-generic'

/**
 * Find a ComposableCartItem by product id
 * @param cartItem
 * @param id
 */
const findCartItemByProductId = (cartItem: ComposableCartItem, id: string) => {
  return (cartItem.productId || cartItem.itemId) === id
}

/**
 * Find a ComposableCartItem by line item id
 * @param cartItem
 * @param id
 */
const findCartItemByLineItemId = (cartItem: ComposableCartItem, id: string) => {
  return cartItem.itemId === id
}

/**
 * Tracks a cartItem update
 */
export const analyticsTrackUpdateCart = (params: {
  lineItemId: string
  quantity?: number
  prevCart?: Partial<ComposableCart>
  nextCart?: Partial<ComposableCart>
}) => {
  const { prevCart, lineItemId } = params
  const item = prevCart?.items?.find((el) =>
    findCartItemByLineItemId(el, lineItemId)
  )
  const nextQty = params?.quantity ?? 0
  const prevQty = item?.quantity ?? 0
  const quantity = Math.abs(nextQty - prevQty)

  if (nextQty > prevQty) {
    analyticsTrackAddToCart({
      ...params,
      productId: item?.productId!,
      quantity,
    })
  } else {
    analyticsTrackRemoveFromCart({ ...params, quantity })
  }
}

/**
 * Tracks the add to Bag event
 */
export const analyticsTrackAddToCart = (params: {
  productId: string
  quantity?: number
  prevCart?: Partial<ComposableCart>
  nextCart?: Partial<ComposableCart>
}) => {
  const { nextCart, quantity, productId } = params
  const item = nextCart?.items?.find((el) =>
    findCartItemByProductId(el, productId)
  )

  if (!item) {
    return
  }

  analyticsClient.track({
    name: 'add_to_cart',
    params: {
      cart_id: nextCart?.id ?? '',
      currency: nextCart?.currency ?? '',
      value: (item.variant.price?.current.amount ?? 0) * (quantity ?? 0),
      items: [
        {
          id: item.productId ?? '',
          name: item.title ?? '',
          price: item.variant.price?.current.amount ?? 0,
          quantity,
          source: window.location.pathname,
          image_url: item.variant?.images?.[0]?.url,
        },
      ],
    },
  })
}

/**
 * Tracks the remove from cart event
 */
export const analyticsTrackRemoveFromCart = (params: {
  lineItemId: string
  quantity?: number
  prevCart?: Partial<ComposableCart>
}) => {
  const { prevCart, quantity, lineItemId } = params
  const item = prevCart?.items?.find((el) =>
    findCartItemByLineItemId(el, lineItemId)
  )

  if (!item) {
    return
  }

  analyticsClient.track({
    name: 'remove_from_cart',
    params: {
      cart_id: prevCart?.id ?? '',
      value: (item.variant.price?.current.amount ?? 0) * (quantity ?? 0),
      currency: prevCart?.currency ?? '',
      items: [
        {
          id: item.productId ?? '',
          name: item.title ?? '',
          price: item.variant.price?.current.amount ?? 0,
          quantity,
          source: window.location.pathname,
          image_url: item.variant?.images?.[0]?.url,
        },
      ],
    },
  })
}

export const analyticsTrackViewCart = (params: {
  cart?: Partial<ComposableCart>
  isDrawer?: boolean
}) => {
  const { cart, isDrawer = false } = params
  if (!cart) {
    return
  }

  analyticsClient.track({
    name: isDrawer ? 'view_cart_drawer' : 'view_cart',
    params: {
      cart_id: cart.id ?? '',
      value: cart.price?.subtotal ?? 0,
      currency: cart.currency ?? '',
      items:
        cart.items?.map((el) => ({
          id: el.productId ?? '',
          name: el.title ?? '',
          price: el.variant.price?.current.amount ?? 0,
          quantity: el.quantity ?? 0,
        })) ?? [],
    },
  })
}

export const analyticsTrackBeginCheckout = (params: {
  cart?: Partial<ComposableCart>
}) => {
  const { cart } = params
  if (!cart) {
    return
  }

  analyticsClient.track({
    name: 'begin_checkout',
    params: {
      cart_id: cart.id ?? '',
      value: cart.price?.subtotal ?? 0,
      currency: cart.currency ?? '',
      coupon: cart.discountCodes?.[0]?.code,
      items:
        cart.items?.map((el) => ({
          id: el.productId ?? '',
          name: el.title ?? '',
          price: el.variant.price?.current.amount ?? 0,
          quantity: el.quantity ?? 0,
        })) ?? [],
    },
  })
}

export const analyticsTrackAddShippingInfo = (params: {
  cart?: Partial<ComposableCart>
  shippingTier?: string
}) => {
  const { cart, shippingTier } = params
  if (!cart) {
    return
  }

  analyticsClient.track({
    name: 'add_shipping_info',
    params: {
      value: cart.price?.subtotal ?? 0,
      currency: cart.currency ?? '',
      coupon: cart.discountCodes?.[0]?.code,
      shipping_tier: shippingTier,
      items:
        cart.items?.map((el) => {
          return {
            item_id: el.productId ?? '',
            item_name: el.title ?? '',
            price: el.variant.price?.current.amount ?? 0,
            quantity: el.quantity ?? 0,
          }
        }) ?? [],
    },
  })
}

export const analyticsTrackAddPaymentInfo = (params: {
  cart?: Partial<ComposableCart>
  paymentType?: string
}) => {
  const { cart, paymentType } = params
  if (!cart) {
    return
  }

  analyticsClient.track({
    name: 'add_payment_info',
    params: {
      value: cart.price?.subtotal ?? 0,
      currency: cart.currency ?? '',
      coupon: cart.discountCodes?.[0]?.code,
      payment_type: paymentType ?? '',
      items:
        cart.items?.map((el) => {
          return {
            item_id: el.productId ?? '',
            item_name: el.title ?? '',
            price: el.variant.price?.current.amount ?? 0,
            quantity: el.quantity ?? 0,
          }
        }) ?? [],
    },
  })
}

export const analyticsTrackPurchase = (params: {
  order?: Partial<ComposableOrder>
}) => {
  const { order } = params
  if (!order) {
    return
  }

  analyticsClient.track({
    name: 'purchase',
    params: {
      cart_id: order.cartId,
      value: order.price?.subtotal ?? 0,
      currency: order.currency ?? '',
      coupon: order.discountCodes?.[0]?.code,
      transaction_id: order.id ?? '',
      shipping: order.price?.shipping,
      tax: order.price?.tax,
      items:
        order.items?.map((el) => {
          return {
            id: el.productId ?? '',
            name: el.title ?? '',
            price: el.variant.price?.current.amount ?? 0,
            quantity: el.quantity ?? 0,
          }
        }) ?? [],
    },
  })
}

export const analyticsTrackViewItem = (params: {
  product?: Partial<ComposableProduct>
}) => {
  const { product } = params
  if (!product) {
    return
  }

  const price = product.variants?.[0]?.price

  analyticsClient.track({
    name: 'view_item',
    params: {
      value: price?.current.amount ?? 0,
      currency: price?.current.currencyCode ?? '',
      items: [
        {
          id: product?.id ?? '',
          name: product?.title ?? '',
          price: price?.current.amount ?? 0,
          quantity: 1,
        },
      ],
    },
  })
}

export const analyticsTrackSignUp = ({ method }: { method?: string }) => {
  analyticsClient.track({
    name: 'sign_up',
    params: {
      method,
    },
  })
}

export const analyticsTrackLogin = ({ method }: { method?: string }) => {
  analyticsClient.track({
    name: 'login',
    params: {
      method,
    },
  })
}
