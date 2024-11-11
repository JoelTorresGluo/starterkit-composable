import { useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Stack } from '@chakra-ui/react'
import { InputField, SelectField } from '@oriuminc/ui'
import { countries } from '../utils'
import { useEffect } from 'react'

import { useSelector } from '@xstate/react'
import { ActorRefFrom } from 'xstate'
import { deliveryOptionsMachine } from '../machines/sections/delivery-options-machine'
import { GoogleAutocompleteInput } from './google-autocomplete-input'
import { ENABLE_GOOGLE_STANDALONE_AUTOCOMPLETE } from '../constants'
import {
  ComposableAddress,
  getComposableAddressSchema,
} from '@oriuminc/commerce-generic'

interface ShippingAddressFormProps {
  initialValues?: ComposableAddress
  onChange: (params: { data: ComposableAddress; isValid: boolean }) => void
  showSubmitButton?: boolean
  onClose?: () => void
  setStatus?: (status: any) => void
  deliveryOptionsRef: ActorRefFrom<typeof deliveryOptionsMachine>
}

export const ShippingAddressForm = ({
  initialValues,
  onChange,
  showSubmitButton,
  onClose,
  deliveryOptionsRef,
}: ShippingAddressFormProps) => {
  const intl = useIntl()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<ComposableAddress>({
    resolver: zodResolver(getComposableAddressSchema(intl)),
    mode: 'onTouched',
    shouldFocusError: true,
    defaultValues: initialValues,
  })

  const state = useSelector(deliveryOptionsRef, (state) => state)
  const customerInfoRef = state.context.customerInfoRef

  // handle form changes
  useEffect(() => {
    const subscription = watch((value) => {
      const isValid = getComposableAddressSchema(intl).safeParse(value).success
      onChange({
        data: value as ComposableAddress,
        isValid,
      })
    })
    return () => subscription.unsubscribe()
  }, [watch])

  useEffect(() => {
    const subscription = customerInfoRef?.subscribe((state) => {
      if (customerInfoRef?.getSnapshot().matches({ authenticated: 'idle' })) {
        onClose?.()
      }
    })

    // We run a first validation in case the form is pre-filled
    handleSubmit((data) => {
      const isValid = getComposableAddressSchema(intl).safeParse(data).success
      onChange({
        data: data,
        isValid,
      })
    })

    return () => subscription?.unsubscribe()
  }, [])

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Stack rowGap={{ base: 5, md: 4 }} columnGap='4' direction='column'>
        <Stack
          rowGap={{ base: 5, md: 4 }}
          columnGap='4'
          direction={{ base: 'column', md: 'row' }}
        >
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

        <Stack
          rowGap={{ base: 5, md: 4 }}
          columnGap='4'
          direction={{ base: 'column', md: 'row' }}
        >
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
            inputProps={register('addressLine2')}
            error={errors.addressLine2}
            isRequired
          />
        </Stack>

        <Stack
          rowGap={{ base: 5, md: 4 }}
          columnGap='4'
          direction={{ base: 'column', md: 'row' }}
        >
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

        <Stack
          rowGap={{ base: 5, md: 4 }}
          columnGap='4'
          direction={{ base: 'column', md: 'row' }}
        >
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

        <InputField
          label={intl.formatMessage({
            id: 'checkout.shippingAddressForm.label.phoneNumber',
          })}
          inputProps={register('phoneNumber')}
          error={errors.phoneNumber}
        />
      </Stack>

      {showSubmitButton && (
        <Stack w='full' mt='8'>
          <Button
            type='submit'
            size='lg'
            mt='5'
            isLoading={customerInfoRef
              ?.getSnapshot()
              .matches({ authenticated: 'loading' })}
            onClick={() => {
              handleSubmit(
                (data) => {
                  // action to update the address here
                  customerInfoRef?.send({
                    type: 'update.shippingAddress',
                    data,
                  })
                  // onClose()
                },
                (e) => {
                  // action to handle error here
                  console.log('error updating the address', e)
                }
              )()
            }}
            // disabled={!isDirty}
            // {...submitButtonProps}
          >
            {intl.formatMessage({ id: 'action.save' })}
          </Button>
          <Button
            size='md'
            color='text'
            variant='ghost'
            textDecoration='underline'
            onClick={() => {
              // setStatus?.(undefined)
              onClose?.()
            }}
          >
            {intl.formatMessage({ id: 'action.cancel' })}
          </Button>
        </Stack>
      )}
    </form>
  )
}
