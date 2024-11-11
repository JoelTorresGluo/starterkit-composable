import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'

export const ComponentEpConnectorSchema = z
  .object({
    contentType: z.literal('componentEpConnector'),
    id: z.string(),
    internalTitle: z.string(),
    title: z.string().optional().nullable(),
    ctaLabel: z.string().optional().nullable(),
    ctaHref: z.string().optional().nullable(),
    products: z
      .array(
        z.object({
          name: z.string(),
          sku: z.string(),
          id: z.string(),
        })
      )
      .optional()
      .nullable(),
  })
  .and(ContainerOptionsSchema)

export type ComponentEpConnector = z.infer<typeof ComponentEpConnectorSchema>
