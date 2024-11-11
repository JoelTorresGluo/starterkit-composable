import { belongsToUser } from '@modules/commerce'
import { publicProcedure } from '@modules/server/api/trpc'
import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import {
  getStripeClient,
  stripePaymentIntentRetrieveService,
} from '@oriuminc/stripe'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY ?? ''

export const confirmPayment = publicProcedure
  .input(
    z.object({
      cartId: z.string(),
      paymentIntentId: z.string(),
      locale: LocaleSchema,
      currency: CurrencySchema,
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { locale, currency, cartId, paymentIntentId } = input
    const { client, anonymousUser, customer } = ctx.commerce
    const cart = await client.getCartById({ cartId, locale, currency })

    if (!cart) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cart does not exists.',
      })
    }

    if (
      !belongsToUser({
        cart,
        anonymousId: anonymousUser?.id,
        customerId: customer?.id,
      })
    ) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized: cart does not belong to user.',
      })
    }

    const paymentIntent = await stripePaymentIntentRetrieveService({
      client: getStripeClient(STRIPE_API_KEY),
      params: { paymentIntentId },
    })

    if (paymentIntent.status !== 'requires_capture') {
      // This means that the card auth process failed, and we should return the user to the checkout to retry
      throw new Error('Stripe payment failed')
    }

    return client.createOrderFromCart({
      cartId,
      payments: [
        {
          amount: cart.price.total,
          paymentInterface: {
            identifier: 'STRIPE',
            name: 'Stripe',
            transactionId: paymentIntentId,
          },
        },
      ],
      locale,
      currency,
    })
  })
