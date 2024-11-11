import { UpdateCartAction } from '@oriuminc/commerce-generic'
import { composableCartActionToCommercetoolsCartAction } from '../../mappers'
import { SdkClient } from '../../types'

export const updateCart = async ({
  client,
  id,
  actions,
}: {
  client: SdkClient
  id: string
  actions: UpdateCartAction[]
}) => {
  const cart = (await client.carts().withId({ ID: id }).get().execute()).body
  return (
    await client
      .carts()
      .withId({ ID: id })
      .post({
        body: {
          actions: actions.map(composableCartActionToCommercetoolsCartAction),
          version: cart.version,
        },
        queryArgs: {
          expand: 'discountCodes[*].discountCode',
        },
      })
      .execute()
  ).body
}
