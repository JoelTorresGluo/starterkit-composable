import { publicProcedure } from '@modules/server/api/trpc'
import { z } from 'zod'
import {
  IStripeCard,
  IStripeLink,
  getStripeClient,
  stripePaymentIntentRetrieveService,
  stripePaymentMethodRetrieveService,
} from '@oriuminc/stripe'

const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY ?? ''

export const getPaymentIntent = publicProcedure
  .input(
    z.object({
      paymentIntentId: z.string(),
    })
  )
  .query(async ({ input, ctx }) => {
    const { paymentIntentId } = input

    if (!paymentIntentId) {
      throw new Error('payment_intent_id is missing')
    }

    const client = getStripeClient(STRIPE_API_KEY)

    const paymentIntent = await stripePaymentIntentRetrieveService({
      client,
      params: { paymentIntentId },
    })

    let card: IStripeCard | null = null
    let link: IStripeLink | null = null
    if (paymentIntent.payment_method) {
      const paymentMethod = await stripePaymentMethodRetrieveService({
        client,
        params: { id: paymentIntent.payment_method },
      })
      card = paymentMethod?.card ?? null
      link = paymentMethod?.link ?? null
    }

    return {
      paymentIntent,
      card,
      link,
    }
  })
