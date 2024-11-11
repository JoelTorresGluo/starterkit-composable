import { ContainerOptionsSchema } from '../container-options'
import { ImageFieldSchema, TextPositionSchema, ThemeSchema } from '../fields'
import { z } from 'zod'

export const ComponentTextCardSchema = z
  .object({
    contentType: z.literal('componentTextCard'),
    id: z.string(),
    internalTitle: z.string(),
    image: ImageFieldSchema.optional().nullable(),
    title: z.string().optional().nullable(),
    content: z.any().optional().nullable(),
    ctaLabel: z.string().optional().nullable(),
    ctaHref: z.string().optional().nullable(),
    theme: ThemeSchema,
    textAlign: TextPositionSchema,
  })
  .and(ContainerOptionsSchema)

export type ComposableTextCard = z.infer<typeof ComponentTextCardSchema>
