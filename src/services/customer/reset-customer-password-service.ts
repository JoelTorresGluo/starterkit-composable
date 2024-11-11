import { SdkClient } from '../../types'

export const resetCustomerPassword = async ({
  client,
  newPassword,
  token,
}: {
  client: SdkClient
  newPassword: string
  token: string
}) => {
  return (
    await client
      .customers()
      .passwordReset()
      .post({
        body: {
          newPassword,
          tokenValue: token,
        },
      })
      .execute()
  ).body
}
