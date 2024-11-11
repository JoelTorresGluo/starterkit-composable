import { Box, List, ListItem } from '@chakra-ui/react'
import { ComposableAddress } from '@oriuminc/commerce-generic'
import { InputField, InputFieldProps } from '@oriuminc/ui'
import { useState } from 'react'
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete'

type GoogleAutocompleteResultAddress = Pick<
  ComposableAddress,
  'addressLine1' | 'country' | 'region' | 'city' | 'postalCode'
>

interface GoogleAutocompleteInputProps
  extends Pick<InputFieldProps, 'label' | 'error' | 'isRequired'> {
  onSelect: (params: GoogleAutocompleteResultAddress) => void
  inputProps: InputFieldProps['inputProps'] & {
    name: keyof GoogleAutocompleteResultAddress
  }
}

export const GoogleAutocompleteInput = ({
  onSelect,
  label,
  inputProps,
  error,
  isRequired,
}: GoogleAutocompleteInputProps) => {
  const inputName = inputProps.name
  const [autocompleteAddress, setAutocompleteAddress] = useState('')

  const handleSelect = async (_address: string) => {
    const result = (await geocodeByAddress(_address))?.[0]
    if (!result) return
    const composableAddress = parseToComposableAddress(result)
    onSelect(composableAddress)
    // after selecting a suggestion, set the corresponding address value (e.g. streetName)
    setAutocompleteAddress(composableAddress[inputName])
  }

  return (
    <PlacesAutocomplete
      value={autocompleteAddress}
      onChange={setAutocompleteAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <Box w='full' position='relative'>
          <InputField
            label={label}
            inputProps={{
              ...inputProps,
              ...getInputProps(),
              // avoid overwritting onChange and onBlur, to enable validation
              onChange: (e) => {
                inputProps.onChange?.(e)
                getInputProps().onChange(e)
              },
              onBlur: (e) => {
                inputProps.onBlur?.(e)
                getInputProps().onBlur(e)
              },
            }}
            error={error}
            isRequired={isRequired}
          />
          <List
            position='absolute'
            top='100%'
            left='0'
            zIndex={9999}
            border='sm'
            borderColor='shading.200'
            bg='background'
            mt='1'
            listStyleType='none'
            p='0'
          >
            {suggestions?.map((suggestion) => {
              return (
                <ListItem
                  {...getSuggestionItemProps(suggestion)}
                  key={suggestion.placeId}
                  bg={suggestion.active ? 'grey.50' : 'background'}
                  p='2'
                  cursor='pointer'
                >
                  {suggestion.description}
                </ListItem>
              )
            })}
          </List>
        </Box>
      )}
    </PlacesAutocomplete>
  )
}

type GoogleAddressComponentType =
  | 'street_number'
  | 'route'
  | 'locality'
  | 'administrative_area_level_1'
  | 'country'
  | 'postal_code'

interface GoogleAddressComponent {
  long_name: string
  short_name: string
  types: GoogleAddressComponentType[]
}

const findAddressComponentByType = (
  addressComponents: GoogleAddressComponent[],
  type: GoogleAddressComponentType
): string => {
  return (
    addressComponents.find((addressComponent) =>
      addressComponent.types.includes(type)
    )?.long_name ?? ''
  )
}

export const parseToComposableAddress = (
  googleAddress: google.maps.GeocoderResult
): Pick<
  ComposableAddress,
  'addressLine1' | 'city' | 'country' | 'region' | 'postalCode'
> => {
  const address_components =
    googleAddress.address_components as GoogleAddressComponent[]

  const addressLine1 = `${findAddressComponentByType(
    address_components,
    'street_number'
  )} ${findAddressComponentByType(address_components, 'route')}`

  return {
    addressLine1,
    city:
      googleAddress.address_components.find((addressComponent) =>
        addressComponent.types.includes('locality')
      )?.long_name ?? '',
    //province or state
    region:
      googleAddress.address_components.find((addressComponent) =>
        addressComponent.types.includes('administrative_area_level_1')
      )?.long_name ?? '',
    country:
      googleAddress.address_components.find((addressComponent) =>
        addressComponent.types.includes('country')
      )?.short_name ?? '',
    postalCode:
      googleAddress.address_components.find((addressComponent) =>
        addressComponent.types.includes('postal_code')
      )?.long_name ?? '',
  }
}
