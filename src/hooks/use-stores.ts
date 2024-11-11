import { useAtom } from 'jotai'
import { bookmarksAtom, Store, storesAtom } from '../_data'
import { useCallback, useMemo } from 'react'

export const useStores = () => {
  const [stores, setStores] = useAtom(storesAtom)
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom)

  const bookmarksIds = useMemo(
    () => bookmarks.map((bookmark) => bookmark.id),
    [bookmarks]
  )

  const bookmarkStore = useCallback(
    (store: Store) => {
      const isBookmarked = bookmarksIds.includes(store.id)
      setBookmarks((elements) => {
        const items = [...elements]
        if (isBookmarked) {
          const index = items.findIndex((item) => item.id === store.id)
          items.splice(index, 1)
          return items
        }
        items.push(store)
        return items
      })
    },
    [setBookmarks, bookmarksIds]
  )

  return {
    quantity: stores?.length ?? 0,
    setStores,
    setBookmarks,
    bookmarkStore,
    stores,
    bookmarks,
    bookmarksIds,
  }
}
