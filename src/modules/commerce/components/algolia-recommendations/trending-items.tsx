'use client'

import recommend from '@algolia/recommend'
import { useTrendingItems } from '@algolia/recommend-react'
import { algoliaIndexNameResolver } from '@modules/general'
import { AlgoliaProduct } from '@oriuminc/algolia'
import { useIntl } from 'react-intl'
import { RecommendationSlider } from './recommendation-slider'

const recommendClient = recommend(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
)

export const TrendingItems = ({
  title,
  productIDs = [],
}: {
  title: string
  productIDs?: string[]
}) => {
  const intl = useIntl()
  const indexName = algoliaIndexNameResolver({
    locale: intl.locale,
    sortBy: false,
  })

  let { recommendations, status } = useTrendingItems<AlgoliaProduct>({
    indexName,
    recommendClient,
  })

  recommendations = recommendations?.filter(
    (item) => !productIDs.includes(item.objectID)
  )

  if (status === 'stalled') return <></>

  return (
    <RecommendationSlider
      title={title}
      recommendations={recommendations}
      isLoading={status === 'loading'}
    />
  )
}
