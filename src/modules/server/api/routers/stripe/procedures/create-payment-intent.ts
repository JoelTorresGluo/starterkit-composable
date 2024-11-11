import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import {
  getStripeClient,
  stripePaymentIntentCreateService,
} from '@oriuminc/stripe'
import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@modules/server/api/trpc'
import { z } from 'zod'
const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY ?? ''

export const createPaymentIntent = publicProcedure
  .input(
    z.object({
      cartId: z.string(),
      paymentMethodId: z.string(),
      stripeCustomerId: z.string(),
      basePathUrl: z.string().optional(),
      locale: LocaleSchema,
      currency: CurrencySchema,
    })
  )
  .mutation(async ({ input, ctx }) => {
    const { cartId, paymentMethodId, stripeCustomerId, basePathUrl } = input
    const { client } = ctx.commerce
    const cart = await client.getCartById({
      cartId,
      locale: input.locale,
      currency: input.currency,
    })
    if (!cart) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Cart does not exists.',
      })
    }

    const paymentIntent = await stripePaymentIntentCreateService({
      client: getStripeClient(STRIPE_API_KEY),
      params: {
        amount: cart.price.total, // stripe expects centAmount format
        currency: input.currency,
        capture_method: 'manual',
        confirm: true,
        customer: stripeCustomerId,
        payment_method: paymentMethodId,
        return_url: `${basePathUrl}?payment_approval=done`,
      },
    }).catch((e) => {
      throw new Error(
        e.response?.data?.error?.message ?? 'Error creating Stripe payment'
      )
    })

    return {
      paymentIntent: paymentIntent,
    }
  })
