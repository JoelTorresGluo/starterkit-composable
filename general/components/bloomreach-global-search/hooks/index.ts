import { BLOOMREACH_CONSTANT } from '../../global-search-shared'
type HistoryItem = {
  id: string
  label: string
}

function isLocalStorageSupported(): boolean {
  try {
    localStorage.setItem(BLOOMREACH_CONSTANT.LOCAL_STORAGE_KEY_TEST, '')
    localStorage.removeItem(BLOOMREACH_CONSTANT.LOCAL_STORAGE_KEY_TEST)
    return true
  } catch (error) {
    console.error('LocalStorage is not supported:', error)
    return false
  }
}

function getLocalStorage(key: string) {
  if (!isLocalStorageSupported()) {
    return {
      setItem() {},
      getItem() {
        return []
      },
    }
  }

  return {
    setItem(items: HistoryItem[]): void {
      try {
        window.localStorage.setItem(key, JSON.stringify(items))
      } catch (error) {
        console.error('Error saving to LocalStorage:', error)
      }
    },
    getItem(): HistoryItem[] {
      const items = window.localStorage.getItem(key)
      try {
        return items ? (JSON.parse(items) as HistoryItem[]) : []
      } catch (error) {
        console.error('Error reading from LocalStorage:', error)
        return []
      }
    },
  }
}
//listado de busquedas recientes para usar como sugerencia
//Funciona como una pila con limite 5, una vez superado el limite el primer elemento agregado se elimina (FIFO)
export const useRecentSearches = ({
  key,
  limit = 5,
}: {
  key: string
  limit: number
}) => {
  const storage = getLocalStorage(key)

  const onAdd = (query: string): void => {
    const existingItems = storage.getItem()
    const newRecentSearches = [{ id: query, label: query }, ...existingItems]
    storage.setItem(newRecentSearches)
  }

  const removeRecentSearch = (id: string): void => {
    const existingItems = storage.getItem()
    const newRecentSearches = existingItems.filter((item) => item.id !== id)
    storage.setItem(newRecentSearches)
  }

  const updateRecentSearch = (query: string): void => {
    if (query) {
      removeRecentSearch(query)
      onAdd(query)
    }
  }

  const searchRecentSearches = (query: string = '') => {
    const existingItems = storage.getItem()
    if (!query) {
      return existingItems.slice(0, limit)
    }

    return existingItems
      .filter((item) => item.label.toLowerCase().includes(query.toLowerCase()))
      .slice(0, limit)
  }

  return {
    updateRecentSearch,
    removeRecentSearch,
    searchRecentSearches,
  }
}
