import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { ComposableProductSearchQueryParamsSchema } from '@oriuminc/commerce-generic'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { z } from 'zod'

export const getProducts = publicProcedure
  .input(
    z.object({
      locale: LocaleSchema,
      currency: CurrencySchema,
      query: ComposableProductSearchQueryParamsSchema.optional(),
      limit: z.number().optional(),
      offset: z.number().optional(),
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { query, locale, currency, limit, offset } = input
      const { client, customer } = ctx.commerce
      return client.getProducts({
        query,
        customerGroup: customer?.customerGroup,
        locale,
        currency,
        limit,
        offset,
      })
    })
  })
