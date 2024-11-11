import { useIntl } from 'react-intl'
import { Box, Checkbox, Text } from '@chakra-ui/react'
import {
  StripeAddressElement,
  composableAddressToStripe,
  stripeAddressToComposableAddress,
} from '@oriuminc/stripe'

import { ComposableAddress, getAddressLabels } from '@oriuminc/commerce-generic'

import { countries } from '../utils'
import { GOOGLE_MAPS_API_KEY } from '../constants'

interface BillingAddressFormStripeProps {
  initialValues?: ComposableAddress
  onChange: (params: { data: ComposableAddress; isValid: boolean }) => void
  billingIsShipping: boolean
  onChangeBillingIsShipping: (billingIsShipping: boolean) => void
  shippingAddress: ComposableAddress
}

export const BillingAddressFormStripe = ({
  initialValues,
  onChange,
  billingIsShipping,
  onChangeBillingIsShipping,
  shippingAddress,
}: BillingAddressFormStripeProps) => {
  const intl = useIntl()

  const addressLabels = getAddressLabels(shippingAddress)

  return (
    <Box>
      <Checkbox
        size='sm'
        mb='sm'
        isChecked={billingIsShipping}
        onChange={() => onChangeBillingIsShipping(!billingIsShipping)}
      >
        {intl.formatMessage({
          id: 'checkout.billingSection.sameAsShipping',
        })}
      </Checkbox>

      {billingIsShipping && addressLabels && (
        <Box fontSize='sm'>
          <Text>{addressLabels.name}</Text>
          <Text>{addressLabels.address}</Text>
          <Text>{addressLabels.cityRegionPostalCode}</Text>
        </Box>
      )}

      {!billingIsShipping && (
        <StripeAddressElement
          onChange={(e) => {
            onChange({
              isValid: e.complete,
              data: stripeAddressToComposableAddress(e.value),
            })
          }}
          options={{
            autocomplete: GOOGLE_MAPS_API_KEY
              ? {
                  mode: 'google_maps_api',
                  apiKey: GOOGLE_MAPS_API_KEY,
                }
              : { mode: 'disabled' },
            fields: {
              phone: 'never',
            },
            display: {
              name: 'split',
            },
            allowedCountries: countries.map((c) => c.code),
            mode: 'billing',
            defaultValues: initialValues
              ? composableAddressToStripe(initialValues)
              : undefined,
          }}
        />
      )}
    </Box>
  )
}
