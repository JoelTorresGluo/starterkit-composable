import { publicProcedure } from '@modules/server/api/trpc'
import {
  getStripeClient,
  stripePaymentMethodRetrieveService,
} from '@oriuminc/stripe'
import { z } from 'zod'

const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY ?? ''

export const getPaymentMethod = publicProcedure
  .input(
    z.object({
      paymentMethodId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const { paymentMethodId } = input

    if (!paymentMethodId) {
      throw new Error('payment_method_id is mandatory')
    }

    const paymentMethod = await stripePaymentMethodRetrieveService({
      client: getStripeClient(STRIPE_API_KEY),
      params: { id: paymentMethodId },
    })

    return { paymentMethod }
  })
