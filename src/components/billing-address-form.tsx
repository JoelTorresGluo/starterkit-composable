import { Box, Checkbox, Stack, Text } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField, SelectField } from '@oriuminc/ui'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { countries } from '../utils'

import { ENABLE_GOOGLE_STANDALONE_AUTOCOMPLETE } from '../constants'
import { GoogleAutocompleteInput } from './google-autocomplete-input'
import {
  ComposableAddress,
  getComposableAddressSchema,
  ComposableAddressSchema,
  getAddressLabels,
} from '@oriuminc/commerce-generic'

interface BillingAddressFormProps {
  initialValues?: ComposableAddress
  onChange: (params: { data: ComposableAddress; isValid: boolean }) => void
  billingIsShipping: boolean
  onChangeBillingIsShipping: (billingIsShipping: boolean) => void
  shippingAddress: ComposableAddress
}

export const BillingAddressForm = ({
  initialValues,
  onChange,
  billingIsShipping,
  onChangeBillingIsShipping,
  shippingAddress,
}: BillingAddressFormProps) => {
  const intl = useIntl()

  const addressLabels = getAddressLabels(shippingAddress)

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ComposableAddress>({
    resolver: zodResolver(getComposableAddressSchema(intl)),
    mode: 'onTouched',
    shouldFocusError: true,
    defaultValues: initialValues,
  })

  // handle form changes
  useEffect(() => {
    const subscription = watch((value) => {
      const isValid = ComposableAddressSchema.safeParse(value).success

      onChange({
        data: value as ComposableAddress,
        isValid,
      })
    })
    return () => subscription.unsubscribe()
  }, [watch])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
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
        <Stack spacing='4' direction='column'>
          <Stack spacing='4' direction={{ base: 'column', md: 'row' }}>
            <InputField
              label={intl.formatMessage({
                id: 'checkout.shippingAddressForm.label.firstName',
              })}
              inputProps={register('firstName')}
              error={errors.firstName}
              isRequired
            />
            <InputField
              label={intl.formatMessage({
                id: 'checkout.shippingAddressForm.label.lastName',
              })}
              inputProps={register('lastName')}
              error={errors.lastName}
              isRequired
            />
          </Stack>

          <Stack spacing='4' direction={{ base: 'column', md: 'row' }}>
            {ENABLE_GOOGLE_STANDALONE_AUTOCOMPLETE ? (
              <GoogleAutocompleteInput
                onSelect={(address) => {
                  setValue('addressLine1', address.addressLine1)
                  setValue('city', address.city)
                  setValue('region', address.region)
                  setValue('country', address.country)
                  setValue('postalCode', address.postalCode)
                }}
                label={intl.formatMessage({
                  id: 'checkout.shippingAddressForm.label.line1',
                })}
                inputProps={register('addressLine1')}
                error={errors.addressLine1}
                isRequired
              />
            ) : (
              <InputField
                label={intl.formatMessage({
                  id: 'checkout.shippingAddressForm.label.line1',
                })}
                inputProps={register('addressLine1')}
                error={errors.addressLine1}
                isRequired
              />
            )}
            <InputField
              label={intl.formatMessage({
                id: 'checkout.shippingAddressForm.label.line2',
              })}
              inputProps={{
                placeholder: intl.formatMessage({
                  id: 'checkout.shippingAddressForm.placeholder.line2',
                }),
                ...register('addressLine2'),
              }}
              error={errors.addressLine2}
              isRequired
            />
          </Stack>

          <Stack spacing='4' direction={{ base: 'column', md: 'row' }}>
            <SelectField
              label={intl.formatMessage({
                id: 'checkout.shippingAddressForm.label.country',
              })}
              selectProps={{
                defaultValue: '',
                ...register('country'),
              }}
              error={errors.country}
              isRequired
            >
              <option defaultValue='' disabled value=''>
                {intl.formatMessage({
                  id: 'action.selectCountry',
                })}
              </option>
              <>
                {countries.map((country) => {
                  const label = country.intlId
                    ? intl.formatMessage({ id: country.intlId })
                    : country.name
                  return (
                    <option
                      title={label}
                      aria-label={label}
                      key={country.code}
                      value={country.code}
                    >
                      {label}
                    </option>
                  )
                })}
              </>
            </SelectField>
            <InputField
              label={intl.formatMessage({
                id: 'checkout.shippingAddressForm.label.postcode',
              })}
              inputProps={register('postalCode')}
              error={errors.postalCode}
              isRequired
            />
          </Stack>

          <Stack spacing='4' direction={{ base: 'column', md: 'row' }}>
            <InputField
              label={intl.formatMessage({
                id: 'checkout.shippingAddressForm.label.state',
              })}
              inputProps={register('region')}
              error={errors.region}
              isRequired
            />
            <InputField
              label={intl.formatMessage({
                id: 'checkout.shippingAddressForm.label.city',
              })}
              inputProps={register('city')}
              error={errors.city}
              isRequired
            />
          </Stack>
        </Stack>
      )}
    </form>
  )
}
