'use client'
import NextLink from 'next/link'
import * as yup from 'yup'
import { useIntl, IntlShape } from 'react-intl'
import { useForm } from 'react-hook-form'
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  HStack,
  Stack,
  Text,
  VStack,
  VisuallyHidden,
} from '@chakra-ui/react'
import { IoLogoFacebook, IoLogoGoogle } from 'react-icons/io5'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'

import { AccountFormTypes, AccountPageType } from '@modules/account'

import { TitleSection } from '@oriuminc/templates/account'
import { SectionDivider } from '@oriuminc/templates/general'

import { PasswordField, InputField } from '@oriuminc/ui'

import { useUser } from '@modules/commerce'
import { analyticsTrackLogin, useComposable } from '@modules/general'

export interface LoginFormProps {
  type?: AccountPageType
  setAccountFormToShow?: React.Dispatch<React.SetStateAction<AccountFormTypes>>
}

export const LoginForm = ({
  type = AccountPageType.PAGE,
  setAccountFormToShow,
}: LoginFormProps) => {
  const intl = useIntl()
  const { path } = useComposable()
  const { login } = useUser()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: yupResolver(loginFormSchema({ intl })),
    mode: 'all',
  })

  const content = {
    ariaLabel: {
      signIn: intl.formatMessage({ id: 'account.login.title' }),
    },
    title: intl.formatMessage({ id: 'account.login.title' }),
    description: intl.formatMessage({ id: 'account.login.description' }),
    loginWithFacebook: intl.formatMessage({
      id: 'account.login.loginWithFacebook',
    }),
    loginWithGoogle: intl.formatMessage({
      id: 'account.login.loginWithGoogle',
    }),
    notAMemberYet: intl.formatMessage({ id: 'account.login.notAMemberYet' }),
    createAnAccount: intl.formatMessage({
      id: 'account.login.createAnAccount',
    }),
    or: intl.formatMessage({ id: 'text.or' }),
    input: {
      email: {
        label: intl.formatMessage({ id: 'account.register.label.email' }),
        placeholder: intl.formatMessage({ id: 'account.login.label.email' }),
      },
      password: {
        label: intl.formatMessage({ id: 'account.login.label.password' }),
        placeholder: intl.formatMessage({
          id: 'account.register.label.password.placeholder',
        }),
      },
    },
    button: {
      login: intl.formatMessage({ id: 'action.login' }),
      forgotPassword: intl.formatMessage({ id: 'action.forgotPassword' }),
      needToRegister: intl.formatMessage({ id: 'action.needToRegister' }),
    },
    error: {
      incorrectSignIn: intl.formatMessage({
        id: 'account.login.error.incorrectSignIn',
      }),
    },
  }

  const SocialLogin = () => (
    <VStack py='8' px='none' spacing='4' alignItems='stretch'>
      <Button
        size='lg'
        variant='outline'
        border='sm'
        borderColor='text-muted'
        color='text'
        leftIcon={<IoLogoFacebook />}
        aria-label={content.loginWithFacebook}
      >
        <Text textStyle='button-100'>{content.loginWithFacebook}</Text>
      </Button>
      <Button
        size='lg'
        variant='outline'
        border='sm'
        borderColor='text-muted'
        color='text'
        leftIcon={<IoLogoGoogle />}
        aria-label={content.loginWithGoogle}
      >
        <Text textStyle='button-100'>{content.loginWithGoogle}</Text>
      </Button>
    </VStack>
  )

  return (
    <Box>
      <TitleSection
        type={type}
        title={content.title}
        description={content.description}
      />
      {login.isError && (
        <Alert mt={7} status='error'>
          <AlertIcon alignSelf='flex-start' />
          {content.error.incorrectSignIn}
        </Alert>
      )}
      <SocialLogin />
      <SectionDivider text={content.or} />
      <Box py='6'>
        <form
          role='form'
          aria-label={content.ariaLabel.signIn}
          onSubmit={handleSubmit(async (data) => {
            login.mutate(
              {
                email: data.email,
                password: data.password,
              },
              {
                onSuccess: () => {
                  analyticsTrackLogin({ method: 'email' })
                  router.push('/')
                },
              }
            )
          })}
        >
          <Stack spacing='5' direction='column'>
            <FormControl as='fieldset'>
              <VisuallyHidden as='legend'>
                {content.ariaLabel.signIn}
              </VisuallyHidden>
              <Stack spacing='4' direction='column'>
                <InputField
                  label={content.input.email.label}
                  isRequired={true}
                  inputProps={{
                    placeholder: content.input.email.placeholder,
                    ...register('email'),
                  }}
                  error={errors.email}
                />
                <PasswordField
                  label={content.input.password.label}
                  isRequired={true}
                  inputProps={{
                    placeholder: content.input.password.placeholder,
                    ...register('password'),
                  }}
                  error={errors.password}
                />
              </Stack>
            </FormControl>
          </Stack>

          <Box>
            <VStack
              mt='6'
              display='flex'
              justifyContent='stretch'
              gap={{ base: 4, md: 6 }}
            >
              <Button
                size='lg'
                type='submit'
                isLoading={login.isPending}
                colorScheme='blue'
                w='full'
              >
                <Text textStyle='button-100'>{content.button.login}</Text>
              </Button>

              {type === AccountPageType.PAGE ? (
                <HStack justifyContent='space-between' w='full'>
                  <Box
                    as={NextLink}
                    href={path.getAccountForgot()}
                    fontSize='sm'
                    fontWeight='extrabold'
                    m='none'
                    textDecorationLine='underline'
                    textUnderlineOffset={4}
                  >
                    {content.button.forgotPassword}
                  </Box>
                  <Box
                    as={NextLink}
                    href={path.getAccountRegister()}
                    fontSize='sm'
                    fontWeight='extrabold'
                    textDecorationLine='underline'
                    textUnderlineOffset={4}
                  >
                    {content.button.needToRegister}
                  </Box>
                </HStack>
              ) : (
                // type === drawer
                <>
                  <HStack justifyContent='space-between' w='full'>
                    <Button
                      color='text'
                      fontSize='sm'
                      fontWeight='extrabold'
                      m='auto'
                      textDecorationLine='underline'
                      textUnderlineOffset={4}
                      variant='link'
                      onClick={() => setAccountFormToShow?.('forgot_password')}
                    >
                      {content.button.forgotPassword}
                    </Button>
                  </HStack>
                  <VStack alignItems='self-start' w='full' pt='10' spacing='6'>
                    <Text textStyle='desktop-200'>{content.notAMemberYet}</Text>
                    <Button
                      size='lg'
                      variant='outline'
                      w='full'
                      onClick={() => setAccountFormToShow?.('create_account')}
                    >
                      <Text textStyle='button-100'>
                        {content.createAnAccount}
                      </Text>
                    </Button>
                  </VStack>
                </>
              )}
            </VStack>
          </Box>
        </form>
      </Box>
    </Box>
  )
}

const loginFormSchema = (deps: { intl: IntlShape }) => {
  const { intl } = deps
  return yup.object().shape({
    email: yup
      .string()
      .email(intl.formatMessage({ id: 'validation.emailValid' }))
      .required(intl.formatMessage({ id: 'validation.emailRequired' })),

    password: yup
      .string()
      .required(intl.formatMessage({ id: 'validation.passwordRequired' })),
  })
}
