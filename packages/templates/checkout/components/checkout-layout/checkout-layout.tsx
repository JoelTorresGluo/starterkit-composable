import { Box, Divider } from '@chakra-ui/react'
import { CheckoutHeader } from './checkout-header'
import { CheckoutFooter } from './checkout-footer'

interface CheckoutLayoutProps {
  children: React.ReactElement
}

export const CheckoutLayout = ({ children }: CheckoutLayoutProps) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      minH='deviceH'
      bg='colors.surface.muted'
    >
      <CheckoutHeader />
      <Box as='main' px={{ base: 'none', md: 4 }}>
        {children}
      </Box>
      <Divider />
      <CheckoutFooter />
    </Box>
  )
}
