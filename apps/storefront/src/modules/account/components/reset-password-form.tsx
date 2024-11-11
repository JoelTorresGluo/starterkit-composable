'use client'

import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, Box, Button, Alert } from '@chakra-ui/react'
import { useIntl, IntlShape } from 'react-intl'
import { useForm } from 'react-hook-form'
import { PASSWORD_MIN_LENGTH } from '@modules/commerce'
import { PasswordField } from '@oriuminc/ui'
import { api } from '@modules/trpc/react'
import { useComposable } from '@modules/general'
import { useSearchParams } from 'next/navigation'

export const ResetPasswordForm = () => {
  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()

  const customerReset = api.commerce.customerResetPassword.useMutation()

  const resetToken = useSearchParams().get('t') ?? ''

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    password: string
    passwordRepeat: string
  }>({
    resolver: yupResolver(resetPasswordFormSchema({ intl })),
    mode: 'onTouched',
  })

  if (!resetToken) {
    return null
  }

  const renderForm = !customerReset.isSuccess && !customerReset.isError

  return (
    <form
      role='form'
      aria-label={intl.formatMessage({ id: 'account.reset.label.password' })}
      onSubmit={handleSubmit((data) => {
        customerReset.mutate({
          newPassword: data.password,
          resetToken,
        })
      })}
    >
      {renderForm && (
        <>
          <Stack spacing={4} direction='column'>
            <PasswordField
              label={intl.formatMessage({ id: 'account.reset.label.password' })}
              inputProps={register('password')}
              error={errors.password}
            />
            <PasswordField
              label={intl.formatMessage({
                id: 'account.reset.label.passwordRepeat',
              })}
              inputProps={register('passwordRepeat')}
              error={errors.passwordRepeat}
            />
          </Stack>

          <Box mt={8} display='flex' justifyContent='center'>
            <Button type='submit' isLoading={customerReset.isPending}>
              {intl.formatMessage({ id: 'account.reset.action.submit' })}
            </Button>
          </Box>
        </>
      )}

      {customerReset.isError && (
        <Box display='flex' flexDirection='column' alignItems='flex-start'>
          <Alert mt={12} status='error'>
            {intl.formatMessage({ id: 'account.reset.error' })}
          </Alert>
          <Button
            mt={12}
            type='submit'
            isLoading={customerReset.isPending}
            onClick={() => router.push(path.getAccountForgot())}
          >
            {intl.formatMessage({ id: 'action.continue' })}
          </Button>
        </Box>
      )}

      {customerReset.isSuccess && (
        <Box display='flex' flexDirection='column' alignItems='flex-start'>
          <Alert mt={12} status='success'>
            {intl.formatMessage({ id: 'account.reset.success' })}
          </Alert>
          <Button
            mt={12}
            type='submit'
            onClick={() => router.push(path.getAccountLogin())}
          >
            {intl.formatMessage({ id: 'action.login' })}
          </Button>
        </Box>
      )}
    </form>
  )
}

export const resetPasswordFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    password: yup
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
      ),

    passwordRepeat: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.passwordRepeat' }))
      .oneOf(
        [yup.ref('password')],
        intl.formatMessage({ id: 'validation.passwordRepeatMatches' })
      ),
  })
}
