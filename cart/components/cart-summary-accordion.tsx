import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { CartLoadingState } from '@oriuminc/ui'
import { CartEmptyState } from './cart-empty-state'

interface CartSummaryAccordionProps {
  isLoading: boolean
  isEmpty: boolean
  cartItemsQuantity?: number
  formattedCartTotalPrice: string
  children: React.ReactElement
}

export const CartSummaryAccordion = ({
  isLoading,
  isEmpty,
  cartItemsQuantity,
  formattedCartTotalPrice,
  children,
}: CartSummaryAccordionProps) => {
  const intl = useIntl()
  const title = intl.formatMessage(
    {
      id: cartItemsQuantity
        ? 'cart.drawer.titleCount.myBag'
        : 'cart.drawer.title',
    },
    { count: cartItemsQuantity }
  )

  return (
    <Accordion allowToggle display={{ base: 'block', md: 'none' }} bg='white'>
      <AccordionItem>
        <AccordionButton bg='white' _expanded={{ bg: 'transparent' }}>
          <Text as='span' textAlign='left' textStyle='body-75'>
            {title} <AccordionIcon />
          </Text>
          <Text as='span' ml='auto' textStyle='mobile-100'>
            {formattedCartTotalPrice}
          </Text>
        </AccordionButton>
        <AccordionPanel p='none' pb='6'>
          {isLoading ? (
            <CartLoadingState />
          ) : isEmpty ? (
            <CartEmptyState />
          ) : (
            <Box px='4'>{children}</Box>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
