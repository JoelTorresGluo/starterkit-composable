import { useIntl } from 'react-intl'
import { Box, Text, Button } from '@chakra-ui/react'

import { useRouter } from 'next/router'
import { useComposable } from '@oriuminc/base'

export const CartEmptyState = () => {
  const intl = useIntl()
  const router = useRouter()
  const { path } = useComposable()

  return (
    <Box bg='gray.100' p='md'>
      <Text textStyle={{ base: 'blockquote-100', md: 'body-300' }}>
        {intl.formatMessage({ id: 'cart.emptyState.title.bag' })}
      </Text>

      <Button
        mt='6'
        variant='link'
        fontWeight='bold'
        textDecoration='underline'
        onClick={() => router.push(path.getPLP({ slug: 'wine' }))}
      >
        {intl.formatMessage({ id: 'action.startShopping' })}
      </Button>
    </Box>
  )
}
