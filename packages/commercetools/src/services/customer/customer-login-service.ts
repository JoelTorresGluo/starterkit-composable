import { SdkClient } from '../../types'

export const customerLogin = async ({
  client,
  email,
  password,
  anonymousUserId,
  mergeCart = true,
}: {
  client: SdkClient
  email: string
  password: string
  anonymousUserId?: string
  mergeCart?: boolean
}) => {
  return (
    await client
      .login()
      .post({
        body: {
          email,
          password,
          anonymousId: anonymousUserId,
          anonymousCartSignInMode: mergeCart
            ? 'MergeWithExistingCustomerCart'
            : 'UseAsNewActiveCustomerCart',
        },
      })
      .execute()
  ).body.customer
}
