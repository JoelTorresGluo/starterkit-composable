import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { custom, z } from 'zod'

export const getCart = publicProcedure
  .input(
    z.object({
      locale: LocaleSchema,
      currency: CurrencySchema,
      cartId: z.string().optional(),
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { locale, currency, cartId } = input
      const { client, anonymousUser, customer } = ctx.commerce

      return client.getLastCart({
        locale,
        currency,
        anonymousId: anonymousUser?.id,
        customerId: customer?.id,
        customerEmail: customer?.email,
        accessToken: customer?.session?.accessToken,
        cartId,
      })
    })
  })
