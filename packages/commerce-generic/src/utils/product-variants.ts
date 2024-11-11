import { ComposableAttribute, ComposableProduct } from '../types'

export const getProductVariants = ({
  product,
}: {
  product?: ComposableProduct | null
}) => {
  if (!product) return {}
  const [masterVariant, ...otherVariants] = product.variants

  // exclude "product level attributes" (the ones with equal value for all variants)
  const distinctAttributesNames = masterVariant.attributes
    ?.filter((masterVariantAttribute) => {
      return otherVariants.some((variant) =>
        variant.attributes?.find(
          (variantAttribute) =>
            variantAttribute.name === masterVariantAttribute.name &&
            variantAttribute.value !== masterVariantAttribute.value
        )
      )
    })
    .map((attribute) => attribute.name)

  const variants = product.variants.map((variant) => {
    const relevantVariantAttributes = variant.attributes?.filter((attribute) =>
      distinctAttributesNames?.includes(attribute.name)
    )
    return {
      variantId: variant.id,
      label: relevantVariantAttributes
        ?.map((attribute) => attribute.value)
        .join(' '),
      stock: variant.stockQuantity,
      outOfStock: Boolean(
        variant.stockQuantity !== undefined && variant.stockQuantity === 0
      ),
    }
  })

  const variantSectionTitle = distinctAttributesNames
    ?.map((variantName) => {
      const name = variantName.replace(/-/g, ' ')
      return name.charAt(0).toUpperCase() + name.slice(1)
    })
    .join('/')

  return { variants, variantSectionTitle }
}

export const getFormattedAttributes = ({
  attributes = [],
  excludeAttributes = [],
}: {
  attributes?: ComposableAttribute[]
  excludeAttributes?: string[]
}) => {
  return attributes
    ?.filter(
      (attribute) =>
        Boolean(attribute.value) && !excludeAttributes.includes(attribute.name)
    )
    .map((attribute) => {
      const formatedName = attribute.name
        ?.split('-')
        .map((v) => v.charAt(0).toUpperCase() + v.slice(1))
        .join(' ')
      return { name: formatedName, value: attribute.value }
    })
}
