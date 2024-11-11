'use client'

import { Stack, Text } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUser } from '@modules/commerce'
import { Locale } from '@oriuminc/base'
import { UpdateCustomerAction } from '@oriuminc/commerce-generic'
import { EditableContentCard, FormStatus } from '@oriuminc/templates/general'
import { intlConfig } from '@oriuminc/templates/general/intl'
import { CartLoadingState, InputField, SelectField } from '@oriuminc/ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IntlShape, useIntl } from 'react-intl'
import * as yup from 'yup'

export type ProfileFormItems = {
  firstName: string
  lastName: string
  email: string
  preferredLanguage: string
}

export const ProfileForm = () => {
  const { customer, isLoading, updateCustomer } = useUser()
  const [status, setStatus] = useState<FormStatus>()
  const intl = useIntl()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormItems>({
    resolver: yupResolver(personalInformationFormSchema({ intl })),
    mode: 'onTouched',
  })

  if (isLoading) {
    // TODO: add loading screen to EditableContentCard
    return <CartLoadingState />
  }
  if (!customer) return <></>

  const onSubmit = (data: ProfileFormItems) => {
    const actions: UpdateCustomerAction[] = []
    if (data.email !== customer.email) {
      actions.push({
        action: 'updateEmail',
        email: data.email,
      })
    }
    if (data.firstName !== customer.firstName) {
      actions.push({
        action: 'updateFirstName',
        firstName: data.firstName,
      })
    }
    if (data.lastName !== customer.lastName) {
      actions.push({
        action: 'updateLastName',
        lastName: data.lastName,
      })
    }
    if (
      data.preferredLanguage &&
      data.preferredLanguage !== customer.defaultLocale
    ) {
      actions.push({
        action: 'updateDefaultLocale',
        locale: data.preferredLanguage as Locale,
      })
    }
    updateCustomer.mutate(
      {
        actions,
      },
      {
        onSuccess: () => setStatus('success'),
        onError: () => setStatus('error'),
      }
    )
  }
  const onError = () => setStatus('error')

  return (
    <EditableContentCard
      size='Large'
      title={intl.formatMessage({
        id: 'account.dashboard.profile.title',
      })}
      readOnly={
        <>
          <Text>
            {customer.firstName} {customer.lastName}
          </Text>
          <Text>{customer.email}</Text>
          <Text>
            {
              intlConfig.find((item) => item.code === customer.defaultLocale)
                ?.title
            }
          </Text>
        </>
      }
      isDirty={isDirty}
      status={status}
      setStatus={setStatus}
      onSubmit={handleSubmit(onSubmit, onError)}
      resetEditForm={reset}
      updateButtonLabel={intl.formatMessage({ id: 'action.updateInformation' })}
      edit={
        <Stack spacing='4' direction='column'>
          <Stack direction={{ base: 'column', md: 'row' }}>
            <InputField
              label={intl.formatMessage({
                id: 'checkout.shippingAddressForm.label.firstName',
              })}
              inputProps={{
                autoFocus: true,
                defaultValue: customer.firstName ?? '',
                ...register('firstName'),
              }}
              error={errors.firstName}
              isRequired
            />
            <InputField
              label={intl.formatMessage({
                id: 'checkout.shippingAddressForm.label.lastName',
              })}
              inputProps={{
                defaultValue: customer.lastName ?? '',
                ...register('lastName'),
              }}
              error={errors.lastName}
              isRequired
            />
          </Stack>
          <InputField
            label={intl.formatMessage({
              id: 'account.register.label.email',
            })}
            inputProps={{
              defaultValue: customer.email,
              ...register('email'),
            }}
            error={errors.email}
            isRequired
          />
          <SelectField
            label={intl.formatMessage({
              id: 'account.dashboard.profile.preferredLanguage',
            })}
            selectProps={{
              background: 'background',
              defaultValue: customer.defaultLocale,
              ...register('preferredLanguage'),
            }}
            error={errors.preferredLanguage}
          >
            <>
              {!customer.defaultLocale && (
                <option value=''>
                  {intl.formatMessage({
                    id: 'account.dashboard.profile.selectPreferredLanguage',
                  })}
                </option>
              )}
              {intlConfig.map((item) => (
                <option key={`${item.code}`} value={item.code}>
                  {item.title}
                </option>
              ))}
            </>
          </SelectField>
        </Stack>
      }
    />
  )
}

const personalInformationFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    firstName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.firstNameRequired' })),
    lastName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.firstNameRequired' })),
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.emailRequired' })),
  })
}
