'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Icon,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useCart } from '@modules/commerce'
import { useComposable } from '@modules/general'
import { useToast } from '@oriuminc/ui'
import { useRouter } from 'next/navigation'
import { ReactElement, useEffect } from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { useIntl } from 'react-intl'

export const CartErrorBoundary = ({ children }: { children: ReactElement }) => {
  const toast = useToast()
  const { path } = useComposable()
  const { cart } = useCart()
  const router = useRouter()
  const intl = useIntl()

  useEffect(() => {
    if (!cart.isLoading && !cart.isError && cart.isEmpty) {
      toast({
        id: 'empty-cart',
        status: 'warning',
        title: intl.formatMessage({ id: 'cart.emptyState.title.bag' }),
        description: intl.formatMessage({
          id: 'checkout.cart.emptyState.redirection.message',
        }),
      })
      router.push(path.getHome())
    }
  }, [cart.isLoading, cart.isError, cart.isEmpty])

  if (cart.isLoading) {
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

  if (cart.isError) {
    return (
      <Container h='deviceH' maxW='container.2xl'>
        <VStack h='full' justifyContent='center' spacing='md'>
          <Flex gap='4' alignItems='center'>
            <Icon as={FiAlertCircle} boxSize='6' color='danger.700' />
            <Text>
              {intl.formatMessage({ id: 'checkout.cart.loadingError.message' })}
            </Text>
          </Flex>
          <Button size='sm' onClick={router.refresh}>
            {intl.formatMessage({ id: 'action.refresh' })}
          </Button>
        </VStack>
      </Container>
    )
  }

  return children
}
