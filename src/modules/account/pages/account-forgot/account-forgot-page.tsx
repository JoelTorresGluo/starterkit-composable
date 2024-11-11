'use client'

import { Container } from '@chakra-ui/react'
import { ForgotPasswordForm } from '@modules/account'

export const AccountForgotPage = () => {
  return (
    <Container px={{ base: 4, md: 0 }} py='16' maxW='container.xs'>
      <ForgotPasswordForm />
    </Container>
  )
}
