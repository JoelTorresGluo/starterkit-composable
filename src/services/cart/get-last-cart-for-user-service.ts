import { SdkClient } from '../../types'

export const getLastCartForUser = async ({
  client,
  locale,
  anonymousId,
  customerId,
}: {
  client: SdkClient
  locale: string
  anonymousId?: string
  customerId?: string
}) => {
  const response = await client
    .carts()
    .get({
      queryArgs: {
        where: customerId
          ? `cartState="Active" and locale="${locale}" and customerId="${customerId}"`
          : `cartState="Active" and locale="${locale}" and anonymousId="${anonymousId}"`,
        expand: ['discountCodes[*].discountCode'],
        sort: ['createdAt desc'],
      },
    })
    .execute()

  return response.body.results[0]
}
