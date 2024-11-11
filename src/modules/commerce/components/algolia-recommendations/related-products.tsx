'use client'

import recommend from '@algolia/recommend'
import { useRelatedProducts } from '@algolia/recommend-react'
import { algoliaIndexNameResolver } from '@modules/general'
import { AlgoliaProduct } from '@oriuminc/algolia'
import { useIntl } from 'react-intl'
import { RecommendationSlider } from './recommendation-slider'

const recommendClient = recommend(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
)

export const RelatedProducts = ({
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

  let { recommendations, status } = useRelatedProducts<AlgoliaProduct>({
    indexName,
    recommendClient,
    objectIDs: productIDs,
    maxRecommendations: 15,
  })

  recommendations = recommendations?.filter(
    (item) => !productIDs.includes(item.objectID)
  )

  if (status === 'stalled' || !recommendations.length) return <></>

  return (
    <RecommendationSlider
      title={title}
      recommendations={recommendations}
      isLoading={status === 'loading'}
    />
  )
}
