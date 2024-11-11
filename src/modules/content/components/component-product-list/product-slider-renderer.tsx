'use client'
import { FormatNumberOptions, useIntl } from 'react-intl'
import NextLink from 'next/link'

import { useAlgoliaInsights } from '@oriuminc/algolia'
import { getCurrency } from '@oriuminc/base'
import { ComposableProduct } from '@oriuminc/commerce-generic'
import { ProductSlider } from '@oriuminc/ui'

import { PREFETCH_PRODUCT_CARD_LINKS } from '@modules/general'

const BRAND_ATTR_NAME = 'brand'

interface ProductSliderRendererProps {
  title?: string | null
  subtitle?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  variant: 'default' | 'large'
  products: ComposableProduct[]
}

export const ProductSliderRenderer = (props: ProductSliderRendererProps) => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }
  const { trackAlgoliaClickedObjectIDs } = useAlgoliaInsights()

  const productList = props.products.map((product) => {
    const masterVariant = product.variants[0]
    const brand = masterVariant?.attributes?.find(
      (attr: any) => attr.name === BRAND_ATTR_NAME
    )?.value

    return {
      id: product.id,
      href: `/product/${product.slug}`,
      brand: brand ?? '',
      imageUrl: masterVariant?.images?.[0]?.url ?? '',
      price: intl.formatNumber(
        masterVariant?.price?.current.amount !== undefined
          ? masterVariant.price.current.amount / 100
          : 0,
        formatNumberOptions
      ),
      title: product.title ?? '',
    }
  })

  return (
    <ProductSlider
      productList={productList}
      prefetch={PREFETCH_PRODUCT_CARD_LINKS}
      onClickProduct={(product) => {
        trackAlgoliaClickedObjectIDs({ objectIDs: [product.id] })
      }}
      title={props.title ?? undefined}
      subtitle={props.subtitle ?? undefined}
      variant={props.variant === 'large' ? 'large' : 'default'}
      callToAction={
        props.ctaLabel && props.ctaHref
          ? {
              children: props.ctaLabel,
              as: NextLink,
              // @ts-ignore
              href: props.ctaHref,
            }
          : undefined
      }
    />
  )
}
