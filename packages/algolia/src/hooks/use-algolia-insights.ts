'use client'

import { getCurrency, useLocalStorage } from '@oriuminc/base'
import { useCallback, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import aa, { InsightsMethodMap } from 'search-insights'

interface BaseHitProps {
  [key: string]: any
}

interface NormalizedOrder {
  items: {
    queryID?: string
    id: number | string
    price: number | string
    discount: number | string
    quantity: number | string
  }[]
  total: number | string
}

export enum ALGOLIA_TRACK_EVENT_NAME {
  CLICKED_OBJECT_IDS_AFTER_SEARCH = 'clickedObjectIDsAfterSearch',
  CLICKED_OBJECT_IDS = 'clickedObjectIDs',
  CLICKED_FILTERS = 'clickedFilters',
  CONVERTED_OBJECT_IDS_AFTER_SEARCH = 'convertedObjectIDsAfterSearch',
  CONVERTED_OBJECT_IDS = 'convertedObjectIDs',
  CONVERTED_FILTERS = 'convertedFilters',
  ADDED_TO_CART_OBJECT_IDS_AFTER_SEARCH = 'addedToCartObjectIDsAfterSearch',
  ADDED_TO_CART_OBJECT_IDS = 'addedToCartObjectIDs',
  PURCHASED_OBJECT_IDS_AFTER_SEARCH = 'purchasedObjectIDsAfterSearch',
  PURCHASED_OBJECT_IDS = 'purchasedObjectIDs',
  VIEWED_OBJECT_IDS = 'viewedObjectIDs',
  VIEWED_FILTERS = 'viewedFilters',
}

export enum ALGOLIA_TRACK_EVENT_DESCRIPTION {
  PRODUCT_CLICKED = 'Product Clicked',
  PRODUCT_ADDED_TO_WISHLIST = 'Product Added To Wishlist',
  PRODUCT_ADDED_TO_CART = 'Product Added to Bag',
  CHECKOUT_SUCCESS = 'Checkout Success',
  PRODUCT_VIEWED_CART_PAGE = 'Product Viewed - Cart Page',
  PRODUCT_VIEWED_CART_DRAWER = 'Product Viewed - Cart Drawer',
  PRODUCT_VIEWED = 'Product Viewed',
  HITS_VIEWED = 'Hits Viewed',
  CATEGORY_VIEWED = 'Category Viewed',
  FILTER_APPLIED = 'Filter Applied',
}

export const useAlgoliaInsights = () => {
  const { locale } = useIntl()
  const currency = getCurrency(locale)
  const isUsingAlgolia = useMemo(
    () => Boolean(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID),
    []
  )
  const useAlgoliaAutomaticInsights = useMemo(
    () =>
      isUsingAlgolia &&
      Boolean(process.env.NEXT_PUBLIC_ALGOLIA_USE_AUTOMATIC_INSIGHTS),
    [isUsingAlgolia]
  )
  const algoliaIndexName = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_ALGOLIA_BASE_INDEX}_${process.env.NEXT_PUBLIC_BRAND_NAME}_${locale}`
  }, [locale])

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
      aa('init', {
        appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
        apiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
      })
    }
  }, [])

  const trackAlgoliaEvent = useCallback(
    (
      eventName: keyof InsightsMethodMap,
      eventProperties: Record<string, any>
    ) => {
      if (isUsingAlgolia) aa(eventName, eventProperties)
    },
    [isUsingAlgolia]
  )

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/clicked-object-ids-after-search/#about-this-method
   */
  const trackAlgoliaClickedObjectIDAfterSearch = (hit: BaseHitProps) =>
    trackAlgoliaEvent(
      ALGOLIA_TRACK_EVENT_NAME.CLICKED_OBJECT_IDS_AFTER_SEARCH,
      {
        eventName: ALGOLIA_TRACK_EVENT_DESCRIPTION.PRODUCT_CLICKED,
        index: algoliaIndexName,
        queryID: hit.__queryID || '',
        objectIDs: [hit.objectID],
        positions: [hit.__position],
      }
    )

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/clicked-object-ids/#about-this-method
   */
  const trackAlgoliaClickedObjectIDs = ({
    objectIDs,
  }: {
    objectIDs: string[]
  }) =>
    trackAlgoliaEvent(ALGOLIA_TRACK_EVENT_NAME.CLICKED_OBJECT_IDS, {
      index: algoliaIndexName,
      eventName: ALGOLIA_TRACK_EVENT_DESCRIPTION.PRODUCT_CLICKED,
      objectIDs,
    })

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/clicked-filters/#about-this-method
   */
  const trackAlgoliaClickedFilters = ({ filters }: { filters: string[] }) =>
    trackAlgoliaEvent(ALGOLIA_TRACK_EVENT_NAME.CLICKED_FILTERS, {
      index: algoliaIndexName,
      eventName: ALGOLIA_TRACK_EVENT_DESCRIPTION.FILTER_APPLIED,
      filters,
    })

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/converted-object-ids-after-search/#about-this-method
   */
  const trackAlgoliaConvertedObjectIDsAfterSearch = ({
    eventName,
    objectIDs,
    queryID,
  }: {
    eventName: string
    objectIDs: string[]
    queryID: string
  }) =>
    trackAlgoliaEvent(
      ALGOLIA_TRACK_EVENT_NAME.CONVERTED_OBJECT_IDS_AFTER_SEARCH,
      {
        index: algoliaIndexName,
        eventName,
        objectIDs,
        queryID,
      }
    )

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/converted-object-ids/#about-this-method
   */
  const trackAlgoliaConvertedObjectIDs = ({
    eventName,
    objectIDs,
  }: {
    eventName: string
    objectIDs: string[]
  }) =>
    trackAlgoliaEvent(ALGOLIA_TRACK_EVENT_NAME.CONVERTED_OBJECT_IDS, {
      index: algoliaIndexName,
      eventName,
      objectIDs,
    })

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/converted-filters/#about-this-method
   */
  const trackAlgoliaConvertedFilters = ({
    filters,
    eventName,
  }: {
    filters: string[]
    eventName?: string
  }) =>
    trackAlgoliaEvent(ALGOLIA_TRACK_EVENT_NAME.CONVERTED_FILTERS, {
      index: algoliaIndexName,
      eventName:
        eventName || ALGOLIA_TRACK_EVENT_DESCRIPTION.PRODUCT_ADDED_TO_CART,
      filters,
    })

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/added-to-cart-object-ids-after-search/#about-this-method
   */
  const trackAlgoliaAddedToCartObjectIDsAfterSearch = ({
    objectIDs,
    queryID,
  }: {
    objectIDs: string[]
    queryID: string
  }) =>
    trackAlgoliaEvent(
      ALGOLIA_TRACK_EVENT_NAME.ADDED_TO_CART_OBJECT_IDS_AFTER_SEARCH,
      {
        index: algoliaIndexName,
        eventName: ALGOLIA_TRACK_EVENT_DESCRIPTION.PRODUCT_ADDED_TO_CART,
        objectIDs,
        queryID,
      }
    )

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/added-to-cart-object-ids/#about-this-method
   */
  const trackAlgoliaAddedToCartObjectIDs = (
    objectID: string | string[],
    customEventName?: string
  ) =>
    trackAlgoliaEvent(ALGOLIA_TRACK_EVENT_NAME.ADDED_TO_CART_OBJECT_IDS, {
      index: algoliaIndexName,
      eventName:
        customEventName ||
        ALGOLIA_TRACK_EVENT_DESCRIPTION.PRODUCT_ADDED_TO_CART,
      objectIDs: typeof objectID === 'string' ? [objectID] : objectID,
    })

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/purchased-object-ids-after-search/#about-this-method
   */
  const trackAlgoliaPurchasedObjectIDsAfterSearch = (order: NormalizedOrder) =>
    trackAlgoliaEvent(
      ALGOLIA_TRACK_EVENT_NAME.PURCHASED_OBJECT_IDS_AFTER_SEARCH,
      {
        index: algoliaIndexName,
        eventName: ALGOLIA_TRACK_EVENT_DESCRIPTION.CHECKOUT_SUCCESS,
        objectIDs: order?.items.map((item: any) => item.id),
        objectData: order?.items.map((item: any) => ({
          queryID: item.queryID,
          price: item.price,
          discount: item.discount ? item.price - item.discount : 0,
          quantity: item.quantity,
        })),
        value: order.total,
        currency,
      }
    )

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/purchased-object-ids/#about-this-method
   */
  const trackAlgoliaPurchasedObjectIDs = (order: NormalizedOrder) =>
    trackAlgoliaEvent(ALGOLIA_TRACK_EVENT_NAME.PURCHASED_OBJECT_IDS, {
      index: algoliaIndexName,
      eventName: ALGOLIA_TRACK_EVENT_DESCRIPTION.CHECKOUT_SUCCESS,
      objectIDs: order?.items.map((item: any) => item.id),
      objectData: order?.items.map((item: any) => ({
        price: item.price,
        discount: item.discount ? item.price - item.discount : 0,
        quantity: item.quantity,
      })),
      value: order.total,
      currency,
    })

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/viewed-object-ids/#about-this-method
   */
  const trackAlgoliaViewedObjectIDs = (
    objectID: string | string[],
    customEventName?: string
  ) =>
    trackAlgoliaEvent(ALGOLIA_TRACK_EVENT_NAME.VIEWED_OBJECT_IDS, {
      index: algoliaIndexName,
      eventName:
        customEventName || ALGOLIA_TRACK_EVENT_DESCRIPTION.PRODUCT_VIEWED,
      objectIDs: typeof objectID === 'string' ? [objectID] : objectID,
    })

  /**
   * https://www.algolia.com/doc/api-reference/api-methods/viewed-filters/#about-this-method
   */
  const trackAlgoliaViewedFilters = ({
    eventName,
    filters,
  }: {
    eventName?: string
    filters: string[]
  }) =>
    trackAlgoliaEvent(ALGOLIA_TRACK_EVENT_NAME.VIEWED_FILTERS, {
      index: algoliaIndexName,
      eventName: eventName || ALGOLIA_TRACK_EVENT_DESCRIPTION.CATEGORY_VIEWED,
      filters,
    })

  /** Query-Products cache */

  const [storageValue, setStorageValue, clearStorage] = useLocalStorage<
    Record<string, string[]>
  >('algolia_query_products', {})

  const addQueryProductToStore = useCallback(
    ({ queryID, objectID }: { queryID: string; objectID: string }) => {
      const current = { ...(storageValue ?? {}) }
      let currentQueryProducts = current[queryID] ?? []

      // reset after 20 queries, to avoid using too much resources
      if (Object.keys(current).length > 20) {
        currentQueryProducts = []
      }

      if (currentQueryProducts.includes(objectID)) return // already included, do nothing
      setStorageValue({
        ...current,
        [queryID]: [...currentQueryProducts, objectID],
      })
    },
    [storageValue, setStorageValue]
  )

  const removeQueryProductFromStore = useCallback(
    ({ objectID }: { objectID: string }) => {
      const current = { ...(storageValue ?? {}) }
      const storageWithoutObjectIdArray = Object.entries(current).reduce<
        [string, string[]][]
      >((acc, [queryID, objectIds]) => {
        const remainingProductsQuery = objectIds.filter((id) => id !== objectID)
        if (remainingProductsQuery.length === 0) return acc
        return [...acc, [queryID, remainingProductsQuery]]
      }, [])
      setStorageValue(Object.fromEntries(storageWithoutObjectIdArray))
    },
    [storageValue, setStorageValue]
  )

  /**
   * Store to persist queryIds and its products from the PDP (after adding to cart)
   * all the way to checkout success where its used to send the purchasedObjectIDsAfterSearch event.
   * Uses local storage.
   */
  const queryProductCache = useMemo(() => {
    return {
      entries: storageValue,
      add: addQueryProductToStore,
      remove: removeQueryProductFromStore,
      clear: clearStorage,
    }
  }, [
    storageValue,
    addQueryProductToStore,
    removeQueryProductFromStore,
    clearStorage,
  ])

  return {
    trackAlgoliaEvent,
    trackAlgoliaClickedObjectIDAfterSearch,
    trackAlgoliaClickedObjectIDs,
    trackAlgoliaClickedFilters,
    trackAlgoliaConvertedObjectIDsAfterSearch,
    trackAlgoliaConvertedObjectIDs,
    trackAlgoliaConvertedFilters,
    trackAlgoliaAddedToCartObjectIDsAfterSearch,
    trackAlgoliaAddedToCartObjectIDs,
    trackAlgoliaPurchasedObjectIDsAfterSearch,
    trackAlgoliaPurchasedObjectIDs,
    trackAlgoliaViewedObjectIDs,
    trackAlgoliaViewedFilters,
    isUsingAlgolia,
    useAlgoliaAutomaticInsights,
    queryProductCache,
  }
}
