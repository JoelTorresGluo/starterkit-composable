import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'

export const ComponentShopifyConnectorSchema = z
  .object({
    contentType: z.literal('componentShopifyConnector'),
    id: z.string(),
    internalTitle: z.string(),
    title: z.string().optional().nullable(),
    ctaLabel: z.string().optional().nullable(),
    ctaHref: z.string().optional().nullable(),
    productList: z.array(z.string()).optional().nullable(), // TODO: delete this field, now using productList2
    productList2: z
      .object({
        ids: z.array(z.string()).optional(),
      })
      .optional(),
  })
  .and(ContainerOptionsSchema)

export type ComposableShopifyConnector = z.infer<
  typeof ComponentShopifyConnectorSchema
>
