'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { InputProps } from '@chakra-ui/react'
import {
  AlgoliaIndexNameResolver,
  AlgoliaQuerySuggestionsIndexNameResolver,
} from '@oriuminc/base'
import { SearchInput } from '../global-search-shared/search-input'

const SearchPlaceholder = ({ inputProps }: { inputProps?: InputProps }) => (
  <SearchInput
    key='searchInput'
    buttonProps={{ disabled: true }}
    inputProps={inputProps}
  />
)

type AlgoliaGlobalSearchProps = {
  algoliaIndexNameResolver: AlgoliaIndexNameResolver
  algoliaQuerySuggestionsIndexNameResolver: AlgoliaQuerySuggestionsIndexNameResolver
}

const DynamicAlgoliaGlobalSearch = dynamic<AlgoliaGlobalSearchProps>(
  () =>
    import('./algolia-global-search').then(
      (_module) => _module.AlgoliaGlobalSearch
    ),
  {
    loading: () => <SearchPlaceholder />,
  }
)

export const GlobalSearch = ({
  algoliaIndexNameResolver,
  algoliaQuerySuggestionsIndexNameResolver,
}: {
  algoliaIndexNameResolver: AlgoliaIndexNameResolver
  algoliaQuerySuggestionsIndexNameResolver: AlgoliaQuerySuggestionsIndexNameResolver
}) => {
  const [dynamicLoad, setDynamicLoad] = useState(false)

  return dynamicLoad ? (
    <DynamicAlgoliaGlobalSearch
      algoliaIndexNameResolver={algoliaIndexNameResolver}
      algoliaQuerySuggestionsIndexNameResolver={
        algoliaQuerySuggestionsIndexNameResolver
      }
    />
  ) : (
    <SearchPlaceholder inputProps={{ onFocus: () => setDynamicLoad(true) }} />
  )
}
