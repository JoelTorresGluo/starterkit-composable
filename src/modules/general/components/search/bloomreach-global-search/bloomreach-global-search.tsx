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

type BloomreachGlobalSearchProps = {
  clientId?: string
  userId?: string
}

const DynamicBloomreachGlobalSearch = dynamic<BloomreachGlobalSearchProps>(
  () =>
    import('./bloomreach-global-search-dynamic').then(
      (_module) => _module.BloomreachGlobalSearch
    ),
  {
    loading: () => <SearchPlaceholder />,
  }
)

export const BloomreachGlobalSearch = () => {
  const [dynamicLoad, setDynamicLoad] = useState(false)

  return dynamicLoad ? (
    <DynamicBloomreachGlobalSearch />
  ) : (
    <SearchPlaceholder inputProps={{ onFocus: () => setDynamicLoad(true) }} />
  )
}
