import { protectedProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { TRPCError } from '@trpc/server'

export const getCustomer = protectedProcedure.query(async ({ ctx }) => {
  return await withRetry(async () => {
    const { client, customer } = ctx.commerce
    if (!customer) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized: there is no user session.',
      })
    }
    return client.getCustomer({
      customerId: customer.id,
      token: customer.session?.accessToken,
    })
  })
})
