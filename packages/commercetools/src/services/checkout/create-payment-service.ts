import { ComposablePayment } from '@oriuminc/commerce-generic'
import { SdkClient } from '../../types'
import { Currency, Locale } from '@oriuminc/base'

export const createPayment = async ({
  client,
  centAmount,
  locale,
  currency,
  paymentInterface,
}: {
  client: SdkClient
  centAmount: number
  locale: Locale
  currency: Currency
  paymentInterface: ComposablePayment['paymentInterface']
}) => {
  return (
    await client
      .payments()
      .post({
        body: {
          amountPlanned: {
            centAmount,
            currencyCode: currency,
          },
          paymentMethodInfo: {
            paymentInterface: paymentInterface.identifier,
            name: paymentInterface.name
              ? {
                  [locale]: paymentInterface.name,
                }
              : undefined,
          },
          transactions: [
            {
              type: 'Charge',
              amount: {
                currencyCode: currency,
                centAmount: centAmount,
              },
              interactionId: paymentInterface.transactionId,
            },
          ],
        },
      })
      .execute()
  ).body
}
