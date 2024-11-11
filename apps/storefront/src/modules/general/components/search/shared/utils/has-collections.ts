import { AutocompleteState } from '../types'

export const hasCollections = (collections: AutocompleteState['collections']) =>
  collections.length > 0 &&
  collections.reduce((sum, c) => sum + c.items?.length ?? 0, 0) > 0
