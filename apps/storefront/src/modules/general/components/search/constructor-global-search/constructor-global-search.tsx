'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { SearchInput } from '../shared/search-input'
import { InputProps } from '@chakra-ui/react'

const SearchPlaceholder = ({ inputProps }: { inputProps?: InputProps }) => (
  <SearchInput
    key='searchInput'
    buttonProps={{ disabled: true }}
    inputProps={inputProps}
  />
)

type ConstructorGlobalSearchProps = {
  clientId?: string
  userId?: string
}

const DynamicConstructorGlobalSearch = dynamic<ConstructorGlobalSearchProps>(
  () =>
    import('./constructor-global-search-dynamic').then(
      (_module) => _module.ConstructorGlobalSearch
    ),
  {
    loading: () => <SearchPlaceholder />,
  }
)

export const ConstructorGlobalSearch = ({ userId }: { userId?: string }) => {
  const [dynamicLoad, setDynamicLoad] = useState(false)

  return dynamicLoad ? (
    <DynamicConstructorGlobalSearch userId={userId} />
  ) : (
    <SearchPlaceholder inputProps={{ onFocus: () => setDynamicLoad(true) }} />
  )
}
