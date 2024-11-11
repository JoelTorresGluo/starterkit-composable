import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { z } from 'zod'

export const createUser = publicProcedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { email, password, firstName, lastName } = input
      const { client } = ctx.commerce

      return client.createCustomer({
        email,
        password,
        firstName,
        lastName,
      })
    })
  })
