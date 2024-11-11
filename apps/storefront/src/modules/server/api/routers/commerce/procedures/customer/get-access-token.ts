import { ENABLE_BOLD_CHECKOUT } from '@modules/general'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'

export const getAccessToken = publicProcedure.query(async ({ ctx }) => {
  if (!ENABLE_BOLD_CHECKOUT)
    throw new Error('Procedure not available without Bold config')
  return await withRetry(async () => {
    const { client, anonymousUser, customer } = ctx.commerce
    const tokenResponse = await client.getAccessToken?.({
      anonymousUser,
      customer,
    })
    return {
      access_token: tokenResponse?.token ?? '',
    }
  })
})
