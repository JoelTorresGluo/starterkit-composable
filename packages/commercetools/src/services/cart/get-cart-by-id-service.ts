import { SdkClient } from '../../types'

export const getCartById = async ({
  client,
  id,
}: {
  client: SdkClient
  id: string
}) => {
  return (
    await client
      .carts()
      .withId({ ID: id })
      .get({
        queryArgs: {
          expand: 'discountCodes[*].discountCode',
        },
      })
      .execute()
  ).body
}
