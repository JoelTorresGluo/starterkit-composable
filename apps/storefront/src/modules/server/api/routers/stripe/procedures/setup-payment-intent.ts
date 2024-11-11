import { publicProcedure } from '@modules/server/api/trpc'
import { STRIPE_PAYMENT_METHOD_TYPES_ENABLED } from '@modules/stripe'
import {
  getStripeClient,
  stripeGetOrCreateCustomer,
  stripeSetupIntentCreateService,
} from '@oriuminc/stripe'
import { z } from 'zod'

const STRIPE_API_KEY = process.env.STRIPE_SECRET_KEY ?? ''

export const setupPaymentIntent = publicProcedure
  .input(
    z.object({
      customerEmail: z.string(),
    })
  )
  .query(async ({ input }) => {
    const { customerEmail } = input

    if (!customerEmail) {
      throw new Error('customerEmail is mandatory')
    }

    const stripeClient = getStripeClient(STRIPE_API_KEY)

    const stripeCustomer = await stripeGetOrCreateCustomer({
      client: stripeClient,
      params: { email: customerEmail },
    })

    const setupIntent = await stripeSetupIntentCreateService({
      client: stripeClient,
      params: {
        customer: stripeCustomer.id,
        payment_method_types: STRIPE_PAYMENT_METHOD_TYPES_ENABLED,
      },
    })

    return {
      customer: stripeCustomer,
      setupIntent,
    }
  })
