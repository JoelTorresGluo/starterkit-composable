import {
  AlgoliaConfigurationSchema,
  AlgoliaFilterSchema,
  AlgoliaSortByOptionSchema,
  ComposableAlgoliaConfiguration,
} from '@oriuminc/cms-generic'
import { Entry } from 'contentful'
import { ContentfulSdkAlgoliaConfigResponse } from '../types'

export const contentfulAlgoliaConfigToComposableAlgoliaConfiguration = (
  rawAlgoliaConfigData: ContentfulSdkAlgoliaConfigResponse
): ComposableAlgoliaConfiguration | null => {
  const fields = rawAlgoliaConfigData.items[0]?.fields
  if (!fields || !Object.entries(fields).length) return null
  return AlgoliaConfigurationSchema.parse({
    ...fields,
    filters:
      fields.filters?.map((filter) =>
        AlgoliaFilterSchema.parse((filter as Entry).fields)
      ) ?? [],
    sortByOptions:
      fields.sortByOptions?.map((sortyByOption) =>
        AlgoliaSortByOptionSchema.parse((sortyByOption as Entry).fields)
      ) ?? [],
  })
}
