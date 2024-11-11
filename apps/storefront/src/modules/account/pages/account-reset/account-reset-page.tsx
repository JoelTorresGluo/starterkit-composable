'use client'

import { Container, Heading } from '@chakra-ui/react'
import { ResetPasswordForm } from '@modules/account'
import { Suspense } from 'react'
import { useIntl } from 'react-intl'

export const AccountResetPage = () => {
  const intl = useIntl()
  const title = intl.formatMessage({ id: 'account.reset.title' })

  return (
    <Container py='16' maxW='container.xs'>
      <Heading mb='5'>{title}</Heading>
      <Suspense fallback={<></>}>
        <ResetPasswordForm />
      </Suspense>
    </Container>
  )
}
