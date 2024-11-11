import { atom } from 'jotai'
import algoliasearch from 'algoliasearch/lite'
import {
  STORE_LOCATOR_ALGOLIA_APP_ID,
  STORE_LOCATOR_ALGOLIA_API_KEY,
} from './components/constants'

export const searchClientAtom = atom(
  algoliasearch(STORE_LOCATOR_ALGOLIA_APP_ID, STORE_LOCATOR_ALGOLIA_API_KEY)
)
