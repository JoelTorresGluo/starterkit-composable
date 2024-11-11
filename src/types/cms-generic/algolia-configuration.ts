import { z } from 'zod'

export const AlgoliaFilterBaseSchema = z.object({
  label: z.string(),
  attribute: z.string(),
  urlAlias: z.string().optional(),
})

export type AlgoliaFilterBase = z.infer<typeof AlgoliaFilterBaseSchema>

export const AlgoliaListTypeFilterSchema = AlgoliaFilterBaseSchema.and(
  z.object({
    type: z.literal('list'),
    operator: z.union([z.literal('and'), z.literal('or')]).optional(),
  })
)

export type AlgoliaListTypeFilter = z.infer<typeof AlgoliaListTypeFilterSchema>

export const AlgoliaNumericTypeFilterSchema = AlgoliaFilterBaseSchema.and(
  z.object({
    type: z.literal('numeric'),
    items: z.array(
      z.object({
        label: z.string(),
        start: z.number().optional(),
        end: z.number().optional(),
      })
    ),
  })
)

export type AlgoliaNumericTypeFilter = z.infer<
  typeof AlgoliaNumericTypeFilterSchema
>

export const AlgoliaRangeTypeFilterSchema = AlgoliaFilterBaseSchema.and(
  z.object({
    type: z.literal('range'),
  })
)

export type AlgoliaRangeTypeFilter = z.infer<
  typeof AlgoliaRangeTypeFilterSchema
>

export const AlgoliaFilterSchema = z.union([
  AlgoliaListTypeFilterSchema,
  AlgoliaNumericTypeFilterSchema,
  AlgoliaRangeTypeFilterSchema,
])

export type AlgoliaFilter = z.infer<typeof AlgoliaFilterSchema>

export const AlgoliaSortByOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
})

export type AlgoliaSortByOption = z.infer<typeof AlgoliaSortByOptionSchema>

export const AlgoliaConfigurationSchema = z.object({
  title: z.string(),
  key: z.string(),
  filters: z.array(AlgoliaFilterSchema).optional().nullable(),
  sortByOptions: z.array(AlgoliaSortByOptionSchema).optional().nullable(),
})

export type ComposableAlgoliaConfiguration = z.infer<
  typeof AlgoliaConfigurationSchema
>
