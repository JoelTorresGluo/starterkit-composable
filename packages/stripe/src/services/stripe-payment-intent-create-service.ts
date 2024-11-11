import {
  IStripePaymentIntent,
  IStripePaymentIntentOptions,
  IStripeServiceDeps,
} from '../types'
import qs from 'qs'

export const stripePaymentIntentCreateService = async ({
  client,
  params,
}: IStripeServiceDeps<IStripePaymentIntentOptions>) => {
  const response = await client.post<IStripePaymentIntent>(
    '/payment_intents',
    qs.stringify(params)
  )
  return response.data
}
