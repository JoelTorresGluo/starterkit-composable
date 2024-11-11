'use client'

import { DynamicVariantSection } from '@modules/commerce'
import {
  ComposableProduct,
  getProductVariants,
} from '@oriuminc/commerce-generic'
import { useRouter, useSearchParams } from 'next/navigation'

export const VariantSelector = ({
  product,
  currentVariantIndex,
}: {
  product: ComposableProduct
  currentVariantIndex: number
}) => {
  const { variants, variantSectionTitle } = getProductVariants({
    product: product,
  })
  const router = useRouter()
  const searchParams = useSearchParams()

  const onChangeVariant = (targetVariantIndex: number) => {
    if (targetVariantIndex !== undefined) {
      router.push(
        `/product/${product.slug}/${targetVariantIndex}?${searchParams}`,
        {
          scroll: false,
        }
      )
    }
  }

  return (
    <>
      {variants && variants.length > 1 && (
        <DynamicVariantSection
          variantionName={variantSectionTitle ?? ''}
          value={currentVariantIndex ?? 0}
          variationOptions={variants}
          onChange={(opVariantId) => onChangeVariant(Number(opVariantId) || 0)}
        />
      )}
    </>
  )
}
