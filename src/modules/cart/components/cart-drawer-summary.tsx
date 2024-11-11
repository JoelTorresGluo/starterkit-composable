import { Box, Divider, Flex, Text } from '@chakra-ui/react'
import { useCart } from '@modules/commerce'
import { getCurrency } from '@oriuminc/base'
import { FormatNumberOptions, useIntl } from 'react-intl'

interface CartDrawerSummaryItemProps {
  label: string
  textStyle?: string
  value?: string
  isDiscount?: boolean
}

const CartDrawerSummaryItem = (props: CartDrawerSummaryItemProps) => {
  const { label, value, textStyle, isDiscount } = props
  return (
    <Flex justify='space-between' mt='1'>
      <Text textStyle={textStyle}>{label}</Text>
      <Text textStyle={textStyle} color={isDiscount ? 'danger.600' : undefined}>
        {isDiscount && '-'}
        {value}
      </Text>
    </Flex>
  )
}

export const CartDrawerSummary = () => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const { cart } = useCart()

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  if (!cart.price) return null

  return (
    <Box>
      <CartDrawerSummaryItem
        textStyle='blockquote'
        label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
        value={intl.formatNumber(
          cart?.price?.subtotal / 100,
          formatNumberOptions
        )}
      />

      <CartDrawerSummaryItem
        textStyle='blockquote'
        label={intl.formatMessage({ id: 'cart.summary.shipping' })}
        value={
          cart.price.shipping !== undefined
            ? intl.formatNumber(cart.price.shipping / 100, formatNumberOptions)
            : intl.formatMessage({
                id: 'cart.summary.tax.calculatedAtNextStep',
              })
        }
      />

      <CartDrawerSummaryItem
        textStyle='blockquote'
        label={intl.formatMessage({ id: 'cart.summary.tax' })}
        value={
          cart.price.tax !== undefined
            ? intl.formatNumber(cart.price.tax / 100, formatNumberOptions)
            : intl.formatMessage({
                id: 'cart.summary.tax.calculatedAtNextStep',
              })
        }
      />

      {cart.price.discounts !== undefined && cart.price.discounts > 0 && (
        <CartDrawerSummaryItem
          isDiscount
          textStyle='blockquote'
          label={intl.formatMessage({ id: 'cart.summary.discount' })}
          value={intl.formatNumber(
            cart.price.discounts / 100,
            formatNumberOptions
          )}
        />
      )}

      <Divider my='2-5' mx='0' />

      <CartDrawerSummaryItem
        textStyle='mobile-100'
        label={intl.formatMessage({
          id: 'cart.summary.estimatedTotal',
        })}
        value={intl.formatNumber(cart.price.total / 100, formatNumberOptions)}
      />
    </Box>
  )
}
