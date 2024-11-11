'use client'

import { Box, Container, Spinner, Text, VStack } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export const CheckoutLoadingCart = () => {
  const intl = useIntl()
  return (
    <Container h='deviceH'>
      <VStack h='full' justifyContent='center'>
        <Box>
          <Spinner color='primary' size='lg' />
        </Box>
        <Text>
          {intl.formatMessage({ id: 'checkout.cart.loading.message' })}
        </Text>
      </VStack>
    </Container>
  )
}
