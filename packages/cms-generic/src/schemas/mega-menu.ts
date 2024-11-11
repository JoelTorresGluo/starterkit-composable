import { z } from 'zod'
import { ImageFieldSchema } from './fields'

const BaseMegaMenuItemSchema = z.object({
  contentType: z.literal('megaMenuItem'),
  id: z.string(),
  internalTitle: z.string(),
  variant: z.string().optional().nullable(),
  label: z.string().optional().nullable(),
  href: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  images: z.array(ImageFieldSchema).optional().nullable(),
})

// Zod Recursive types, see: https://zod.dev/?id=recursive-types
type BaseMegaMenuItem = z.infer<typeof BaseMegaMenuItemSchema> & {
  children?: (BaseMegaMenuItem | null)[]
}

export const MegaMenuItemSchema: z.ZodType<BaseMegaMenuItem> =
  BaseMegaMenuItemSchema.extend({
    children: z.lazy(() => MegaMenuItemSchema.array()).optional(),
  })

export type ComposableMegaMenuItem = z.infer<typeof MegaMenuItemSchema>

export const MegaMenuSchema = z.object({
  title: z.string(),
  identifier: z.string(),
  items: z.array(BaseMegaMenuItemSchema.or(z.null())),
})

export type ComposableMegaMenu = z.infer<typeof MegaMenuSchema>
