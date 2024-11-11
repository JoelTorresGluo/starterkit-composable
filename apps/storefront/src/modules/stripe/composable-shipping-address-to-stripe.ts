import { ComposableAddress } from '@oriuminc/commerce-generic'
import { AddressElementProps } from '@stripe/react-stripe-js'

export function commercetoolsCustomerAddressToStripe(
  address: ComposableAddress
): AddressElementProps['options']['defaultValues'] {
  const obj: AddressElementProps['options']['defaultValues'] = {
    firstName: address.firstName ?? '',
    lastName: address.lastName ?? '',
    phone: address.phoneNumber ?? '',
    address: {
      line1: address.addressLine1,
      line2: address.addressLine2,
      city: address.city ?? '',
      state: address.region ?? '',
      postal_code: address.postalCode ?? '',
      country: address.country ?? '',
    },
  }

  return obj
}
