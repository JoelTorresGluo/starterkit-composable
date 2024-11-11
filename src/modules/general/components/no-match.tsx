'use client'

import { useRouter } from 'next/navigation'
import { useIntl } from 'react-intl'
import { Box, Heading, Button, Text } from '@chakra-ui/react'
import { useComposable } from '@modules/general'

export const NoMatch = () => {
  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()
  const title = intl.formatMessage({ id: 'noMatchPage.title' })

  return (
    <Box py='10'>
      <Box
        // TODO: Replace pixel value with token.
        hideBelow='380px'
        textAlign='center'
        display='flex'
        flexDirection='column'
        justifyContent='center'
      >
        <Heading as='h1' mb='3'>
          {title}
        </Heading>
        <Text>{intl.formatMessage({ id: 'noMatchPage.description' })}</Text>
        <Box mt='6'>
          <Button variant='solid' onClick={() => router.push(path.getHome())}>
            {intl.formatMessage({ id: 'action.continueShopping' })}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
