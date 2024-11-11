'use client' // Error boundaries must be Client Components

import { Button, Container, Heading } from '@chakra-ui/react'
import { logErrorToServer } from '@modules/server/logs'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'

// TODO: customize UI

export const ErrorFallback = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  const intl = useIntl()

  useEffect(() => {
    /**
     * On load, send error to logger.
     *
     * On prod, the error doesnt contain any stacktrace or useful information for debugging,
     * only log the pathname to point to the specific route that threw the error.
     */
    logErrorToServer(
      `Error fallback was triggered on "${window.location.pathname}"`
    )
  }, [])

  return (
    <Container
      height='full'
      minH='40vh'
      display='flex'
      flexDir='column'
      justifyContent='center'
      alignItems='center'
      gap='30px'
    >
      <Heading textAlign='center'>
        {intl.formatMessage({ id: 'app.failure' })}
      </Heading>
      <Button onClick={reset}>
        {intl.formatMessage({ id: 'app.failure.tryAgain' })}
      </Button>
    </Container>
  )
}
