import {
  Attribute as CommercetoolsAttribute,
  Cart as CommercetoolsCart,
  Order as CommercetoolsOrder,
  Image as CommercetoolsImage,
  LineItem as CommercetoolsLineItem,
  Price as CommercetoolsPrice,
  TypedMoney as CommercetoolsTypedMoney,
  ProductVariantAvailability,
} from '@commercetools/platform-sdk'
import { LocaleAndCurrency } from '@oriuminc/base'
import {
  ComposableAttribute,
  ComposableCartItem,
  ComposableImage,
  ComposableMoney,
  ComposablePrice,
} from '@oriuminc/commerce-generic'

export const commercetoolsPriceToComposablePrice = (
  price: CommercetoolsPrice
): ComposablePrice => {
  return {
    current: price.discounted
      ? commercetoolsTypedMoneyToComposableMoney(price.discounted.value)
      : commercetoolsTypedMoneyToComposableMoney(price.value),
    original: commercetoolsTypedMoneyToComposableMoney(price.value),
  }
}

export const commercetoolsTypedMoneyToComposableMoney = (
  typedMoney: CommercetoolsTypedMoney
): ComposableMoney => {
  return {
    currencyCode: typedMoney?.currencyCode,
    amount: typedMoney?.centAmount,
  }
}

export const commercetoolsImageToComposableImage = (
  img: CommercetoolsImage
): ComposableImage => {
  return {
    url: img.url,
    altText: img.label,
    height: img.dimensions.h,
    width: img.dimensions.w,
  }
}

export const commercetoolsAvailabilityToStockQuantity = ({
  availability,
  channelId,
}: {
  availability: ProductVariantAvailability
  channelId?: string
}) => {
  // if no channel is provided return the no-channel value
  if (!channelId) return availability.availableQuantity
  return availability.channels?.[channelId]?.availableQuantity
}

export const commercetoolsAttributeToComposableAttribute = (
  attribute: CommercetoolsAttribute
): ComposableAttribute => {
  const value: string =
    typeof attribute.value === 'string' || typeof attribute.value === 'number'
      ? attribute.value
      : isPlainObject(attribute.value) && attribute.value.label
      ? attribute.value.label
      : undefined
  return {
    name: attribute.name,
    value,
  }
}

export const isPlainObject = (obj: any) => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    !Array.isArray(obj) &&
    !(obj instanceof Function)
  )
}

// cart and order

export const commercetoolsLineItemToComposableCartItem = ({
  item,
  locale,
  currency,
}: { item: CommercetoolsLineItem } & LocaleAndCurrency): ComposableCartItem => {
  const variantPrice =
    item.variant.price ??
    item.variant.prices?.find((price) => price.value.currencyCode === currency)
  return {
    itemId: item.id,
    productId: item.productId,
    productKey: item.productKey,
    slug: item.productSlug?.[locale] ?? '',
    title: item.name?.[locale] ?? '',
    quantity: item.quantity,
    variant: {
      id: item.variant.id.toString(),
      title: item.name?.[locale] ?? '',
      parentId: item.productId,
      sku: item.variant.sku,
      price: variantPrice
        ? commercetoolsPriceToComposablePrice(variantPrice)
        : undefined,
      images: item.variant.images?.map(commercetoolsImageToComposableImage),
      attributes: item.variant.attributes?.map(
        commercetoolsAttributeToComposableAttribute
      ),
    },
  }
}
/**
 *
 * @param cart
 * @returns cart subtotal in cents
 */
export const getCartItemsSubtotal = (
  cart: CommercetoolsCart | CommercetoolsOrder
) => {
  return cart.lineItems.reduce((acc, item) => {
    const itemUnitPrice = commercetoolsTypedMoneyToComposableMoney(
      item.price.discounted?.value ?? item.price.value
    ).amount
    return acc + itemUnitPrice * item.quantity
  }, 0)
}

export const getCartTax = (cart: CommercetoolsCart | CommercetoolsOrder) => {
  return cart?.taxedPrice?.totalTax !== undefined
    ? commercetoolsTypedMoneyToComposableMoney(cart.taxedPrice.totalTax).amount
    : undefined
}

/**
 *
 * @param cart
 * @returns cart shipping cost in cents
 */
export const getCartShippingCost = (
  cart: CommercetoolsCart | CommercetoolsOrder
) => {
  return cart.shippingInfo?.price
    ? commercetoolsTypedMoneyToComposableMoney(cart.shippingInfo.price).amount
    : undefined
}

/**
 *
 * @param cart
 * @returns cart total in cents
 */
export const getCartTotal = (cart: CommercetoolsCart | CommercetoolsOrder) => {
  return cart.taxedPrice?.totalGross
    ? commercetoolsTypedMoneyToComposableMoney(cart.taxedPrice?.totalGross)
        .amount
    : commercetoolsTypedMoneyToComposableMoney(cart?.totalPrice).amount
}
