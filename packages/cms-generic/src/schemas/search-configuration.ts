import { z } from 'zod'

export const SearchFilterBaseSchema = z.object({
  label: z.string(),
  attribute: z.string(),
  urlAlias: z.string().optional(),
})

export type SearchFilterBase = z.infer<typeof SearchFilterBaseSchema>

export const SearchListTypeFilterSchema = SearchFilterBaseSchema.and(
  z.object({
    type: z.literal('list'),
    operator: z.union([z.literal('and'), z.literal('or')]).optional(),
  })
)

export type SearchListTypeFilter = z.infer<typeof SearchListTypeFilterSchema>

export const SearchNumericTypeFilterSchema = SearchFilterBaseSchema.and(
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

export type SearchNumericTypeFilter = z.infer<
  typeof SearchNumericTypeFilterSchema
>

export const SearchRangeTypeFilterSchema = SearchFilterBaseSchema.and(
  z.object({
    type: z.literal('range'),
  })
)

export type SearchRangeTypeFilter = z.infer<typeof SearchRangeTypeFilterSchema>

export const SearchFilterSchema = z.union([
  SearchListTypeFilterSchema,
  SearchNumericTypeFilterSchema,
  SearchRangeTypeFilterSchema,
])

export type SearchFilter = z.infer<typeof SearchFilterSchema>

export const SearchSortByOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
})

export type SearchSortByOption = z.infer<typeof SearchSortByOptionSchema>

export const SearchConfigurationSchema = z.object({
  title: z.string(),
  key: z.string(),
  filters: z.array(SearchFilterSchema).optional().nullable(),
  sortByOptions: z.array(SearchSortByOptionSchema).optional().nullable(),
})

export type ComposableSearchConfiguration = z.infer<
  typeof SearchConfigurationSchema
>
