import { z } from 'zod'
import { ContainerOptionsSchema } from './container-options'

export const RichTextSchema = z
  .object({
    contentType: z.literal('richText'),
    id: z.string(),
    title: z.string().nullish(),
    slug: z.string().nullish(),
    richText: z.any().nullish(), // TODO: delete (keep html only)
    html: z.string().nullish(),
  })
  .and(ContainerOptionsSchema)

export type ComposableRichText = z.infer<typeof RichTextSchema>
