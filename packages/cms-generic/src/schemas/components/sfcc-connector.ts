import { ContainerOptionsSchema } from '../container-options'
import { z } from 'zod'

export const ComponentSFCCConnectorSchema = z
  .object({
    contentType: z.literal('componentSFCCConnector'),
    id: z.string(),
    internalTitle: z.string(),
    title: z.string().optional().nullable(),
    ctaLabel: z.string().optional().nullable(),
    ctaHref: z.string().optional().nullable(),
    productList: z.array(z.string()).optional().nullable(), // TODO: delete this field, now using productList2
    productList2: z
      .object({
        ids: z.array(z.string()).optional(),
      })
      .optional(),
  })
  .and(ContainerOptionsSchema)

export type ComposableSFCCConnector = z.infer<
  typeof ComponentSFCCConnectorSchema
>
