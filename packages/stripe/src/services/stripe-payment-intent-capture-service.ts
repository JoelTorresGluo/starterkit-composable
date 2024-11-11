import { IStripePaymentIntent, IStripeServiceDeps } from '../types'

export const stripePaymentIntentCaptureService = async ({
  client,
  params,
}: IStripeServiceDeps<{ paymentIntentId: string }>) => {
  const response = await client.post<IStripePaymentIntent>(
    `/payment_intents/${params.paymentIntentId}/capture`
  )
  return response.data
}
