import {
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Stack,
  StackDivider,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { CheckboxField, PasswordField } from '@oriuminc/ui'
import { IntlShape, useIntl } from 'react-intl'
import { CheckIcon } from '@chakra-ui/icons'
import * as yup from 'yup'
import { PASSWORD_MIN_LENGTH } from '@modules/commerce'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useToast } from '@oriuminc/ui'

import { SuccessSection } from '@oriuminc/templates/checkout'
import { useComposable } from '@modules/general'
import { api } from '@modules/trpc/react'

interface RegisterFields {
  email: string
  password: string
  firstName?: string
  lastName?: string
}

interface CreateAccountProps {
  confirmationEmailAddress: string
  firstName?: string
  lastName?: string
}

export const CreateAccount = ({
  confirmationEmailAddress,
  firstName,
  lastName,
}: CreateAccountProps) => {
  const { path } = useComposable()
  const intl = useIntl()
  const toast = useToast()

  const customerCreate = api.commerce.createUser.useMutation()

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<RegisterFields>({
    resolver: yupResolver(registerFormSchema({ intl })),
    mode: 'onTouched',
  })

  const isMobile = useBreakpointValue({ base: true, lg: false })
  const formHasErrors = Object.keys(errors).length > 0

  const handleRegister = (data: RegisterFields) => {
    if (customerCreate.isPending) {
      return
    }
    customerCreate.mutate(
      {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      },
      {
        onSuccess: async (data, variables) => {
          toast({
            status: 'success',
            title: intl.formatMessage({ id: 'account.register.title' }),
            description: intl.formatMessage({
              id: 'account.register.success.message',
            }),
          })
        },
        onError: (e) => {
          toast({
            status: 'error',
            description: e.message,
          })
        },
      }
    )
  }

  return (
    <SuccessSection
      title={intl.formatMessage({ id: 'checkout.success.createAccount.title' })}
    >
      <form onSubmit={handleSubmit(handleRegister)}>
        {customerCreate.isSuccess ? (
          <Stack spacing='4'>
            <Text>
              {intl.formatMessage({ id: 'account.register.success.message' })}
            </Text>
            <Box>
              <NextLink href={path.getAccountLogin()} prefetch={false}>
                <Button as='span' size='sm' bg='text' color='white'>
                  {intl.formatMessage({
                    id: 'account.login.title',
                  })}
                </Button>
              </NextLink>
            </Box>
          </Stack>
        ) : (
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing='8'
            alignItems='baseline'
            divider={!isMobile ? <StackDivider /> : undefined}
          >
            <Stack flex='1' spacing='4' w='full'>
              <input
                {...register('email')}
                type='hidden'
                value={confirmationEmailAddress}
              />
              <input
                {...register('firstName')}
                type='hidden'
                value={firstName}
              />
              <input {...register('lastName')} type='hidden' value={lastName} />
              <PasswordField
                label={intl.formatMessage({
                  id: 'account.register.label.password',
                })}
                inputProps={register('password')}
                error={errors.password}
              />
              <CheckboxField
                content={intl.formatMessage({
                  id: 'checkout.success.createAccount.savePaymentDetails',
                })}
                checkboxProps={{
                  name: 'save',
                }}
              />
              <Box>
                <Button
                  type='submit'
                  bg='text'
                  color='white'
                  size='sm'
                  isLoading={customerCreate.isPending}
                  disabled={!isDirty || formHasErrors}
                >
                  {intl.formatMessage({
                    id: 'checkout.success.createAccount.createAccountButton',
                  })}
                </Button>
              </Box>
            </Stack>

            <List flex='1' spacing='3' fontSize='xs'>
              <ListItem>
                <ListIcon as={CheckIcon} boxSize='3' />
                {intl.formatMessage({
                  id: 'checkout.success.createAccount.managePaymentPreferences',
                })}
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} boxSize='3' />
                {intl.formatMessage({
                  id: 'checkout.success.createAccount.createAddressBook',
                })}
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} boxSize='3' />
                {intl.formatMessage({
                  id: 'checkout.success.createAccount.viewOrderDetails',
                })}
              </ListItem>
            </List>
          </Stack>
        )}
      </form>
    </SuccessSection>
  )
}

const registerFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.emailRequired' })),

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
  })
}
