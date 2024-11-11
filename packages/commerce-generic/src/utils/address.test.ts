import { getAddressLabels } from './address'

// nb. Although `getAddressLabels` is rather simple, this example hopefully
// serves to showcase a few testing patterns:
// - Tests null vs. defined inputs
// - Tests different input values (to exercise functionality)
// - Relies on 'any'-escape hatch to avoid type-checking and stress test functions
// - Establish a pattern of test input objects & their reuse.

describe('getAddressLabels', () => {
  it('returns null when no address is provided', () => {
    expect(getAddressLabels()).toBeUndefined()
  })

  // Evade type-checking for unnecessary 'country' field.
  const validFullAddress: any = {
    firstName: 'John',
    lastName: 'Doe',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 101',
    city: 'Springfield',
    region: 'IL',
    postalCode: '62701',
  }

  it('returns the address labels', () => {
    expect(getAddressLabels(validFullAddress)).toEqual({
      name: 'John Doe',
      address: '123 Main St Apt 101',
      cityRegionPostalCode: 'Springfield, IL, 62701',
    })
  })

  it('returns the address labels without addressLine2', () => {
    expect(
      getAddressLabels({ ...validFullAddress, addressLine2: undefined })
    ).toEqual({
      name: 'John Doe',
      address: '123 Main St',
      cityRegionPostalCode: 'Springfield, IL, 62701',
    })
  })

  it('returns an address label with or without city, region, and postal code', () => {
    expect(getAddressLabels({ ...validFullAddress, city: undefined })).toEqual({
      name: 'John Doe',
      address: '123 Main St Apt 101',
      cityRegionPostalCode: 'IL, 62701',
    })
    expect(
      getAddressLabels({ ...validFullAddress, region: undefined })
    ).toEqual({
      name: 'John Doe',
      address: '123 Main St Apt 101',
      cityRegionPostalCode: 'Springfield, 62701',
    })
    expect(
      getAddressLabels({ ...validFullAddress, postalCode: undefined })
    ).toEqual({
      name: 'John Doe',
      address: '123 Main St Apt 101',
      cityRegionPostalCode: 'Springfield, IL',
    })
  })
})
