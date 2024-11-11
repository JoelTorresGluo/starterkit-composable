import { Box, Container, Spinner, Text, VStack } from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useIntl } from 'react-intl'
import { ActorRefFrom } from 'xstate'

interface FinishingCheckoutProps {
  experienceRef: ActorRefFrom<any>
}

export const FinishingCheckout = ({
  experienceRef,
}: FinishingCheckoutProps) => {
  const intl = useIntl()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  useEffect(() => {
    const paymentApprovalQueryParams = searchParams.get('payment_approval')
    if (paymentApprovalQueryParams === 'done') {
      experienceRef.send({ type: 'payment.redirection.done' })
      // remove payment_approval query param after firing the event once
      const queryParams = new URLSearchParams(searchParams.toString())
      queryParams.delete('payment_approval')
      router.replace(`${pathname}?${queryParams}`, { scroll: false })
    }
  }, [searchParams])

  return (
    <Container height='100vh'>
      <VStack height='full' justifyContent='center'>
        <Box>
          <Spinner color='primary' size='lg' />
        </Box>
        <Text>{intl.formatMessage({ id: 'checkout.finishing.message' })}</Text>
      </VStack>
    </Container>
  )
}
