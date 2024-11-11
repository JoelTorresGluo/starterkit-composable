import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { TRPCError } from '@trpc/server'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { z } from 'zod'

export const getOrder = publicProcedure
  .input(
    z.object({
      orderId: z.string(),
      locale: LocaleSchema,
      currency: CurrencySchema,
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { orderId, locale, currency } = input
      const { client, anonymousUser, customer } = ctx.commerce

      const order = await client.getOrderById({ orderId, locale, currency })
      if (!order) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Order not found.',
        })
      }

      if (
        order.anonymousId !== anonymousUser?.id &&
        order.customerId !== customer?.id
      ) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Order does not belong to user.',
        })
      }

      return order
    })
  })
