import { UpdateOrderAction } from '@oriuminc/commerce-generic'
import { composableOrderActionToCommercetoolsOrderAction } from '../../mappers'
import { SdkClient } from '../../types'
import { getOrderById } from './get-order-by-id'

export const updateOrder = async ({
  client,
  orderId,
  actions,
}: {
  client: SdkClient
  orderId: string
  actions: UpdateOrderAction[]
}) => {
  const order = await getOrderById({ client, orderId })
  return (
    await client
      .orders()
      .withId({ ID: orderId })
      .post({
        body: {
          actions: actions.map(composableOrderActionToCommercetoolsOrderAction),
          version: order.version,
        },
      })
      .execute()
  ).body
}
