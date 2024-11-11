import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'
import { ProductsListSchema } from '../fields'

export const ComponentShopifyProductListSchema = z
  .object({
    contentType: z.literal('componentShopifyProductList'),
    id: z.string(),
    internalTitle: z.string(),
    title: z.string().optional().nullable(),
    ctaLabel: z.string().optional().nullable(),
    ctaHref: z.string().optional().nullable(),
    productList: z.array(z.string()).optional().nullable(), // TODO: delete this field, now using productList2
    productList2: ProductsListSchema.optional(),
    variant: z.enum(['default', 'large']),
  })
  .and(ContainerOptionsSchema)

export type ComposableShopifyProductList = z.infer<
  typeof ComponentShopifyProductListSchema
>
