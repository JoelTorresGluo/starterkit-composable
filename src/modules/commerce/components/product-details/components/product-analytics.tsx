'use client'

import { analyticsTrackViewItem } from '@modules/general'
import { useAlgoliaInsights } from '@oriuminc/algolia'
import { ComposableProduct } from '@oriuminc/commerce-generic'
import { useEffect, useRef } from 'react'

export const ProductAnalytics = ({
  product,
}: {
  product: ComposableProduct
}) => {
  const eventSent = useRef(false)
  const { trackAlgoliaViewedObjectIDs } = useAlgoliaInsights()

  // Track View Item
  useEffect(() => {
    if (product && !eventSent.current) {
      eventSent.current = true
      analyticsTrackViewItem({ product })
      if (product?.id) {
        trackAlgoliaViewedObjectIDs(product?.id)
      }
    }
  }, [product])

  return null
}
