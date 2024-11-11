'use client'

import { Alert, Button, Box, VStack } from '@chakra-ui/react'
import { IntlShape, useIntl } from 'react-intl'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { InputField } from '@oriuminc/ui'
import { TitleSection } from '@oriuminc/templates/account'
import { AccountPageType } from '@modules/account'
import { useHandleError } from '@modules/general'
import { api } from '@modules/trpc/react'

export interface ForgotPasswordFormProps {
  type?: AccountPageType
}

export const ForgotPasswordForm = ({
  type = AccountPageType.PAGE,
}: ForgotPasswordFormProps) => {
  const intl = useIntl()
  const { createHandleError } = useHandleError()
  const customerForgot = api.commerce.customerForgotPassword.useMutation()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({
    resolver: yupResolver(forgotPasswordFormSchema({ intl })),
    mode: 'all',
  })

  const content = {
    title: intl.formatMessage({ id: 'account.forgot.title' }),
    description:
      "Enter the email address associated with your account, and we'll send you a link to set a new password.",
    input: {
      email: {
        label: intl.formatMessage({ id: 'account.forgot.label.email' }),
        placeholder: intl.formatMessage({ id: 'account.login.label.email' }),
      },
    },
    button: {
      submit: intl.formatMessage({ id: 'account.forgot.action.submit' }),
    },
    alert: {
      success: intl.formatMessage({ id: 'account.forgot.success.message' }),
    },
  }

  return (
    <Box>
      <TitleSection
        type={type}
        title={content.title}
        description={content.description}
      />
      <Box mt={10}>
        <form
          role='form'
          aria-label={content.title}
          onSubmit={handleSubmit(async (data) => {
            customerForgot.mutate(
              { email: data.email },
              {
                onError: createHandleError(),
              }
            )
          })}
        >
          {customerForgot.isSuccess && (
            <Alert my={4} status='success' borderRadius='md'>
              {content.alert.success}
            </Alert>
          )}

          <VStack spacing={6} alignItems='stretch'>
            <InputField
              label={content.input.email.label}
              inputProps={{
                isReadOnly: customerForgot.isSuccess,
                placeholder: content.input.email.placeholder,
                ...register('email'),
              }}
              error={errors.email}
            />

            <Box mt={7} display='flex' justifyContent='center'>
              <Button
                variant='solid'
                type='submit'
                isDisabled={customerForgot.isSuccess || !isValid}
                isLoading={customerForgot.isPending}
                w='full'
              >
                {content.button.submit}
              </Button>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  )
}

export const forgotPasswordFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.emailRequired' })),
  })
}
