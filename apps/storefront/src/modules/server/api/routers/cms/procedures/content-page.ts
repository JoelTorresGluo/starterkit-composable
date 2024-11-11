import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { LocaleSchema } from '@oriuminc/base'
import { z } from 'zod'

export const getContentPage = publicProcedure
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
      return client.getContentPage({
        slug,
        locale,
        previewData,
      })
    })
  })

export const getContentPages = publicProcedure
  .input(
    z.object({
      locale: LocaleSchema,
      limit: z.number().optional(),
      offset: z.number().optional(),
      previewData: z.any().nullish(),
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const { locale, limit, offset, previewData } = input
      const { client } = ctx.cms
      return client.getContentPages({
        locale,
        limit,
        offset,
        previewData,
      })
    })
  })
