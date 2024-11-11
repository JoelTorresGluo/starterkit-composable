import { IStripePaymentIntent, IStripeServiceDeps } from '../types'

export const stripePaymentIntentRetrieveService = async ({
  client,
  params,
}: IStripeServiceDeps<{ paymentIntentId: string }>) => {
  const response = await client.get<IStripePaymentIntent>(
    `/payment_intents/${params.paymentIntentId}`
  )
  return response.data
}
