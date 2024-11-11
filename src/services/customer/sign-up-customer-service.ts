import { SdkClient } from '../../types'

export const createCustomer = async ({
  client,
  email,
  password,
  firstName,
  lastName,
}: {
  client: SdkClient
  email: string
  password: string
  firstName?: string
  lastName?: string
}) => {
  return (
    await client
      .customers()
      .post({
        body: {
          email,
          password,
          firstName,
          lastName,
        },
      })
      .execute()
  ).body
}
