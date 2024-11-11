import {
  IStripeCustomerOptions,
  IStripeCustomerSearchResponse,
  IStripeServiceDeps,
} from '../types'

export const stripeCustomerFindByEmailService = async ({
  client,
  params,
}: IStripeServiceDeps<IStripeCustomerOptions>) => {
  const response = await client.get<IStripeCustomerSearchResponse>(
    `/customers/search?query=email:"${params.email}"`
  )
  return response.data.data?.[0] ?? null
}
