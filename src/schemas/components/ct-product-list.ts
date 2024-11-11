import { z } from 'zod'
import { ContainerOptionsSchema } from '../container-options'
import { ProductsListSchema } from '../fields'

export const ComponentCtProductListSchema = z
  .object({
    contentType: z.literal('componentCtProductList'),
    id: z.string(),
    internalTitle: z.string(),
    title: z.string().optional().nullable(),
    subtitle: z.string().optional().nullable(),
    productList: z.array(z.string()).optional().nullable(), // TODO: delete this field, now using productList2
    productList2: ProductsListSchema.optional(),
    variant: z.enum(['default', 'large']),
    ctaLabel: z.string().optional().nullable(),
    ctaHref: z.string().optional().nullable(),
    showPrice: z.boolean().optional().nullable(),
  })
  .and(ContainerOptionsSchema)

export type ComposableCtProductList = z.infer<
  typeof ComponentCtProductListSchema
>
