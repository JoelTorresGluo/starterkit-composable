import { Box, Container, Spinner, VStack, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export const Loading = () => {
  const intl = useIntl()

  return (
    <Container height='100vh'>
      <VStack height='full' justifyContent='center'>
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
