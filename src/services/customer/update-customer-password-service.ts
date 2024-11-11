import { SdkClient } from '../../types'

export const updateCustomerPassword = async ({
  client,
  customerId,
  currentPassword,
  newPassword,
}: {
  client: SdkClient
  customerId: string
  currentPassword: string
  newPassword: string
}) => {
  const customer = (
    await client.customers().withId({ ID: customerId }).get().execute()
  ).body
  if (!customer) throw new Error('customer not found')
  return (
    await client
      .customers()
      .password()
      .post({
        body: {
          id: customerId,
          currentPassword,
          newPassword,
          version: customer.version,
        },
      })
      .execute()
  ).body
}
