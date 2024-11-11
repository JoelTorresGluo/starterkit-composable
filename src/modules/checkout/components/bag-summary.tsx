import { FormatNumberOptions, useIntl } from 'react-intl'
import { CartSummary } from '@modules/cart'
import { useCart } from '@modules/commerce'
import { CartSummaryAccordion } from '@oriuminc/templates/cart'
import { getCurrency } from '@oriuminc/base'

export const BagSummary = () => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const { cart } = useCart()
  const cartTotal = cart.price?.total ? cart.price.total / 100 : 0

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  return (
    <CartSummaryAccordion
      isLoading={cart.isLoading}
      isEmpty={cart.isEmpty}
      cartItemsQuantity={cart.quantity}
      formattedCartTotalPrice={intl.formatNumber(
        cartTotal,
        formatNumberOptions
      )}
    >
      <CartSummary
        hideCheckoutButton
        textOverride={{ total: 'cart.summary.total' }}
        displayTitle={false}
        orderSummaryProps={{ bg: 'white', p: 'none' }}
        showCartItems
      />
    </CartSummaryAccordion>
  )
}
