import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'
import { ProductsListSchema } from '../fields'

export const ComponentCtConnectorSchema = z
  .object({
    contentType: z.literal('componentCtConnector'),
    id: z.string(),
    internalTitle: z.string(),
    title: z.string().optional().nullable(),
    ctaLabel: z.string().optional().nullable(),
    ctaHref: z.string().optional().nullable(),
    productList: z.array(z.string()).optional().nullable(), // TODO: delete this field, now using productList2
    productList2: ProductsListSchema.optional(),
  })
  .and(ContainerOptionsSchema)

export type ComposableCtConnector = z.infer<typeof ComponentCtConnectorSchema>
