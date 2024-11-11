import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'

export const ComponentBigCommerceConnectorSchema = z
  .object({
    contentType: z.literal('componentBigCommerceConnector'),
    id: z.string(),
    internalTitle: z.string(),
    title: z.string().optional().nullable(),
    ctaLabel: z.string().optional().nullable(),
    ctaHref: z.string().optional().nullable(),
    productList: z.array(z.string()).optional().nullable(),
  })
  .and(ContainerOptionsSchema)

export type ComponentBigCommerceConnector = z.infer<
  typeof ComponentBigCommerceConnectorSchema
>
