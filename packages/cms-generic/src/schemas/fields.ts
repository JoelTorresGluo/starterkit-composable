import { z } from 'zod'

export const ImageFieldSchema = z.object({
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
})
export type ImageField = z.infer<typeof ImageFieldSchema>

export const TextPositionSchema = z.enum(['left', 'center', 'right'])
export type TextPosition = z.infer<typeof TextPositionSchema>

export const ContainerSizeSchema = z.enum(['full', '2xl', 'xl', 'lg'])
export type ContainerSize = z.infer<typeof ContainerSizeSchema>

export const ThemeSchema = z.enum(['highlight', 'light', 'dark'])
export type Theme = z.infer<typeof ThemeSchema>

export const ProductsListSchema = z.object({
  ids: z.array(z.string()).optional(),
  keys: z.array(z.string()).optional(),
  skus: z.array(z.string()).optional(),
  slugs: z.array(z.string()).optional(),
})

export type ProductsList = z.infer<typeof ProductsListSchema>
