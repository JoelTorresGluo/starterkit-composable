'use client'

import { Text, Stack, Box, UnorderedList, ListItem } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useIntl, IntlShape } from 'react-intl'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PasswordField } from '@oriuminc/ui'
import { EditableContentCard, FormStatus } from '@oriuminc/templates/general'
import { PASSWORD_MIN_LENGTH, useUser } from '@modules/commerce'
import { useComposable } from '@modules/general'
import { api } from '@modules/trpc/react'

export type PasswordFormItems = {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export const PasswordForm = () => {
  const { path } = useComposable()
  const { customer, logout } = useUser()
  const changePassword = api.commerce.changePassword.useMutation()
  const [status, setStatus] = useState<FormStatus>()
  const intl = useIntl()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<PasswordFormItems>({
    resolver: yupResolver(PasswordFormSchema({ intl })),
    mode: 'onTouched',
  })

  if (!customer) return <></>

  const onSubmit = (data: PasswordFormItems) => {
    changePassword.mutate(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          setStatus('success')
          setTimeout(() => {
            logout.mutate({
              callbackUrl: path.getAccountLogin(),
            })
          }, 1500)
        },
        onError: () => setStatus('error'),
      }
    )
  }
  const onError = () => setStatus('error')

  const PasswordRequirements = () => {
    return (
      <Box textStyle={{ base: 'blockquote-75', md: 'blockquote-75' }}>
        <Text>
          {intl.formatMessage({
            id: 'account.dashboard.password.requirements.line1',
          })}
        </Text>
        <UnorderedList pl='1'>
          <ListItem>
            {intl.formatMessage({
              id: 'account.dashboard.password.requirements.line2',
            })}
          </ListItem>
          <ListItem>
            {intl.formatMessage({
              id: 'account.dashboard.password.requirements.line3',
            })}
          </ListItem>
        </UnorderedList>
      </Box>
    )
  }

  return (
    <EditableContentCard
      alertExpireTime={1500}
      size='Large'
      title={intl.formatMessage({ id: 'account.dashboard.password.title' })}
      readOnly={<Text textStyle='blockquote-100'>••••••••••••••</Text>}
      isDirty={isDirty}
      status={status}
      setStatus={setStatus}
      onSubmit={handleSubmit(onSubmit, onError)}
      resetEditForm={reset}
      updateButtonLabel={intl.formatMessage({ id: 'action.updatePassword' })}
      edit={
        <>
          <PasswordRequirements />
          <Stack spacing='4' direction='column'>
            <PasswordField
              label={intl.formatMessage({
                id: 'account.dashboard.password.currentPassword',
              })}
              inputProps={{
                autoFocus: true,
                ...register('currentPassword'),
              }}
              error={errors.currentPassword}
              isRequired
            />

            <PasswordField
              label={intl.formatMessage({
                id: 'account.dashboard.password.newPassword',
              })}
              inputProps={register('newPassword')}
              error={errors.newPassword}
              isRequired
            />
            <PasswordField
              label={intl.formatMessage({
                id: 'account.dashboard.password.confirmNewPassword',
              })}
              inputProps={register('confirmNewPassword')}
              error={errors.confirmNewPassword}
              isRequired
            />
          </Stack>
        </>
      }
    />
  )
}

const PasswordFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    currentPassword: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.passwordRequired' })),

    newPassword: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.passwordRequired' }))
      .min(
        PASSWORD_MIN_LENGTH,
        intl.formatMessage({ id: 'validation.passwordMinLength' })
      )
      .matches(
        /[a-z]/,
        intl.formatMessage({ id: 'validation.passwordLowercase' })
      )
      .matches(
        /[A-Z]/,
        intl.formatMessage({ id: 'validation.passwordUppercase' })
      )
      .matches(
        /[0-9]/,
        intl.formatMessage({ id: 'validation.passwordNumbers' })
      )
      .matches(
        /^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?][0-9a-zA-Z]*$/,
        intl.formatMessage({ id: 'validation.passwordSpecialCharacter' })
      ),

    confirmNewPassword: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.passwordRepeat' }))
      .oneOf(
        [yup.ref('newPassword'), null],
        intl.formatMessage({ id: 'validation.passwordRepeatMatches' })
      ),
  })
}
