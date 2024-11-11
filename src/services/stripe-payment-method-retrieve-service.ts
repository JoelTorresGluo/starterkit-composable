import {
  IStripePaymentMethod,
  IStripePaymentMethodOptions,
  IStripeServiceDeps,
} from '../types'

export const stripePaymentMethodRetrieveService = async ({
  client,
  params,
}: IStripeServiceDeps<IStripePaymentMethodOptions>) => {
  const response = await client.get<IStripePaymentMethod>(
    `/payment_methods/${params.id}`
  )
  return response.data
}
