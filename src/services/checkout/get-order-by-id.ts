import { SdkClient } from '../../types'

export const getOrderById = async ({
  client,
  orderId,
}: {
  client: SdkClient
  orderId: string
}) => {
  return (
    await client
      .orders()
      .withId({ ID: orderId })
      .get({
        queryArgs: {
          expand: [
            'shippingInfo.shippingMethod',
            'discountCodes[*].discountCode',
            'paymentInfo.payments[*]',
          ],
        },
      })
      .execute()
  ).body
}
