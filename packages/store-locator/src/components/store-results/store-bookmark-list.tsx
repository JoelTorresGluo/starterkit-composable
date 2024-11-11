import { Box } from '@chakra-ui/react'
import { ResultsEmpty } from '../../ui/results-empty'
import { useStores } from '../../hooks/use-stores'
import { useStoreLocatorRouter } from '../../hooks/use-store-locator-router'
import { ListItem } from './list-item'

export const StoreBookmarkList = () => {
  const { bookmarks, bookmarkStore } = useStores()
  const storeLocatorRouter = useStoreLocatorRouter()
  const { store: selectedStore, goTo } = storeLocatorRouter

  if (!bookmarks.length) {
    return (
      <ResultsEmpty
        root={{
          py: 10,
          px: 9,
        }}
        title='No Favorite Stores'
        description='To favorite a store, just tap the star button. Then all of your favorites will be listed here.'
      />
    )
  }

  return (
    <Box>
      {bookmarks.map((store, idx) => {
        return (
          <ListItem
            key={store.id}
            router={storeLocatorRouter}
            selectedStore={selectedStore}
            store={store}
            isBookmarked
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
