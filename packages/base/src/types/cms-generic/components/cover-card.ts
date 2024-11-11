import { ContainerOptionsSchema } from '../container-options'
import { ImageFieldSchema, TextPositionSchema, ThemeSchema } from '../fields'
import { z } from 'zod'

export const ComponentCoverCardSchema = z
  .object({
    contentType: z.literal('componentCoverCard'),
    id: z.string(),
    internalTitle: z.string(),
    image: ImageFieldSchema.optional().nullable(),
    eyebrow: z.string().optional().nullable(),
    title: z.string().optional().nullable(),
    content: z.any().optional().nullable(),
    href: z.string().optional().nullable(),
    theme: ThemeSchema,
    textAlign: TextPositionSchema,
  })
  .and(ContainerOptionsSchema)

export type ComponentCoverCard = z.infer<typeof ComponentCoverCardSchema> //TODO: delete
export type ComposableCoverCard = z.infer<typeof ComponentCoverCardSchema>
