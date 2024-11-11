import {
  IStripeCustomer,
  IStripeCustomerOptions,
  IStripeServiceDeps,
} from '../types'
import qs from 'qs'

export const stripeCustomerCreateService = async ({
  client,
  params,
}: IStripeServiceDeps<IStripeCustomerOptions>) => {
  const response = await client.post<IStripeCustomer>(
    '/customers',
    qs.stringify(params)
  )
  return response.data
}
