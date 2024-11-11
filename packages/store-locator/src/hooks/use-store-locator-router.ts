import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useStores } from './use-stores'

export type StoreLocatorRouterValue =
  | 'map'
  | 'results'
  | 'filters'
  | 'details'
  | 'preview'

export type UseStoreLocatorRouter = ReturnType<typeof useStoreLocatorRouter>

export const useStoreLocatorRouter = () => {
  let value: StoreLocatorRouterValue = 'map'
  const router = useRouter()
  const { stores } = useStores()
  const results = `${router.query.results?.toString() || ''}`
  const previewId = `${router.query.preview?.toString() || ''}`
  const detailsId = `${router.query.details?.toString() || ''}`
  const filters = `${router.query.filters?.toString() || ''}`

  if (results) {
    value = 'results'
  } else if (previewId) {
    value = 'preview'
  } else if (detailsId) {
    value = 'details'
  } else if (filters) {
    value = 'filters'
  }

  const goTo = useCallback(
    (value: StoreLocatorRouterValue, param: string = 'true') => {
      if (value === 'map') {
        router.push(
          {
            query:
              param === 'true'
                ? undefined
                : {
                    view: param,
                  },
          },
          undefined,
          {
            scroll: false,
          }
        )

        return
      }

      router.push(
        {
          query: {
            [value]: param,
          },
        },
        undefined,
        {
          scroll: false,
        }
      )
    },
    [router]
  )

  const store = useMemo(() => {
    let id: string | undefined = undefined

    if (value === 'details') {
      id = detailsId
    }

    if (value === 'preview') {
      id = previewId
    }

    if (!id) {
      return undefined
    }

    return stores?.find((store) => store.id === id)
  }, [stores, detailsId, previewId, value])

  return {
    value,
    previewId,
    detailsId,
    goTo,
    store: store,
  }
}
