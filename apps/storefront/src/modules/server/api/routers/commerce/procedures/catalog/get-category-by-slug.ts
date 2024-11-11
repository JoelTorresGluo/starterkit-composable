import { LocaleSchema } from '@oriuminc/base'
import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { z } from 'zod'

export const getCategoryBySlug = publicProcedure
  .input(z.object({ slug: z.string(), locale: LocaleSchema }))
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { slug, locale } = input
      const { client } = ctx.commerce
      return client.getCategoryBySlug({ slug, locale })
    })
  })
