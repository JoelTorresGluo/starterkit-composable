import { PaymentReference as CommercetoolsPayment } from '@commercetools/platform-sdk'
import {
  ComposablePayment,
  ComposablePaymentInterface,
} from '@oriuminc/commerce-generic'
import { commercetoolsTypedMoneyToComposableMoney } from './utils'
import { Locale } from '@oriuminc/base'

export const commercetoolsPaymentToComposablePayment = ({
  payment,
  locale,
}: {
  payment: CommercetoolsPayment
  locale: Locale
}): ComposablePayment => {
  const chargeTransaction = payment.obj?.transactions.find(
    (tr) => tr.type === 'Charge'
  )
  return {
    id: payment.id,
    paymentInterface: {
      identifier:
        (payment.obj?.paymentMethodInfo
          .paymentInterface as ComposablePaymentInterface) ?? '',
      transactionId: chargeTransaction?.interactionId,
      name:
        payment.obj?.paymentMethodInfo.name?.[locale] ||
        payment.obj?.paymentMethodInfo.paymentInterface ||
        '',
    },
    amount: chargeTransaction?.amount
      ? commercetoolsTypedMoneyToComposableMoney(chargeTransaction.amount)
          .amount
      : 0,
    currencyCode: chargeTransaction?.amount.currencyCode!,
  }
}
