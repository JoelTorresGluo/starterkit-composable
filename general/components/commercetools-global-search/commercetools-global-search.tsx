'use client'

import { InputProps } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { SearchInput } from '../global-search-shared/search-input'

const SearchPlaceholder = ({ inputProps }: { inputProps?: InputProps }) => (
  <SearchInput
    key='searchInput'
    buttonProps={{ disabled: true }}
    inputProps={inputProps}
  />
)

type CommercetoolsGlobalSearchProps = {
  isLoggedIn?: boolean
  channelId?: string
}

const DynamicCommercetoolsGlobalSearch =
  dynamic<CommercetoolsGlobalSearchProps>(
    () =>
      import('./commercetools-global-search-dynamic').then(
        (_module) => _module.CommercetoolsGlobalSearch
      ),
    {
      loading: () => <SearchPlaceholder />,
    }
  )

export const CommercetoolsGlobalSearch = ({
  isLoggedIn,
  channelId,
}: CommercetoolsGlobalSearchProps) => {
  const [dynamicLoad, setDynamicLoad] = useState(false)

  return dynamicLoad ? (
    <DynamicCommercetoolsGlobalSearch
      isLoggedIn={isLoggedIn}
      channelId={channelId}
    />
  ) : (
    <SearchPlaceholder inputProps={{ onFocus: () => setDynamicLoad(true) }} />
  )
}
