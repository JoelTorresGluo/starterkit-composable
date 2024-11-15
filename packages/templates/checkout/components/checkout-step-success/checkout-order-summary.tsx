import { Box, Divider, Stack, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { SuccessSection } from './checkout-success-section'
import { OrderTotals } from './checkout-order-totals'
import { ReactNode } from 'react'

interface OrderSummaryProps {
  items: ReactNode | ReactNode[]
  itemsQuantity: number
  subtotal: string
  deliveryTitle?: string
  delivery: string
  tax: string
  discount?: string
  total: string
}

export const OrderSummary = ({
  items,
  itemsQuantity,
  subtotal,
  deliveryTitle,
  delivery,
  tax,
  discount,
  total,
}: OrderSummaryProps) => {
  const intl = useIntl()

  return (
    <SuccessSection
      title={intl.formatMessage({ id: 'checkout.success.orderSummary.title' })}
    >
      <Stack divider={<Divider />} spacing='2'>
        <Text>
          {intl.formatMessage(
            { id: 'checkout.success.orderSummary.items' },
            { quantity: itemsQuantity }
          )}
        </Text>
        <Box>
          <Stack divider={<Divider />} spacing='2'>
            {items}
          </Stack>
        </Box>
      </Stack>

      <OrderTotals
        subtotal={subtotal}
        deliveryTitle={deliveryTitle}
        delivery={delivery}
        tax={tax}
        discount={discount}
        total={total}
      />
    </SuccessSection>
  )
}
