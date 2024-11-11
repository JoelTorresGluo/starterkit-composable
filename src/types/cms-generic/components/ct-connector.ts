import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'

export const ComponentCtConnectorSchema = z
  .object({
    contentType: z.literal('componentCtConnector'),
    id: z.string(),
    internalTitle: z.string(),
    title: z.string().optional().nullable(),
    ctaLabel: z.string().optional().nullable(),
    ctaHref: z.string().optional().nullable(),
    productList: z.array(z.string()).optional().nullable(), // TODO: delete this field, now using productList2
    productList2: z
      .object({
        ids: z.array(z.string()).optional(),
        keys: z.array(z.string()).optional(),
        skus: z.array(z.string()).optional(),
        slugs: z.array(z.string()).optional(),
      })
      .optional(),
  })
  .and(ContainerOptionsSchema)

export type ComposableCtConnector = z.infer<typeof ComponentCtConnectorSchema>
