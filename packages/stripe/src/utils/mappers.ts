import { ComposableAddress } from '@oriuminc/commerce-generic'
import { AddressElementProps } from '@stripe/react-stripe-js'
import { StripeAddress } from '../types'

export function composableAddressToStripe(
  address: ComposableAddress
): AddressElementProps['options']['defaultValues'] {
  const obj: AddressElementProps['options']['defaultValues'] = {
    firstName: address?.firstName ?? '',
    lastName: address?.lastName ?? '',
    address: {
      line1: address?.addressLine1 ?? '',
      city: address?.city ?? '',
      state: address?.region ?? '',
      postal_code: address?.postalCode ?? '',
      country: address?.country ?? '',
    },
  }
  if (address && 'phoneNumber' in address) {
    obj.phone = address.phoneNumber ?? ''
  }
  return obj
}

export function stripeAddressToComposableAddress(
  stripeAddress: StripeAddress
): ComposableAddress {
  return {
    firstName: stripeAddress.firstName ?? '',
    lastName: stripeAddress.lastName ?? '',
    addressLine1: stripeAddress.address.line1,
    addressLine2: stripeAddress.address.line2 ?? '',
    city: stripeAddress.address.city,
    region: stripeAddress.address.state,
    postalCode: stripeAddress.address.postal_code,
    country: stripeAddress.address.country,
  }
}
