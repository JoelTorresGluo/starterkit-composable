import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { z } from 'zod'

export const getProductBySlug = publicProcedure
  .input(
    z.object({
      slug: z.string(),
      inventoryChannelKey: z.string().optional(),
      locale: LocaleSchema,
      currency: CurrencySchema,
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { slug, inventoryChannelKey, currency, locale } = input
      const { client, customer } = ctx.commerce
      const product = await client.getProductBySlug({
        slug,
        locale,
        currency,
        customerGroup: customer?.customerGroup,
        stockChannel: inventoryChannelKey,
      })
      return product
    })
  })
