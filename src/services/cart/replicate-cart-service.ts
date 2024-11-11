import { SdkClient } from '../../types'

export const replicateCart = async ({
  client,
  cartId,
}: {
  client: SdkClient
  cartId: string
}) => {
  return (
    await client
      .carts()
      .replicate()
      .post({
        body: {
          reference: {
            typeId: 'cart',
            id: cartId,
          },
        },
      })
      .execute()
  ).body
}
