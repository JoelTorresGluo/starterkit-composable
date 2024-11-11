import { protectedProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { UpdateCustomerActionSchema } from '@oriuminc/commerce-generic'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const updateCustomer = protectedProcedure
  .input(
    z.object({
      actions: z.array(UpdateCustomerActionSchema),
    })
  )
  .mutation(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { actions } = input
      const { client, customer } = ctx.commerce

      if (!customer || !customer.id!) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message:
            'Unauthorized: Please log in to update your customer details.',
        })
      }

      return client.updateCustomer({
        customerId: customer.id,
        actions,
      })
    })
  })
