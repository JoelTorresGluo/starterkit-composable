import { UpdateCustomerAction } from '@oriuminc/commerce-generic'
import { composableCustomerUpdateActionToCommercetoolsCustomerUpdateAction } from '../../mappers'
import { SdkClient } from '../../types'

export const updateCustomer = async ({
  client,
  customerId,
  actions,
}: {
  client: SdkClient
  customerId: string
  actions: UpdateCustomerAction[]
}) => {
  const customer = (
    await client.customers().withId({ ID: customerId }).get().execute()
  ).body
  if (!customer) throw new Error('customer not found')

  const mappedActions = actions.map(
    composableCustomerUpdateActionToCommercetoolsCustomerUpdateAction
  )

  const response = await client
    .customers()
    .withId({ ID: customerId })
    .post({
      body: {
        actions: mappedActions,
        version: customer.version,
      },
    })
    .execute()

  return response.body
}
