import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { z } from 'zod'

export const customerResetPassword = publicProcedure
  .input(
    z.object({
      resetToken: z.string(),
      newPassword: z.string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { resetToken, newPassword } = input
      const { client } = ctx.commerce
      return client.resetPassword({
        newPassword,
        token: resetToken,
      })
    })
  })
