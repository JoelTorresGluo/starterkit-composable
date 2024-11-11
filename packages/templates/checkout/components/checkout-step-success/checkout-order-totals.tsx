import { Divider, Flex, Stack, Text, TextProps } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface OrderTotalsProps {
  subtotal: string
  deliveryTitle?: string
  delivery: string
  tax: string
  discount?: string
  total: string
}

export const OrderTotals = ({
  subtotal,
  deliveryTitle,
  delivery,
  tax,
  discount,
  total,
}: OrderTotalsProps) => {
  const intl = useIntl()

  return (
    <Stack spacing='xs' mt='lg' divider={<Divider />}>
      <Stack spacing='1'>
        <CartSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
          value={subtotal}
        />
        <CartSummaryItem
          label={
            deliveryTitle ||
            intl.formatMessage({
              id: 'cart.summary.shipping',
            })
          }
          value={delivery}
        />
        <CartSummaryItem
          label={intl.formatMessage({ id: 'cart.summary.tax' })}
          value={tax}
        />
        {discount && (
          <CartSummaryItem
            isDiscount
            label={intl.formatMessage({ id: 'cart.summary.discount' })}
            value={discount}
          />
        )}
      </Stack>
      <CartSummaryItem
        label={intl.formatMessage({
          id: 'checkout.success.orderSummary.totalPaid',
        })}
        value={total}
        fontSize='base'
        fontWeight='bold'
      />
    </Stack>
  )
}

interface CartSummaryItemProps extends TextProps {
  label: string
  value: string
  isDiscount?: boolean
}

const CartSummaryItem = (props: CartSummaryItemProps) => {
  const { label, value, isDiscount, ...textProps } = props
  return (
    <Flex justify='space-between' fontSize='sm'>
      <Text {...textProps}>{label}</Text>
      <Text {...textProps} color={isDiscount ? 'danger.600' : undefined}>
        {isDiscount && '-'}
        {value}
      </Text>
    </Flex>
  )
}
