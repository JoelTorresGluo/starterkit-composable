import { FormatNumberOptions, useIntl } from 'react-intl'
import { CheckoutCartSummaryItem } from './checkout-cart-summary'

export const CustomPaymentItem = ({
  customPaymentAmount,
  formatNumberOptions,
}: {
  customPaymentAmount: number
  formatNumberOptions: FormatNumberOptions
}) => {
  const intl = useIntl()
  return (
    <>
      <CheckoutCartSummaryItem
        label={intl.formatMessage({ id: 'cart.summary.customAmount' })}
        value={intl.formatNumber(customPaymentAmount, formatNumberOptions)}
      />
    </>
  )
}
