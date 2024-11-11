'use client'

import { Container } from '@chakra-ui/react'
import { LoginForm } from '@modules/account'

export const AccountLoginPage = () => {
  return (
    <Container px={{ base: 4, md: 0 }} py='16' maxW='container.xs'>
      <LoginForm />
    </Container>
  )
}
