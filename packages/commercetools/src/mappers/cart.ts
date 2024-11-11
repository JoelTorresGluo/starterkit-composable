import {
  Cart as CommercetoolsCart,
  CartUpdateAction as CommercetoolsCartUpdateAction,
} from '@commercetools/platform-sdk'
import { Currency, Locale, LocaleAndCurrency } from '@oriuminc/base'
import { ComposableCart, UpdateCartAction } from '@oriuminc/commerce-generic'
import {
  commercetoolsLineItemToComposableCartItem,
  getCartItemsSubtotal,
  getCartShippingCost,
  getCartTax,
  getCartTotal,
} from './utils'
import {
  commercetoolsAddressToComposableAddress,
  composableAddressToCommercetoolsAddress,
} from './customer'

export const commercetoolsCartToComposableCart = ({
  cart,
  locale,
  currency,
}: { cart: CommercetoolsCart } & LocaleAndCurrency): ComposableCart => {
  const subtotal = getCartItemsSubtotal(cart)
  const tax = getCartTax(cart)
  const shipping = getCartShippingCost(cart)
  const totalBeforeDiscount = subtotal + (tax ?? 0) + (shipping ?? 0)
  const total = getCartTotal(cart)
  const discounts =
    total < totalBeforeDiscount ? totalBeforeDiscount - total : 0

  return {
    id: cart.id,
    anonymousId: cart.anonymousId,
    customerId: cart.customerId,
    customerEmail: cart.customerEmail,
    locale: cart.locale as Locale,
    currency: cart.totalPrice.currencyCode as Currency,
    isActive: cart.cartState === 'Active',
    price: {
      subtotal,
      tax,
      shipping,
      discounts,
      total,
    },
    discountCodes: cart.discountCodes?.map((discountCode) => ({
      id: discountCode.discountCode.id,
      code: discountCode.discountCode.obj?.code ?? '',
    })),
    items: cart.lineItems.map((item) =>
      commercetoolsLineItemToComposableCartItem({ item, locale, currency })
    ),
    itemsTotalQuantity: cart.lineItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    ),
    shippingAddress: cart.shippingAddress
      ? commercetoolsAddressToComposableAddress(cart.shippingAddress)
      : undefined,
    billingAddress: cart.billingAddress
      ? commercetoolsAddressToComposableAddress(cart.billingAddress)
      : undefined,
  }
}

export const composableCartActionToCommercetoolsCartAction = (
  action: UpdateCartAction
): CommercetoolsCartUpdateAction => {
  switch (action.action) {
    case 'addLineItem':
      return {
        ...action,
        variantId: (action.variantId
          ? parseInt(action.variantId)
          : undefined) as any, //FIXME: type assertion to resolve a type error related to using @commercetools/platform-sdk v3. Need to upgrade to @commercetools/platform-sdk @latest
      }
    case 'setShippingAddress':
      return {
        ...action,
        address: composableAddressToCommercetoolsAddress(action.address),
      }
    case 'setBillingAddress':
      return {
        ...action,
        address: composableAddressToCommercetoolsAddress(action.address),
      }
    case 'addPayment':
      return {
        ...action,
        payment: {
          ...action.payment,
          typeId: 'payment',
        },
      }
    case 'removeDiscountCode':
      return {
        ...action,
        discountCode: {
          ...action.discountCode,
          typeId: 'discount-code',
        },
      }
    case 'setShippingMethod':
      return {
        ...action,
        shippingMethod: {
          ...action.shippingMethod,
          typeId: 'shipping-method',
        },
      }
    case 'setCustomerEmail':
  }
  return action
}
