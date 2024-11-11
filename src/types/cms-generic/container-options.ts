import { z } from 'zod'
import { ContainerSizeSchema } from './fields'

export const ContainerOptionsSchema = z.object({
  containerSize: ContainerSizeSchema.optional().nullable(),
  containerMarginTop: z.string().optional().nullable(),
  containerMarginBottom: z.string().optional().nullable(),
})

export type ContainerOptions = z.infer<typeof ContainerOptionsSchema>
