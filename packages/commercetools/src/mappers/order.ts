import {
  Order as CommercetoolsOrder,
  OrderUpdateAction as CommercetoolsOrderAction,
} from '@commercetools/platform-sdk'
import { Currency, Locale, LocaleAndCurrency } from '@oriuminc/base'
import {
  ComposableOrder,
  ComposableOrderPaymentStatus,
  ComposableOrderStatus,
  UpdateOrderAction,
} from '@oriuminc/commerce-generic'
import { commercetoolsPaymentToComposablePayment } from './payment'
import {
  commercetoolsLineItemToComposableCartItem,
  commercetoolsTypedMoneyToComposableMoney,
  getCartItemsSubtotal,
  getCartShippingCost,
  getCartTax,
  getCartTotal,
} from './utils'
import { commercetoolsAddressToComposableAddress } from './customer'

export const commercetoolsOrderToComposableOrder = ({
  order,
  locale,
  currency,
}: { order: CommercetoolsOrder } & LocaleAndCurrency): ComposableOrder => {
  const subtotal = getCartItemsSubtotal(order)
  const tax = getCartTax(order) ?? 0
  const shipping = getCartShippingCost(order) ?? 0
  const totalBeforeDiscount = subtotal + tax + shipping
  const total = getCartTotal(order)
  const discounts =
    total < totalBeforeDiscount ? totalBeforeDiscount - total : 0
  return {
    id: order.id,
    cartId: order.cart?.id,
    anonymousId: order.anonymousId,
    customerId: order.customerId,
    customerEmail: order.customerEmail,
    locale: order.locale as Locale,
    currency: order.totalPrice.currencyCode as Currency,
    status: order.orderState as ComposableOrderStatus,
    paymentStatus: order.paymentState as ComposableOrderPaymentStatus,
    price: {
      subtotal,
      tax,
      shipping,
      discounts,
      total,
    },
    discountCodes: order.discountCodes?.map((discountCode) => ({
      id: discountCode.discountCode.id,
      code: discountCode.discountCode.obj?.code ?? '',
    })),
    items: order.lineItems.map((item) =>
      commercetoolsLineItemToComposableCartItem({ item, locale, currency })
    ),
    itemsTotalQuantity: order.lineItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    ),

    shippingAddress: order.shippingAddress
      ? commercetoolsAddressToComposableAddress(order.shippingAddress)
      : undefined,
    billingAddress: order.billingAddress
      ? commercetoolsAddressToComposableAddress(order.billingAddress)
      : undefined,
    shippingMethod: order.shippingInfo
      ? {
          id: order.shippingInfo.shippingMethod?.id ?? '',
          title:
            order.shippingInfo.shippingMethod?.obj?.localizedName?.[locale] ??
            order.shippingInfo.shippingMethodName ??
            '',
          description:
            order.shippingInfo.shippingMethod?.obj?.localizedDescription?.[
              locale
            ] ?? '',
          price: commercetoolsTypedMoneyToComposableMoney(
            order.shippingInfo.price
          ),
        }
      : undefined,
    payments: order.paymentInfo?.payments.map((payment) =>
      commercetoolsPaymentToComposablePayment({ payment, locale })
    ),
    createdAt: order.createdAt,
    // @ts-ignore
    original: order,
  }
}

export const composableOrderActionToCommercetoolsOrderAction = (
  action: UpdateOrderAction
): CommercetoolsOrderAction => {
  switch (action.action) {
    case 'setPaymentStatus':
      return {
        action: 'changePaymentState',
        paymentState: action.status,
      }
    case 'cancelOrder':
      return {
        action: 'changeOrderState',
        orderState: 'Cancelled',
      }
  }
}
