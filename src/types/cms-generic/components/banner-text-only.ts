import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'

export const ComponentBannerTextOnlySchema = z
  .object({
    contentType: z.literal('componentBannerTextOnly'),
    id: z.string(),
    internalTitle: z.string(),
    eyebrow: z.string().optional().nullable(),
    title: z.string().optional().nullable(),
    content: z.any().optional().nullable(),
    centered: z.boolean(),
    ctaAlphaLabel: z.string().optional().nullable(),
    ctaAlphaHref: z.string().optional().nullable(),
  })
  .and(ContainerOptionsSchema)

export type ComposableBannerTextOnly = z.infer<
  typeof ComponentBannerTextOnlySchema
>
