import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { LocaleSchema } from '@oriuminc/base'
import { z } from 'zod'

export const getMegaMenu = publicProcedure
  .input(
    z.object({
      id: z.string(),
      locale: LocaleSchema,
      previewData: z.any().nullish(),
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { id, locale, previewData } = input
      const { client } = ctx.cms
      return client.getMegaMenu({
        id,
        locale,
        previewData,
      })
    })
  })
