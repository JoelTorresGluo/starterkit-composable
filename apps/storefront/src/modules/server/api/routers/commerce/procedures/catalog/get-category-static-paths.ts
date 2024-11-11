import { publicProcedure } from '@modules/server/api/trpc'
import { withRetry } from '@modules/utils'
import { LocaleSchema } from '@oriuminc/base'
import { z } from 'zod'

export const getCategoryStaticPaths = publicProcedure
  .input(
    z.object({
      locale: LocaleSchema,
    })
  )
  .query(async ({ input, ctx }) => {
    return await withRetry(async () => {
      const MAX_LIMIT = 500
      const { locale } = input
      const { client } = ctx.commerce

      const categoryList = await client.getCategories({
        limit: MAX_LIMIT,
        locale,
      })

      return categoryList?.results
        ?.filter((cat) => {
          if (!cat.slug) {
            //eslint-disable-next-line no-console
            console.warn(
              `Warning: ${cat.id} has no slug and will not be reachable through route /category/[slug]`
            )
            return false
          }
          return true
        })
        ?.map((cat) => ({ slug: cat.slug }))
    })
  })
