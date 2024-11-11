import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Text,
  Box,
  Heading,
  Center,
  Stack,
  useToken,
} from '@chakra-ui/react'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { useIntl } from 'react-intl'

interface CartPromotionAccordionProps {
  isOpen?: boolean
  showDiscount?: React.ReactElement
  hideBorderTop?: boolean
  children: React.ReactElement
}

export const CartPromotionAccordion = ({
  isOpen,
  showDiscount,
  hideBorderTop = false,
  children,
}: CartPromotionAccordionProps) => {
  const intl = useIntl()
  const [size1, size4] = useToken('sizes', ['sizes.1', 'sizes.4'])

  return (
    <Accordion allowToggle defaultIndex={isOpen ? [0] : undefined}>
      <AccordionItem
        borderLeft='none'
        borderRight='none'
        borderTop={hideBorderTop ? 'none' : 'sm'}
        borderBottom='sm'
      >
        {({ isExpanded }) => (
          <Box>
            <Heading as='span'>
              <AccordionButton
                p={`${size4} ${size1} ${size4}`}
                border='none'
                outline='none'
              >
                <Center pr='3' as='span' aria-hidden='true'>
                  {isExpanded ? (
                    <MinusIcon fontSize='sm' color='primary' />
                  ) : (
                    <AddIcon fontSize='sm' color='primary' />
                  )}
                </Center>
                <Text
                  as='span'
                  textStyle='eyebrow'
                  flex='1'
                  textAlign='left'
                  fontSize={{ base: 'xs', md: 'sm' }}
                  color='primary.500'
                  fontWeight='bold'
                >
                  {intl.formatMessage({
                    id: 'cart.summary.redeemAPromoCode',
                  })}
                </Text>
              </AccordionButton>
            </Heading>
            <AccordionPanel>
              <Stack spacing='2'>
                {showDiscount}
                {children}
              </Stack>
            </AccordionPanel>
          </Box>
        )}
      </AccordionItem>
    </Accordion>
  )
}
