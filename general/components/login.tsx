'use client'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { InputField, PasswordField } from '@oriuminc/ui'
import NextLink from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IntlShape, useIntl } from 'react-intl'
import * as yup from 'yup'

export interface LoginFormFields {
  email: string
  password: string
}

export interface LoginProps {
  login: ({ email, password }: LoginFormFields) => Promise<void>
}

export const Login = ({ login }: LoginProps) => {
  const intl = useIntl()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormFields>({
    mode: 'onTouched',
    resolver: yupResolver(loginSchema({ intl })),
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (data: LoginFormFields) => {
    setIsLoading(true)
    await login(data)
    setIsLoading(false)
  }

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem border={0}>
          <Box>
            <AccordionButton p={0} _hover={{ bg: 'transparent' }}>
              <Text fontSize={{ base: 'sm', md: 'md' }} mr={1}>
                {intl.formatMessage({
                  id: 'checkout.login.logInForFasterCheckout',
                })}
              </Text>
              <AccordionIcon />
            </AccordionButton>
          </Box>
          <AccordionPanel pb={0} px={0}>
            <form onSubmit={handleSubmit(handleLogin)}>
              <Box py='md'>
                <Stack spacing={5} direction={{ base: 'column', md: 'row' }}>
                  <InputField
                    label={intl.formatMessage({
                      id: 'account.login.label.email',
                    })}
                    inputProps={register('email', { required: true })}
                    error={errors.email}
                  />
                  <PasswordField
                    label={intl.formatMessage({
                      id: 'account.login.label.password',
                    })}
                    inputProps={register('password', { required: true })}
                    error={errors.password}
                  />
                </Stack>

                {/* <Box>
                  {login.isError && (
                    <Alert mt="30px" status="error">
                      {intl.formatMessage({
                        id: 'account.login.error.incorrectSignIn',
                      })}
                    </Alert>
                  )}
                </Box> */}

                <Box mt='md'>
                  <Link
                    as={NextLink}
                    href='/account/forgot'
                    fontSize={{ base: 'xs', md: 'sm' }}
                    color='text'
                    fontWeight='extrabold'
                    textDecoration='underline'
                  >
                    {intl.formatMessage({ id: 'action.forgotPassword' })}
                  </Link>
                </Box>
              </Box>

              <Box>
                <Button
                  w='full'
                  fontSize='sm'
                  type='submit'
                  isLoading={isLoading}
                  disabled={!isValid || isLoading}
                  colorScheme='blue'
                >
                  {intl.formatMessage({ id: 'action.login' })}
                </Button>
              </Box>
            </form>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}

const loginSchema = (deps: { intl: IntlShape }) => {
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
