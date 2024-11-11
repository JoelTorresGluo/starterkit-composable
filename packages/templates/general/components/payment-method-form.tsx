'use client'

import * as yup from 'yup'
import { Box, Collapse, HStack, Stack, VStack } from '@chakra-ui/react'
import { useIntl, IntlShape } from 'react-intl'
import { yupResolver } from '@hookform/resolvers/yup'

import { InputField, CheckboxField, SelectField, Section } from '@oriuminc/ui'
import { PaymentMethodDisplayOnly } from './payment-method-display-only'
import { EditableContentCard } from './editable-content-card'
import { useForm } from 'react-hook-form'
import { MasterCard, VISA, UnionPay, AmericanExpress } from '@oriuminc/ui'
import { FeatureNotImplementedAlert } from './feature-not-implemented-alert'

export type AddCardFormItems = {
  // add card
  creditCardNickname: string
  creditCardNumber: string
  expiry: string
  nameOnCard: string
  securityCode: number
  // billing address
  address1: string
  city: string
  country: string
  defaultPayment: boolean
  firstName: string
  lastName: string
  phoneNumber: string
  state: string
  zipCode: string
}

interface PaymentMethodFormProps {
  isEditOpen?: boolean
  isOpen: boolean
  onToggle?: () => void
}

export const PaymentMethodForm = ({
  isEditOpen,
  isOpen,
  onToggle,
}: PaymentMethodFormProps) => {
  const intl = useIntl()

  const {
    register,
    reset,
    formState: { errors },
  } = useForm<AddCardFormItems>({
    resolver: yupResolver(paymentMethodFormSchema({ intl })),
    mode: 'all',
  })

  return (
    <Stack mb='6'>
      <Collapse in={isOpen} animateOpacity unmountOnExit>
        <EditableContentCard
          size='Large'
          onCancel={onToggle}
          editModeOn={isEditOpen}
          editTitle={intl.formatMessage({
            id: 'account.dashboard.paymentMethod.addCard',
          })}
          onSubmit={undefined}
          resetEditForm={reset}
          updateButtonLabel={intl.formatMessage({
            id: 'account.dashboard.paymentMethod.addCard',
          })}
          edit={
            <VStack w='full' alignItems='stretch' spacing='10' p='1'>
              <Box>
                <InputField
                  label={intl.formatMessage({
                    id: 'account.dashboard.paymentMethod.creditCardNickname',
                  })}
                  inputProps={{
                    ...register('creditCardNickname'),
                  }}
                  error={errors.creditCardNickname}
                />
                <InputField
                  label={intl.formatMessage({
                    id: 'account.dashboard.paymentMethod.creditCardNumber',
                  })}
                  inputProps={{
                    ...register('creditCardNumber'),
                  }}
                  error={errors.creditCardNumber}
                />
                <HStack pt='2' pb='4' gap='1'>
                  <VISA boxSize='6' />
                  <MasterCard boxSize='6' />
                  <UnionPay boxSize='6' />
                  <AmericanExpress boxSize='6' />
                </HStack>
                <Stack direction={{ base: 'column', md: 'row' }}>
                  <InputField
                    label={intl.formatMessage({
                      id: 'account.dashboard.paymentMethod.expiry',
                    })}
                    inputProps={{
                      ...register('expiry'),
                    }}
                    error={errors.expiry}
                  />
                  <InputField
                    label={intl.formatMessage({
                      id: 'account.dashboard.paymentMethod.securityCode',
                    })}
                    inputProps={{
                      ...register('securityCode'),
                    }}
                    error={errors.securityCode}
                  />
                </Stack>
                <InputField
                  label={intl.formatMessage({
                    id: 'account.dashboard.paymentMethod.nameOnCard',
                  })}
                  inputProps={{
                    ...register('nameOnCard'),
                  }}
                  error={errors.nameOnCard}
                />
              </Box>
              <Section
                headerProps={{
                  hasRequiredFields: true,
                  boxProps: { h: 8, mb: 4 },
                  headingTag: 'h5',
                  title: intl.formatMessage({
                    id: 'account.dashboard.paymentMethod.billingAddress',
                  }),
                  textProps: {
                    textStyle: { base: 'mobile-200', md: 'desktop-200' },
                    width: 'fit-content',
                  },
                }}
              >
                <Stack direction={{ base: 'column', md: 'row' }}>
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

                <InputField
                  label={intl.formatMessage({
                    id: 'checkout.shippingAddressForm.label.streetName',
                  })}
                  inputProps={register('address1')}
                  error={errors.address1}
                  isRequired
                />

                <Stack spacing='4' direction={{ base: 'column', md: 'row' }}>
                  <SelectField
                    label={intl.formatMessage({
                      id: 'checkout.shippingAddressForm.label.country',
                    })}
                    selectProps={{
                      background: 'background',
                      ...register('country'),
                    }}
                    error={errors.country}
                    isRequired
                  >
                    <option value='CA'>Canada</option>
                    <option value='US'>United States</option>
                    <option value='MX'>Mexico</option>
                  </SelectField>
                  <InputField
                    label={intl.formatMessage({
                      id: 'checkout.shippingAddressForm.label.postcode',
                    })}
                    inputProps={register('zipCode')}
                    error={errors.zipCode}
                    isRequired
                  />
                </Stack>

                <Stack spacing='4' direction={{ base: 'column', md: 'row' }}>
                  <InputField
                    label={intl.formatMessage({
                      id: 'checkout.shippingAddressForm.label.state',
                    })}
                    inputProps={register('state')}
                    error={errors.state}
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

                <Box py='4'>
                  <CheckboxField
                    content={intl.formatMessage({
                      id: 'account.dashboard.paymentMethod.useAsDefaultPaymentCard',
                    })}
                    checkboxProps={{
                      ...register('defaultPayment'),
                    }}
                    error={errors.defaultPayment}
                  />
                </Box>
              </Section>

              <FeatureNotImplementedAlert />
            </VStack>
          }
        />
      </Collapse>

      <Box opacity={isOpen ? 0.2 : 1}>
        <PaymentMethodDisplayOnly />
      </Box>
    </Stack>
  )
}

const paymentMethodFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    // add card section
    creditCardNickname: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
    creditCardNumber: yup
      .number()
      .required(intl.formatMessage({ id: 'validation.required' })),
    expiry: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
    securityCode: yup
      .number()
      .required(intl.formatMessage({ id: 'validation.required' })),
    nameOnCard: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
    // billing address section
    firstName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.firstNameRequired' })),
    lastName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.firstNameRequired' })),
    phoneNumber: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
    address1: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
    zipCode: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
    state: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
    city: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
    country: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.required' })),
  })
}
