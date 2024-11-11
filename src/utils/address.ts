import { ComposableAddress } from '../types'

/**
 *
 * @param address
 * @returns three formatted labels for displaing an address
 */
export const getAddressLabels = (address?: ComposableAddress) => {
  if (!address) return

  const addressWithDetails = address.addressLine2
    ? `${address.addressLine1} ${address.addressLine2}`
    : address.addressLine1

  return {
    name: `${address.firstName} ${address.lastName}`,
    address: addressWithDetails,
    cityRegionPostalCode: [address.city, address.region, address.postalCode]
      .filter(Boolean)
      .join(', '),
  }
}
