import { PaginationParams } from '@oriuminc/commerce-generic/src/pagination'
import { SdkClient } from '../../types'

export const getCustomerOrders = async ({
  client,
  customerId,
  sort,
  limit,
  offset,
}: {
  client: SdkClient
  customerId: string
  sort?: string
} & PaginationParams) => {
  return (
    await client
      .orders()
      .get({
        queryArgs: {
          where: `customerId="${customerId}"`,
          limit,
          offset,
          sort,
        },
      })
      .execute()
  ).body
}
