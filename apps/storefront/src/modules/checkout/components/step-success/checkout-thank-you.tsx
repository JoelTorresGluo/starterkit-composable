import { Box, Button, Flex, Text, Container } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/navigation'
import { useComposable } from '@modules/general'

interface ThankYouProps {
  orderId: string
  confirmationEmailAddress?: string | null
}

export const ThankYou = ({
  orderId,
  confirmationEmailAddress,
}: ThankYouProps) => {
  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()

  return (
    <Container pt={{ md: '3xl' }}>
      <Flex
        direction='column'
        justifyContent='center'
        textAlign='center'
        pt={{ base: 14, md: '12xl' }}
        pb={{ base: 14, md: '10xl' }}
        gap='6'
      >
        <Box aria-live='polite'>
          <Text
            as='h1'
            fontSize={{ base: 'lg', lg: '2xl' }}
            fontWeight='extrabold'
          >
            {intl.formatMessage({ id: 'checkout.success.title' })}
          </Text>
          <Text
            fontSize={{ base: 'lg', lg: '2xl' }}
            fontWeight='extrabold'
            mb='md'
          >
            <Text as='span'>
              {intl.formatMessage({ id: 'checkout.success.info' })}
            </Text>
            <Text as='span' color='primary'>
              {orderId}
            </Text>
          </Text>
        </Box>
        <Text fontSize={{ base: 'base', lg: 'lg' }} mb='lg'>
          {confirmationEmailAddress
            ? intl.formatMessage(
                { id: 'checkout.success.orderReceived.withEmail' },
                { email: confirmationEmailAddress }
              )
            : intl.formatMessage({
                id: 'checkout.success.orderReceived.noEmail',
              })}
        </Text>
        <Box>
          <Button
            bg='text'
            color='white'
            onClick={() => router.push(path.getHome())}
            w={{ base: 'full', lg: 'initial' }}
          >
            {intl.formatMessage({ id: 'action.continueShopping' })}
          </Button>
        </Box>
      </Flex>
    </Container>
  )
}
