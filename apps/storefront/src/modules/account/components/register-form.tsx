'use client'

import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from '@chakra-ui/next-js'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { IntlShape, useIntl } from 'react-intl'
import * as yup from 'yup'

import { TitleSection } from '@oriuminc/templates/account'
import { InputField, PasswordField, useToast } from '@oriuminc/ui'

import { AccountFormTypes, AccountPageType } from '@modules/account'
import { PASSWORD_MIN_LENGTH } from '@modules/commerce'
import { analyticsTrackSignUp, useComposable } from '@modules/general'
import { api } from '@modules/trpc/react'

export interface RegisterFormProps {
  type?: AccountPageType
  setAccountFormToShow?: React.Dispatch<React.SetStateAction<AccountFormTypes>>
}

export const RegisterForm = ({
  type = AccountPageType.PAGE,
  setAccountFormToShow,
}: RegisterFormProps) => {
  const intl = useIntl()
  const toast = useToast()
  const router = useRouter()
  const { path, accountDrawer } = useComposable()
  const customerCreate = api.commerce.createUser.useMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    firstName: string
    lastName: string
    email: string
    emailRepeat: string
    password: string
    passwordRepeat: string
  }>({
    resolver: yupResolver(registerFormSchema({ intl })),
    mode: 'all',
  })

  const isLoading = customerCreate.isPending

  const content = {
    title: intl.formatMessage({ id: 'account.register.title' }),
    description: intl.formatMessage({ id: 'account.register.description' }),
    createAccount: intl.formatMessage({ id: 'action.createAccount' }),
    alreadyAMember: intl.formatMessage({
      id: 'account.register.label.alreadyAMember',
    }),
    input: {
      firstName: {
        label: intl.formatMessage({ id: 'account.register.label.firstName' }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.firstName',
        }),
      },
      lastName: {
        label: intl.formatMessage({ id: 'account.register.label.lastName' }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.lastName',
        }),
      },
      email: {
        label: intl.formatMessage({ id: 'account.register.label.email' }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.emailAddress',
        }),
      },
      emailRepeat: {
        label: intl.formatMessage({ id: 'account.register.label.emailRepeat' }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.emailAddress',
        }),
      },
      password: {
        label: intl.formatMessage({
          id: 'account.register.label.password',
        }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.password.placeholder',
        }),
      },
      passwordRepeat: {
        label: intl.formatMessage({
          id: 'account.register.label.passwordRepeat',
        }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.password.placeholder',
        }),
      },
    },
    button: {
      login: intl.formatMessage({ id: 'action.login' }),
    },
    error: {
      somethingWentWrong: intl.formatMessage({
        id: 'account.register.error.somethingWentWrong',
      }),
    },
  }

  return (
    <Box>
      <TitleSection
        type={type}
        title={content.title}
        description={content.description}
      />
      {customerCreate.isError && (
        <Alert mt={7} status='error'>
          <AlertIcon alignSelf='flex-start' />
          {content.error.somethingWentWrong}
        </Alert>
      )}
      <Box pt={10}>
        <Text fontWeight='bold' fontSize='14' py={4} aria-hidden>
          * Indicates required fields
        </Text>
        <form
          role='form'
          aria-label={content.title}
          onSubmit={handleSubmit((data) => {
            if (isLoading) {
              return
            }

            customerCreate.mutate(
              {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
              },
              {
                onSuccess: () => {
                  toast({
                    status: 'success',
                    title: intl.formatMessage({ id: 'account.register.title' }),
                    description: intl.formatMessage({
                      id: 'account.register.success.message',
                    }),
                  })
                  analyticsTrackSignUp({ method: 'email' })
                  router.push(path.getAccountLogin())
                  accountDrawer?.onClose()
                },
                onError: (e) => {
                  toast({
                    status: 'error',
                    description: e.message,
                  })
                },
              }
            )
          })}
        >
          <Stack spacing={4} direction='column'>
            <InputField
              label={content.input.firstName.label}
              inputProps={{
                placeholder: content.input.firstName.placeholder,
                ...register('firstName'),
              }}
              error={errors.firstName}
              isRequired
            />
            <InputField
              label={content.input.lastName.label}
              inputProps={{
                placeholder: content.input.lastName.placeholder,
                ...register('lastName'),
              }}
              error={errors.lastName}
              isRequired
            />
            <InputField
              label={content.input.email.label}
              inputProps={{
                placeholder: content.input.email.placeholder,
                ...register('email'),
              }}
              error={errors.email}
              isRequired
            />
            <InputField
              label={content.input.emailRepeat.label}
              inputProps={{
                placeholder: content.input.emailRepeat.placeholder,
                ...register('emailRepeat'),
              }}
              error={errors.emailRepeat}
              isRequired
            />
            <PasswordField
              label={content.input.password.label}
              inputProps={{
                placeholder: content.input.password.placeholder,
                ...register('password'),
              }}
              error={errors.password}
              isRequired
            />
            <PasswordField
              label={content.input.passwordRepeat.label}
              inputProps={{
                placeholder: content.input.passwordRepeat.placeholder,
                ...register('passwordRepeat'),
              }}
              error={errors.passwordRepeat}
              isRequired
            />
          </Stack>

          <Box mt={7} display='flex' justifyContent='center'>
            <Button
              type='submit'
              isLoading={isLoading}
              colorScheme='blue'
              w='full'
            >
              {content.createAccount}
            </Button>
          </Box>
        </form>

        <Center mt={4}>
          <HStack fontSize='sm' fontWeight='extrabold'>
            <Text>{content.alreadyAMember}</Text>
            {type === AccountPageType.PAGE ? (
              <Link
                prefetch={false}
                href={path.getAccountLogin()}
                textDecorationLine='underline'
                textUnderlineOffset={4}
              >
                {content.button.login}
              </Link>
            ) : (
              <Button
                color='text'
                fontSize='sm'
                fontWeight='extrabold'
                m='auto'
                textDecorationLine='underline'
                textUnderlineOffset={4}
                variant='link'
                onClick={() => setAccountFormToShow?.('login')}
              >
                {content.button.login}
              </Button>
            )}
          </HStack>
        </Center>
      </Box>
    </Box>
  )
}

const registerFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    firstName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.firstNameRequired' })),

    lastName: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.lastNameRequired' })),

    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.emailRequired' })),

    emailRepeat: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.emailRepeat' }))
      .oneOf(
        [yup.ref('email'), null],
        intl.formatMessage({ id: 'validation.emailRepeatMatches' })
      ),

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
      )
      .matches(
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/,
        intl.formatMessage({ id: 'validation.passwordSpecialCharacter' })
      ),

    passwordRepeat: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.passwordRepeat' }))
      .oneOf(
        [yup.ref('password'), null],
        intl.formatMessage({ id: 'validation.passwordRepeatMatches' })
      ),
  })
}
