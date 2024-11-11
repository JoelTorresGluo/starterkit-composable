import { ProductProjection } from '@commercetools/platform-sdk'
import { ComposableProduct } from '@oriuminc/commerce-generic'
import {
  commercetoolsAttributeToComposableAttribute,
  commercetoolsAvailabilityToStockQuantity,
  commercetoolsImageToComposableImage,
  commercetoolsPriceToComposablePrice,
} from './utils'
import { LocaleAndCurrency } from '@oriuminc/base'

export const commercetoolsProductProjectionToComposableProduct = ({
  productProjection,
  stockChannelId,
  locale,
  currency,
}: {
  productProjection: ProductProjection
  stockChannelId?: string
} & LocaleAndCurrency): ComposableProduct => {
  const masterVariantPrice =
    productProjection.masterVariant.price ??
    productProjection.masterVariant.prices?.find(
      (price) => price.value.currencyCode === currency
    )
  return {
    id: productProjection.id,
    key: productProjection.key,
    sku: productProjection.masterVariant.sku ?? '',
    slug: productProjection.slug[locale] ?? '',
    title: productProjection.name[locale] ?? '',
    description: productProjection.description?.[locale] ?? '',
    categories: productProjection.categories.map((category) => ({
      id: category.id,
      key: category.obj?.key,
      name: category.obj?.name[locale] ?? '',
      slug: category.obj?.slug[locale] ?? '',
    })),
    variants: [
      {
        id: productProjection.masterVariant.id.toString(),
        sku: productProjection.masterVariant.sku,
        title: productProjection.name[locale] ?? '',
        parentId: productProjection.id,
        price: masterVariantPrice
          ? commercetoolsPriceToComposablePrice(masterVariantPrice)
          : undefined,
        images: productProjection.masterVariant.images?.map(
          commercetoolsImageToComposableImage
        ),
        attributes: productProjection.masterVariant.attributes?.map(
          commercetoolsAttributeToComposableAttribute
        ),
        stockQuantity: productProjection.masterVariant.availability
          ? commercetoolsAvailabilityToStockQuantity({
              availability: productProjection.masterVariant.availability,
              channelId: stockChannelId,
            })
          : undefined,
      },
      ...productProjection.variants.map((variant) => {
        const variantPrice =
          variant.price ??
          variant.prices?.find((price) => price.value.currencyCode === currency)
        return {
          id: variant.id.toString(),
          sku: variant.sku,
          title: productProjection.name[locale] ?? '',
          parentId: productProjection.id,
          price: variantPrice
            ? commercetoolsPriceToComposablePrice(variantPrice)
            : undefined,
          images: variant.images?.map(commercetoolsImageToComposableImage),
          attributes: variant.attributes?.map(
            commercetoolsAttributeToComposableAttribute
          ),
          stockQuantity: variant.availability
            ? commercetoolsAvailabilityToStockQuantity({
                availability: variant.availability,
                channelId: stockChannelId,
              })
            : undefined,
        }
      }),
    ],
    images: productProjection.masterVariant.images?.map(
      commercetoolsImageToComposableImage
    ),
    seo: {
      title: productProjection.metaTitle?.[locale],
      description: productProjection.metaDescription?.[locale],
      keywords: productProjection.metaKeywords?.[locale],
    },
  }
}
