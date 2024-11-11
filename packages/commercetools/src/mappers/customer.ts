import {
  Address as CommercetoolsAddress,
  Customer as CommercetoolsCustomer,
  CustomerUpdateAction as CommercetoolsCustomerUpdateAction,
  CustomerToken,
} from '@commercetools/platform-sdk'
import {
  ComposableCustomer,
  ComposableForgotPasswordToken,
  ComposableAddress,
  UpdateCustomerAction,
} from '@oriuminc/commerce-generic'

export const composableAddressToCommercetoolsAddress = (
  address: ComposableAddress
): CommercetoolsAddress => {
  const {
    id,
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    country,
    region,
    city,
    postalCode,
    phoneNumber,
  } = address
  return {
    id,
    firstName,
    lastName,
    country,
    state: region,
    city: city,
    streetName: addressLine1,
    additionalAddressInfo: addressLine2,
    postalCode,
    phone: phoneNumber,
  }
}
export const commercetoolsCustomerToComposableCustomer = (
  customer: CommercetoolsCustomer
): ComposableCustomer => {
  const {
    id,
    firstName,
    lastName,
    email,
    customerGroup,
    locale,
    defaultShippingAddressId,
    addresses,
  } = customer
  return {
    id,
    firstName,
    lastName,
    email,
    customerGroup: customerGroup?.id,
    defaultShippingAddressId,
    defaultLocale: locale,
    addresses: addresses.map(commercetoolsAddressToComposableAddress),
  }
}

export const commercetoolsAddressToComposableAddress = (
  address: CommercetoolsAddress
): ComposableAddress => {
  const {
    id,
    firstName,
    lastName,
    email,
    country,
    state,
    city,
    streetName,
    postalCode,
    phone,
    additionalAddressInfo,
  } = address

  return {
    id,
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    email,
    country,
    region: state ?? '',
    city: city ?? '',
    addressLine1: streetName ?? '',
    addressLine2: additionalAddressInfo ?? '',
    postalCode: postalCode ?? '',
    phoneNumber: phone,
  }
}

export const composableCustomerUpdateActionToCommercetoolsCustomerUpdateAction =
  (action: UpdateCustomerAction): CommercetoolsCustomerUpdateAction => {
    switch (action.action) {
      case 'saveShippingAddress':
        return {
          ...action,
          address: composableAddressToCommercetoolsAddress(action.address),
          action: 'addAddress',
        }
      case 'updateShippingAddress':
        return {
          ...action,
          address: composableAddressToCommercetoolsAddress(action.address),
          action: 'changeAddress',
        }
      case 'deleteShippingAddress':
        return {
          ...action,
          action: 'removeAddress',
        }
      case 'updateEmail':
        return {
          ...action,
          action: 'changeEmail',
        }
      case 'updateFirstName':
        return {
          ...action,
          action: 'setFirstName',
        }
      case 'updateLastName':
        return {
          ...action,
          action: 'setLastName',
        }
      case 'updateDefaultLocale':
        return {
          ...action,
          action: 'setLocale',
        }
    }
    return action
  }

export const commercetoolsCustomerTokenToComposableForgotPasswordToken = (
  token: CustomerToken
): ComposableForgotPasswordToken => {
  return {
    token: token.value,
  }
}
