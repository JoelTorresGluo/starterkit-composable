import { SdkClient } from '../../types'

export const forgotCustomerPassword = async ({
  client,
  email,
}: {
  client: SdkClient
  email: string
}) => {
  return (
    await client
      .customers()
      .passwordToken()
      .post({
        body: {
          email,
        },
      })
      .execute()
  ).body
}
