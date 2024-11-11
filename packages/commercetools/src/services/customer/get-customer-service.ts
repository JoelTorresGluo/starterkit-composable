import { SdkClient } from '../../types'

export const getCustomerById = async ({
  client,
  customerId,
}: {
  client: SdkClient
  customerId: string
}) => {
  return (await client.customers().withId({ ID: customerId }).get().execute())
    .body
}
