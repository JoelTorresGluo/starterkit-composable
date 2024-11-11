import { ComposablePayment } from '@oriuminc/commerce-generic'
import { SdkClient } from '../../types'
import { getCartById, updateCart } from '../cart'
import { createPayment } from './create-payment-service'
import { Currency, Locale } from '@oriuminc/base'

export interface PaymentParams {
  amount: number
  paymentInterface: ComposablePayment['paymentInterface']
}

export const createOrderFromCart = async ({
  client,
  cartId,
  locale,
  payments,
}: {
  client: SdkClient
  cartId: string
  locale: Locale
  payments: PaymentParams[]
}) => {
  let cart = await getCartById({
    client,
    id: cartId,
  })
  if (!cart) throw new Error('cart not found')

  const cartTotalPriceCentAmount =
    cart.taxedPrice?.totalGross.centAmount || cart.totalPrice?.centAmount
  const cartCurrency = cart.totalPrice.currencyCode

  const sumAmount = (acc: number, payment: PaymentParams) =>
    acc + payment.amount
  const orderTotalCentAmount = payments.reduce(sumAmount, 0)

  if (orderTotalCentAmount !== cartTotalPriceCentAmount) {
    throw new Error(
      'Invalid payment params: payment amounts do not equal cart total'
    )
  }

  const commercetoolsPayments = payments.map((payment) =>
    createPayment({
      client,
      centAmount: payment.amount,
      locale,
      currency: cartCurrency as Currency,
      paymentInterface: payment.paymentInterface,
    })
  )
  const paymentResults = await Promise.all(commercetoolsPayments)

  cart = await updateCart({
    client,
    id: cartId,
    actions: paymentResults.map((paymentResult) => ({
      action: 'addPayment',
      payment: {
        id: paymentResult?.id,
      },
    })),
  })

  const order = (
    await client
      .orders()
      .post({
        body: {
          cart: {
            typeId: 'cart',
            id: cartId,
          },
          version: cart.version,
        },
      })
      .execute()
  ).body

  return order
}
