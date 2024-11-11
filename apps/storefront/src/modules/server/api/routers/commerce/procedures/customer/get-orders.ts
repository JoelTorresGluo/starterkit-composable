import { ORDER_DEFAULT_LIMIT } from '@modules/commerce'
import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { z } from 'zod'

export const getOrders = publicProcedure
  .input(
    z.object({
      locale: LocaleSchema,
      currency: CurrencySchema,
      offset: z.number(),
      limit: z.number().optional(),
      sort: z.string().optional(),
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { offset, limit, sort, locale, currency } = input
      const { client, customer } = ctx.commerce

      if (!customer) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized: user session does not exists',
        })
      }

      return client.getCustomerOrders({
        customerId: customer.id,
        locale,
        currency,
        offset,
        limit: limit ?? ORDER_DEFAULT_LIMIT,
        sort,
      })
    })
  })
