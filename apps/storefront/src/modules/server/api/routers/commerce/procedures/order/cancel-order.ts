import { belongsToUser } from '@modules/commerce'
import { publicProcedure } from '@modules/server/api/trpc'
import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const cancelOrder = publicProcedure
  .input(
    z.object({
      orderId: z.string(),
      locale: LocaleSchema,
      currency: CurrencySchema,
    })
  )
  .mutation(async ({ input, ctx }) => {
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
      !belongsToUser({
        order: order,
        anonymousId: anonymousUser?.id,
        customerId: customer?.id,
      })
    ) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Unauthorized: something went wrong.',
      })
    }

    if (order.status !== 'Open') {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'The order must be "Open" in order to cancel it.',
      })
    }

    await client.updateOrder({
      orderId,
      actions: [
        {
          action: 'cancelOrder',
        },
      ],
      locale,
      currency,
    })
  })
