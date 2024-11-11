import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'
import { ComponentArticleCardSchema } from './article-card'
import { ComponentCoverCardSchema } from './cover-card'
import { ComponentTextCardSchema } from './text-card'
import { PageComponentValidationErrorField } from '../page'
import { RichTextSchema } from '../rich-text'

export const ComponentGridSchema = z
  .object({
    contentType: z.literal('componentGrid'),
    id: z.string(),
    internalTitle: z.string(),
    columns: z.number().gte(1).lte(6),
    content: z.array(
      z
        .union([
          ComponentArticleCardSchema,
          ComponentCoverCardSchema,
          ComponentTextCardSchema,
          RichTextSchema,
        ])
        .and(PageComponentValidationErrorField)
    ),
    gridGap: z.string().optional().nullable(),
  })
  .and(ContainerOptionsSchema)

export type ComposableGrid = z.infer<typeof ComponentGridSchema>
