import { SdkClient } from '../../types'

export const getShippingMethods = async ({
  client,
  limit,
  offset,
}: {
  client: SdkClient
  limit?: number
  offset?: number
}) => {
  return (
    await client
      .shippingMethods()
      .get({ queryArgs: { limit, offset } })
      .execute()
  ).body
}
