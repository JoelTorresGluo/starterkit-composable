import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { z } from 'zod'

export const createCart = publicProcedure
  .input(
    z.object({
      locale: LocaleSchema,
      currency: CurrencySchema,
    })
  )
  .mutation(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { locale, currency } = input
      const { client, anonymousUser, customer } = ctx.commerce

      return client.createCart({
        locale,
        currency,
        customerAccessToken: customer?.session?.accessToken,
        customerEmail: customer?.email,
        customerId: customer?.id,
        anonymousId: anonymousUser?.id,
      })
    })
  })
