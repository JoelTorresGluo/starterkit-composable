import React from 'react'
import { useIntl } from 'react-intl'
import { Box, useToken } from '@chakra-ui/react'
import { Store } from '../../_data'
import { HomeTag } from '../../ui/home-tag'
import { UseStoreLocatorRouter } from '../../hooks/use-store-locator-router'
import { StoreSummary } from '../store-summary'
import { BookmarkButton } from '../bookmark-button'

interface ListItemProps {
  store: Store
  isBookmarked: boolean
  onBookmark?: (args: { store: Store; isBookmarked: boolean }) => void
  onSelect: (event: { store: Store }) => void
  router: UseStoreLocatorRouter
  selectedStore?: Store
}

export const ListItem = ({
  store,
  isBookmarked,
  onBookmark,
  onSelect,
  router,
  selectedStore,
}: ListItemProps) => {
  const intl = useIntl()

  const [size2] = useToken('sizes', ['sizes.2'])

  return (
    <Box
      w='100%'
      cursor='pointer'
      borderTop='sm'
      // borderWidth={'xl'}
      p={['16px', null, '32px']}
      tabIndex={0}
      bg={selectedStore?.id === store.id ? 'shading.100' : 'transparent'}
      _focus={{
        outline: 'none',
        shadow: 'outline',
      }}
      onClick={() => onSelect({ store: store })}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSelect({ store: store })
        }
      }}
    >
      <Box position='relative'>
        {store.is_home && (
          <Box display='flex' mb='4'>
            <HomeTag>Home Store</HomeTag>
          </Box>
        )}

        <StoreSummary store={store} deps={{ router, intl }} />

        <BookmarkButton
          isBookmarked={isBookmarked}
          buttonProps={{
            position: 'absolute',
            top: `calc(${size2} * -1)`,
            right: `calc(${size2} * -1)`,
          }}
          onChange={() => {
            onBookmark?.({ store: store, isBookmarked })
          }}
        />
      </Box>
    </Box>
  )
}
