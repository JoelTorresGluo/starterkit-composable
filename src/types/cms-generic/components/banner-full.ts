import { ImageFieldSchema, TextPositionSchema } from '../fields'
import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'

export const ComponentBannerFullSchema = z
  .object({
    contentType: z.literal('componentBannerFull'),
    id: z.string(),
    internalTitle: z.string(),
    imageDesktop: ImageFieldSchema.optional().nullable(),
    imageMobile: ImageFieldSchema.optional().nullable(),
    eyebrow: z.string().optional().nullable(),
    title: z.string().optional().nullable(),
    content: z.any().optional().nullable(),
    theme: z.string().optional().nullable(),
    textPosition: TextPositionSchema,
    ctaAlphaLabel: z.string().optional().nullable(),
    ctaAlphaHref: z.string().optional().nullable(),
    ctaBetaLabel: z.string().optional().nullable(),
    ctaBetaHref: z.string().optional().nullable(),
    linkLabel1: z.string().optional().nullable(),
    linkHref1: z.string().optional().nullable(),
    linkLabel2: z.string().optional().nullable(),
    linkHref2: z.string().optional().nullable(),
    linkLabel3: z.string().optional().nullable(),
    linkHref3: z.string().optional().nullable(),
    linkLabel4: z.string().optional().nullable(),
    linkHref4: z.string().optional().nullable(),
    linkLabel5: z.string().optional().nullable(),
    linkHref5: z.string().optional().nullable(),
    linkLabel6: z.string().optional().nullable(),
    linkHref6: z.string().optional().nullable(),
  })
  .and(ContainerOptionsSchema)

export type ComposableBannerFull = z.infer<typeof ComponentBannerFullSchema>
