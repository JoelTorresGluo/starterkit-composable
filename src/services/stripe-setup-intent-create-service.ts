import {
  IStripeServiceDeps,
  IStripeSetupIntent,
  IStripeSetupIntentOptions,
} from '../types'
import qs from 'qs'

export const stripeSetupIntentCreateService = async ({
  client,
  params,
}: IStripeServiceDeps<IStripeSetupIntentOptions>) => {
  const response = await client.post<IStripeSetupIntent>(
    '/setup_intents',
    qs.stringify(params)
  )
  return response.data
}
