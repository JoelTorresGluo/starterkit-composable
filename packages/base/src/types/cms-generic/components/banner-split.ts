import { ImageFieldSchema } from '../fields'
import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'

export const ComponentBannerSplitSchema = z
  .object({
    contentType: z.literal('componentBannerSplit'),
    id: z.string(),
    internalTitle: z.string(),
    imageDesktop: ImageFieldSchema.optional().nullable(),
    imageMobile: ImageFieldSchema.optional().nullable(),
    eyebrow: z.string().optional().nullable(),
    title: z.string().optional().nullable(),
    content: z.any().optional().nullable(),
    inverted: z.boolean(),
    ctaAlphaLabel: z.string().optional().nullable(),
    ctaAlphaHref: z.string().optional().nullable(),
  })
  .and(ContainerOptionsSchema)

export type ComposableBannerSplit = z.infer<typeof ComponentBannerSplitSchema>
