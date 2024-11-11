import { IStripeCustomerOptions, IStripeServiceDeps } from '../types'
import { stripeCustomerFindByEmailService } from './stripe-customer-find-by-email-service'
import { stripeCustomerCreateService } from './stripe-customer-create-service'

export const stripeGetOrCreateCustomer = async (
  props: IStripeServiceDeps<IStripeCustomerOptions>
) => {
  let customer = await stripeCustomerFindByEmailService(props)
  if (!customer) {
    customer = await stripeCustomerCreateService(props)
  }
  return customer
}
