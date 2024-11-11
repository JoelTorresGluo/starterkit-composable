import { useIntl } from 'react-intl'
import { Text, Icon, Flex, Button } from '@chakra-ui/react'

import { useRouter } from 'next/navigation'
import { FiShoppingBag } from 'react-icons/fi'
import { useComposable } from '@modules/general'

interface CartDrawerEmptyStateProps {
  onClose?: () => void
}

export const CartDrawerEmptyState = ({
  onClose,
}: CartDrawerEmptyStateProps) => {
  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()

  return (
    <Flex
      direction='column'
      align='center'
      gap='4'
      my='20'
      mx='auto'
      p='6'
      borderRadius='base'
      textAlign='center'
    >
      <Icon as={FiShoppingBag} boxSize={{ base: 10, md: 14 }} />
      <Text mt='3' textStyle={{ base: 'mobile-50', md: 'desktop-300' }}>
        {intl.formatMessage({ id: 'cart.emptyState.title.bag' })}
      </Text>
      <Text textStyle={{ base: 'blockquote-75', md: 'blockquote-100' }}>
        {intl.formatMessage({ id: 'cart.emptyState.message' })}
      </Text>
      <Button
        mt='6'
        variant='link'
        fontWeight='bold'
        textDecoration='underline'
        onClick={async () => {
          await router.push(path.getPLP({ slug: 'wine' }))
          onClose && onClose()
        }}
      >
        {intl.formatMessage({ id: 'action.startShopping' })}
      </Button>
    </Flex>
  )
}
