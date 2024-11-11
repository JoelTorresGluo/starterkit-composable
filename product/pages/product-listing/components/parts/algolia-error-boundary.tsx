'use client'

import { useIntl } from 'react-intl'
import { useToast } from '@oriuminc/ui'
import { useInstantSearch } from 'react-instantsearch'
import { ReactNode, useEffect } from 'react'
import { Box, Heading } from '@chakra-ui/react'

export const AlgoliaErrorBoundary = ({ children }: { children: ReactNode }) => {
  const intl = useIntl()
  const toast = useToast()
  const { error } = useInstantSearch({ catchError: true })

  useEffect(() => {
    const algoliaErrorToastId = 'algolia-error'
    if (error && !toast.isActive(algoliaErrorToastId)) {
      toast({
        id: 'algolia-error',
        duration: null,
        status: 'error',
        description: intl.formatMessage(
          { id: 'category.algolia.error.message' },
          { error: error.message ?? '' }
        ),
      })
    }
  }, [error])

  if (error) {
    return (
      <Heading textAlign='center' my='20'>
        {intl.formatMessage({ id: 'app.failure' })}
      </Heading>
    )
  }

  return <>{children}</>
}
