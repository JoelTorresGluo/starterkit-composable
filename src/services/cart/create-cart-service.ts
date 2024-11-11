import { SdkClient } from '../../types'

export const createCart = async ({
  client,
  locale,
  currency,
  anonymousId,
  customerId,
  customerEmail,
}: {
  client: SdkClient
  locale: string
  currency: string
  anonymousId?: string
  customerId?: string
  customerEmail?: string
}) => {
  const response = await client
    .carts()
    .post({
      body: {
        locale,
        currency,
        anonymousId,
        customerId,
        customerEmail,
      },
      queryArgs: {
        expand: 'discountCodes[*].discountCode',
      },
    })
    .execute()

  return response.body
}
