import { belongsToUser } from '@modules/commerce'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { CurrencySchema, LocaleSchema } from '@oriuminc/base'
import { UpdateCartActionSchema } from '@oriuminc/commerce-generic'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const updateCart = publicProcedure
  .input(
    z.object({
      id: z.string(),
      locale: LocaleSchema,
      currency: CurrencySchema,
      actions: z.array(UpdateCartActionSchema),
    })
  )
  .mutation(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { id, locale, currency, actions } = input
      const { client, anonymousUser, customer } = ctx.commerce

      let cartId = id

      const cart = await client.getCartById({
        cartId,
        locale,
        currency,
      })

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

      if (!cart.isActive) {
        cartId = (await client.replicateCart({ cartId, locale, currency })).id
      }

      return client.updateCart({
        id: cartId,
        actions,
        locale,
        currency,
      })
    })
  })
