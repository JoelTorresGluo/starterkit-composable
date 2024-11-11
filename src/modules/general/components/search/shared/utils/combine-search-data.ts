import { AutocompleteState, CollectionItemProps, HitItem } from '../types'
import { DEFAULT_CONFIG } from '../constants'

export const combineSearchData = (
  autocompleteState: AutocompleteState | null,
  hits: any[]
): (CollectionItemProps | HitItem)[] => {
  return [
    ...(autocompleteState?.collections.flatMap((collection) =>
      collection.items.map((item) => ({
        type: 'collection',
        subType: collection.source.sourceId,
        name: item.label ?? item.query ?? '',
        slug: null,
        ...item,
      }))
    ) || []),
    ...hits
      .map((hit) => ({
        type: 'hit',
        subType: 'product',
        name: hit.name,
        slug: hit.slug,
        ...hit,
      }))
      .slice(0, DEFAULT_CONFIG.hitsPerPage),
  ].map((item, index) => ({
    ...item,
    index: index,
  }))
}
