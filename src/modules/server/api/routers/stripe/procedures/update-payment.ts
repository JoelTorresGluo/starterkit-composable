import { belongsToUser } from '@modules/commerce'
import { publicProcedure } from '@modules/server/api/trpc'
import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { ComposableOrder } from '@oriuminc/commerce-generic'
import {
  getStripeClient,
  stripePaymentIntentCaptureService,
  stripePaymentIntentRetrieveService,
} from '@oriuminc/stripe'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY ?? ''

export const updatePayment = publicProcedure
  .input(
    z.object({
      orderId: z.string(),
      locale: LocaleSchema,
      currency: CurrencySchema,
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { orderId, locale, currency } = input
    const { client, anonymousUser, customer } = ctx.commerce

    const order = await client.getOrderById({ orderId, locale, currency })
    if (!order) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Order not found.',
      })
    }

    if (
      !belongsToUser({
        order: order,
        anonymousId: anonymousUser?.id,
        customerId: customer?.id,
      })
    ) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized: something went wrong.',
      })
    }

    const payments = order.payments
    const paymentIntentId = payments?.find(
      (payment) => payment.paymentInterface.identifier === 'STRIPE'
    )?.paymentInterface.transactionId

    if (!paymentIntentId) {
      throw new Error('Stripe Payment not found in order')
    }

    const stripeClient = getStripeClient(STRIPE_API_KEY)

    let paymentIntent = await stripePaymentIntentRetrieveService({
      client: stripeClient,
      params: { paymentIntentId },
    })

    if (paymentIntent.status === 'requires_capture') {
      paymentIntent = await stripePaymentIntentCaptureService({
        client: stripeClient,
        params: { paymentIntentId },
      })
    }

    let result: ComposableOrder | string
    switch (paymentIntent.status) {
      case 'succeeded':
        result = await client.updateOrder({
          orderId,
          actions: [
            {
              action: 'setPaymentStatus',
              status: 'Paid',
            },
          ],
          locale,
          currency,
        })
        break
      case 'canceled':
      case 'requires_payment_method':
        result = await client.updateOrder({
          orderId,
          actions: [
            {
              action: 'setPaymentStatus',
              status: 'Failed',
            },
          ],
          locale,
          currency,
        })
        break
      default:
        result = 'no action'
    }

    return
  })
