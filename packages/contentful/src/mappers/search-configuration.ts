import {
  SearchConfigurationSchema,
  SearchFilterSchema,
  SearchSortByOptionSchema,
  ComposableSearchConfiguration,
} from '@oriuminc/cms-generic'
import { Entry } from 'contentful'
import { ContentfulSdkSearchConfigResponse } from '../types'

export const contentfulSearchConfigToComposableSearchConfiguration = (
  rawSearchConfigData: ContentfulSdkSearchConfigResponse
): ComposableSearchConfiguration | null => {
  const fields = rawSearchConfigData.items[0]?.fields
  if (!fields || !Object.entries(fields).length) return null
  return SearchConfigurationSchema.parse({
    ...fields,
    filters:
      fields.filters?.map((filter) =>
        SearchFilterSchema.parse((filter as Entry).fields)
      ) ?? [],
    sortByOptions:
      fields.sortByOptions?.map((sortyByOption) =>
        SearchSortByOptionSchema.parse((sortyByOption as Entry).fields)
      ) ?? [],
  })
}
