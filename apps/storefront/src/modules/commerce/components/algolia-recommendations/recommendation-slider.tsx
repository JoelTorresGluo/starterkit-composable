'use client'

import { AlgoliaProduct, useAlgoliaInsights } from '@oriuminc/algolia'
import { getCurrency } from '@oriuminc/base'
import { ProductSlider } from '@oriuminc/ui'
import { FormatNumberOptions, useIntl } from 'react-intl'

export const RecommendationSlider = ({
  title,
  recommendations,
  isLoading = false,
}: {
  title: string
  recommendations: AlgoliaProduct[]
  isLoading?: boolean
}) => {
  const intl = useIntl()
  const { trackAlgoliaClickedObjectIDs } = useAlgoliaInsights()
  const currency = getCurrency(intl.locale)
  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  const productList = recommendations.map((product) => {
    return {
      id: product.objectID,
      href: `/product/${product.slug}`,
      title: product.name ?? '',
      brand: (product.attributes?.normalized?.brand as string) ?? '',
      imageUrl: product?.image?.url ?? '/img/image-placeholder.svg',
      price: intl.formatNumber(
        product.price?.centAmount !== undefined
          ? product.price?.centAmount / 100
          : 0,
        formatNumberOptions
      ),
    }
  })

  return (
    <ProductSlider
      productList={productList}
      onClickProduct={(product) => {
        trackAlgoliaClickedObjectIDs({ objectIDs: [product.id] })
      }}
      title={title}
      variant='default'
      overflow='hidden'
      containerProps={{
        py: 0,
        px: 0,
      }}
    />
  )
}
