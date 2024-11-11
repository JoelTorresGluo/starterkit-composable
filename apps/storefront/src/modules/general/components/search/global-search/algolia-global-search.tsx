import {
  AlgoliaIndexNameResolver,
  AlgoliaQuerySuggestionsIndexNameResolver,
} from '@oriuminc/base'
import algoliasearch from 'algoliasearch/lite'
import { Configure, InstantSearch } from 'react-instantsearch'
import { Search } from './search'
import { DEFAULT_CONFIG } from '../shared/constants'
import { useAlgoliaInsights } from '@oriuminc/algolia'
import { useComposable } from '@modules/general'
import { Suspense } from 'react'

const algoliaConfig = {
  appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  searchApiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY || '',
}

export const algoliaClient = algoliasearch(
  algoliaConfig.appId,
  algoliaConfig.searchApiKey
)

export const AlgoliaGlobalSearch = ({
  algoliaIndexNameResolver,
  algoliaQuerySuggestionsIndexNameResolver,
}: {
  algoliaIndexNameResolver: AlgoliaIndexNameResolver
  algoliaQuerySuggestionsIndexNameResolver: AlgoliaQuerySuggestionsIndexNameResolver
}) => {
  const { locale } = useComposable()
  const INDEX_NAME = algoliaIndexNameResolver({ locale })
  const QUERY_SUGGESTIONS_INDEX_NAME = algoliaQuerySuggestionsIndexNameResolver(
    { locale }
  )
  const { useAlgoliaAutomaticInsights } = useAlgoliaInsights()
  return (
    <InstantSearch
      searchClient={algoliaClient}
      indexName={INDEX_NAME}
      insights={useAlgoliaAutomaticInsights}
    >
      <Suspense fallback={<></>}>
        <Search
          searchClient={algoliaClient}
          indexName={INDEX_NAME}
          querySuggestionsIndexName={QUERY_SUGGESTIONS_INDEX_NAME}
        />
      </Suspense>
      {/* @ts-ignore */}
      <Configure hitsPerPage={DEFAULT_CONFIG.hitsPerPage} />
    </InstantSearch>
  )
}
