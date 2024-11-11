'use client' // Error boundaries must be Client Components

import { Button, Container, Heading } from '@chakra-ui/react'
import { logErrorToServer } from '@modules/server/logs'
import { useEffect } from 'react'

// TODO: customize UI

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
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
    // global-error must include html and body tags
    <html>
      <body>
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
            {/* this component is unlocalized, since its not covered by the intl provider */}
            Whoops, something went wrong! If the problem persists, please
            contact us.
          </Heading>
          <Button onClick={reset}>Try again</Button>
        </Container>
      </body>
    </html>
  )
}
