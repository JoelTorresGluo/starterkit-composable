import { protectedProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const changePassword = protectedProcedure
  .input(
    z.object({
      currentPassword: z.string(),
      newPassword: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { newPassword, currentPassword } = input
      const { client, customer } = ctx.commerce

      if (!customer) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message:
            'Unauthorized: user is not authenticated. Please log in to update your customer.',
        })
      }

      return client.changePassword({
        customerId: customer.id,
        currentPassword,
        newPassword,
      })
    })
  })
