import { ComposableAddress } from '@oriuminc/commerce-generic'
import { StripeAddress } from './stripe-types'

export function stripeAddressToComposableShippingAddress(
  obj: StripeAddress,
  id?: string
): ComposableAddress {
  return {
    id: id ?? undefined,
    firstName: obj.name.split(' ')[0] ?? '',
    lastName: obj.name.split(' ')[1] ?? '',
    addressLine1: obj.address.line1,
    addressLine2: obj.address.line2 ?? '',
    city: obj.address.city,
    region: obj.address.state,
    postalCode: obj.address.postal_code,
    country: obj.address.country,
    phoneNumber: obj.phone ?? '',
  }
}
