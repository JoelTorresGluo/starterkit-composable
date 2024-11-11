'use client'

import { useMemo } from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { useComposable, UseCtConnector } from '@oriuminc/base'
import { ProductSlider } from '@oriuminc/ui'
import { ComposableCtProductList } from '@oriuminc/cms-generic'
import {
  ComposableProduct,
  PaginatedResponse,
} from '@oriuminc/commerce-generic'

const BRAND_ATTR_NAME = 'brand'

export const ComponentCtProductList = ({
  priority = false,
  productList,
  title,
  subtitle,
  ctaHref,
  ctaLabel,
  variant,
  useCtConnector,
  showPrice,
}: ComposableCtProductList & {
  priority?: boolean
  useCtConnector?: UseCtConnector
}) => {
  const router = useRouter()
  const intl = useIntl()
  const { currency } = useComposable()

  const ctConnector = useCtConnector?.({
    queryParam: 'skus',
    values: productList?.map((el) => el ?? '') ?? [],
  })

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  const _productList = useMemo(() => {
    // TODO: move this type into the UseCtConnector
    const results =
      (ctConnector?.data as PaginatedResponse<ComposableProduct> | undefined)
        ?.results ?? []
    return results.map((product) => {
      const masterVariant = product.variants[0]
      const brand = masterVariant?.attributes?.find(
        (attr: any) => attr.name === BRAND_ATTR_NAME
      )?.value

      return {
        id: product.id,
        href: `/product/${product.slug}`,
        brand: brand ?? '',
        imageUrl: masterVariant?.images?.[0]?.url ?? '',
        price:
          masterVariant?.price?.current.amount !== undefined
            ? intl.formatNumber(
                masterVariant.price.current.amount / 100,
                formatNumberOptions
              )
            : '',
        title: product.title ?? '',
      }
    })
  }, [currency, ctConnector?.data])

  return (
    <ProductSlider
      productList={_productList}
      title={title ?? undefined}
      subtitle={subtitle ?? undefined}
      variant={variant === 'large' ? 'large' : 'default'}
      callToAction={{
        children: ctaLabel,
        onClick: () => {
          if (!ctaHref) {
            return
          }

          router.push(ctaHref)
        },
      }}
    />
  )
}
