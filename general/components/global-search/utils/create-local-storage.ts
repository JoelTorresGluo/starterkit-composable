import { MaybePromise } from '@algolia/autocomplete-shared'
import { CreateRecentSearchesLocalStorageOptions } from '@algolia/autocomplete-plugin-recent-searches'
import { LOCAL_STORAGE_KEY_TEST } from '@oriuminc/algolia'

// This code is derived from Algolia's source code but is not exported,
// so it cannot be directly used. Therefore, it has been copied into our local code base to support a custom recent search plugin.
// Source:
// https://github.com/algolia/autocomplete/blob/next/packages/autocomplete-plugin-recent-searches/src/createLocalStorage.ts

type HistoryItem = {
  id: string
  label: string
}
type RecentSearchesItem = HistoryItem & {
  category?: string
}
type Storage<TItem extends RecentSearchesItem> = {
  onAdd(item: TItem): void
  onRemove(id: string): void
  getAll(query?: string): MaybePromise<Array<Highlighted<TItem>>>
}
type LocalStorageProps = {
  key: string
}
type Highlighted<TItem> = TItem & {
  _highlightResult: {
    label: {
      value: string
    }
  }
}
function isLocalStorageSupported() {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_TEST, '')
    localStorage.removeItem(LOCAL_STORAGE_KEY_TEST)

    return true
  } catch (error) {
    return false
  }
}

export function getLocalStorage<TItem>({ key }: LocalStorageProps) {
  if (!isLocalStorageSupported()) {
    return {
      setItem() {},
      getItem() {
        return []
      },
    }
  }

  return {
    setItem(items: TItem[]) {
      return window.localStorage.setItem(key, JSON.stringify(items))
    },
    getItem(): TItem[] {
      const items = window.localStorage.getItem(key)

      return items ? (JSON.parse(items) as TItem[]) : []
    },
  }
}

export type CreateLocalStorageProps<TItem extends HistoryItem> = Required<
  CreateRecentSearchesLocalStorageOptions<TItem>
>
export function createLocalStorage<TItem extends HistoryItem>({
  key,
  limit,
  search,
}: CreateLocalStorageProps<TItem>): Storage<TItem> {
  const storage = getLocalStorage<TItem>({ key })

  return {
    onAdd(item) {
      storage.setItem([item, ...storage.getItem()])
    },
    onRemove(id) {
      storage.setItem(storage.getItem().filter((x) => x.id !== id))
    },
    getAll(query = '') {
      return search({ query, items: storage.getItem(), limit }).slice(0, limit)
    },
  }
}
