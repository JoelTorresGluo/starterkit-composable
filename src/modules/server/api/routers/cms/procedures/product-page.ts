import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { LocaleSchema } from '@oriuminc/base'
import { z } from 'zod'

export const getProductPage = publicProcedure
  .input(
    z.object({
      slug: z.string(),
      locale: LocaleSchema,
      previewData: z.any().nullish(),
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { slug, locale, previewData } = input
      const { client } = ctx.cms
      return client.getProductPage({
        slug,
        locale,
        previewData,
      })
    })
  })
