import { z } from 'zod'
import { ComposableCategory } from './category'
import { ComposableImage } from './image'
import { ComposablePrice } from './money'

export interface ComposableSeoFields {
  title?: string
  description?: string
  keywords?: string
}

export interface ComposableProduct {
  id: string
  key?: string
  title: string
  description?: string
  slug: string
  sku: string
  variants: ComposableProductVariant[]
  images?: ComposableImage[]
  categories: ComposableCategory[]
  seo?: ComposableSeoFields
}

export interface ComposableAttribute {
  name: string
  value: string
}

export interface ComposableProductVariant {
  parentId?: string
  id: string
  title: string
  sku?: string
  /** Price of the product variant. A product variant may not have a price for a particular currency. */
  price?: ComposablePrice
  images?: ComposableImage[]
  stockQuantity?: number
  attributes?: ComposableAttribute[]
}

export const ComposableProductSearchQueryParamsSchema = z.object({
  ids: z.array(z.string()).optional(),
  keys: z.array(z.string()).optional(),
  skus: z.array(z.string()).optional(),
  slugs: z.array(z.string()).optional(),
})

export type ComposableProductSearchQueryParams = z.infer<
  typeof ComposableProductSearchQueryParamsSchema
>
