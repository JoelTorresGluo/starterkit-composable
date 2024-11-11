import { ContainerOptionsSchema } from '../container-options'
import { ImageFieldSchema, TextPositionSchema } from '../fields'
import { z } from 'zod'

export const ComponentArticleCardSchema = z
  .object({
    contentType: z.literal('componentArticleCard'),
    id: z.string(),
    internalTitle: z.string(),
    image: ImageFieldSchema.optional(),
    eyebrow: z.string().optional(),
    title: z.string().optional(),
    content: z.any().optional(),
    href: z.string().optional(),
    textAlign: TextPositionSchema,
  })
  .and(ContainerOptionsSchema)

export type ComponentArticleCard = z.infer<typeof ComponentArticleCardSchema> //TODO: delete
export type ComposableArticleCard = z.infer<typeof ComponentArticleCardSchema>
