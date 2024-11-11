import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { LocaleSchema } from '@oriuminc/base'
import { z } from 'zod'

export const getRichTextContent = publicProcedure
  .input(
    z.object({
      slug: z.string(),
      locale: LocaleSchema,
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { slug, locale } = input
      return ctx.cms.client.getRichTextContent({
        slug,
        locale,
      })
    })
  })
