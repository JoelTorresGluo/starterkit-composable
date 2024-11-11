import { belongsToUser } from '@modules/commerce'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const confirmOfflinePayment = publicProcedure
  .input(
    z.object({
      cartId: z.string(),
      locale: LocaleSchema,
      currency: CurrencySchema,
    })
  )
  .mutation(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { locale, currency, cartId } = input
      const { client, anonymousUser, customer } = ctx.commerce
      const cart = await client.getCartById({ cartId, locale, currency })

      if (!cart) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Cart does not exists.',
        })
      }

      if (
        !belongsToUser({
          cart,
          anonymousId: anonymousUser?.id,
          customerId: customer?.id,
        })
      ) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'Unauthorized: cart does not belong to user.',
        })
      }

      return client.createOrderFromCart({
        cartId,
        payments: [
          {
            amount: cart.price.total,
            paymentInterface: {
              identifier: 'OFFLINE',
              name: 'Pay on Delivery',
            },
          },
        ],
        locale,
        currency,
      })
    })
  })
