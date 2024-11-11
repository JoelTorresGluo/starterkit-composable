import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { LocaleSchema } from '@oriuminc/base'
import { z } from 'zod'

export const getSiteConfig = publicProcedure
  .input(
    z.object({
      key: z.string(),
      locale: LocaleSchema,
      previewData: z.any().nullish(),
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { key, locale, previewData } = input
      const { client } = ctx.cms
      return client.getSiteConfig({
        key,
        locale,
        previewData,
      })
    })
  })
