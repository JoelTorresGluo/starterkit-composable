import { Box } from '@chakra-ui/react'
import { ResultsEmpty } from '../../ui/results-empty'
import { useStores } from '../../hooks/use-stores'
import { useStoreLocatorRouter } from '../../hooks/use-store-locator-router'
import { ListItem } from './list-item'

export interface StoreListProps {
  notFound?: boolean
}

export const StoreList = ({ notFound }: StoreListProps) => {
  const { stores, bookmarksIds, bookmarkStore } = useStores()
  const storeLocatorRouter = useStoreLocatorRouter()
  const { store: selectedStore, goTo } = storeLocatorRouter

  if (notFound) {
    return (
      <ResultsEmpty
        root={{
          py: 10,
          px: 9,
        }}
        title='No Results Found'
        description='Sorry, we can’t seem to find any stores that match your search criteria. Please adjust your search criteria and try again.'
      />
    )
  }

  return (
    <Box>
      {stores?.map((store, idx) => {
        return (
          <ListItem
            key={store.id}
            router={storeLocatorRouter}
            selectedStore={selectedStore}
            store={store}
            isBookmarked={bookmarksIds.includes(store.id)}
            onSelect={(e) => {
              goTo('preview', store.id)
            }}
            onBookmark={({ store }) => bookmarkStore(store)}
          />
        )
      })}
    </Box>
  )
}
