import { z } from 'zod'

export const searchFilterInputSchema = () =>
  z.object({
    model: z
      .object({
        value: z
          .object({
            path: z.string(),
            values: z.array(z.string()),
          })
          .optional(),

        range: z
          .object({
            path: z.string(),
            ranges: z.array(
              z.object({
                from: z.string(),
                to: z.string(),
              })
            ),
          })
          .optional(),

        missing: z
          .object({
            path: z.string(),
          })
          .optional(),

        exists: z
          .object({
            path: z.string(),
          })
          .optional(),

        tree: z
          .object({
            path: z.string(),
            rootValues: z.array(z.string()),
            subTreeValues: z.array(z.string()),
          })
          .optional(),
      })
      .optional(),

    string: z.string().optional(),
  })
