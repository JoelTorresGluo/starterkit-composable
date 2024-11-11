'use client'

import { Container } from '@chakra-ui/react'
import { RegisterForm } from '@modules/account'

export const AccountRegisterPage = () => {
  return (
    <Container px={{ base: 4, md: 0 }} py='16'>
      <RegisterForm />
    </Container>
  )
}
