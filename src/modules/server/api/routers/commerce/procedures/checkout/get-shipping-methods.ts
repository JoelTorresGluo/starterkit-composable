import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { z } from 'zod'

export const getShippingMethods = publicProcedure
  .input(
    z.object({
      locale: LocaleSchema,
      currency: CurrencySchema,
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { locale, currency } = input
      const { client } = ctx.commerce
      return client.getShippingMethods({ locale, currency })
    })
  })
