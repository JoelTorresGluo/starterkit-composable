import { ProductProjection } from '@commercetools/platform-sdk'
import { SearchDataType } from '../../global-search-shared'

export const transformCommercetoolsHit = ({
  item,
  locale,
  currency,
  index,
  isLoggedIn,
}: {
  item: ProductProjection
  locale: string
  currency: string
  index: number
  isLoggedIn?: boolean
}) => {
  const { images, price, prices, attributes } = item.masterVariant

  return {
    index,
    subType: 'product',
    type: SearchDataType.HIT,
    objectID: item.id,
    name: item.name[locale] ?? '',
    slug: item.slug[locale] ?? '',
    description: item.description?.[locale] ?? '',
    image: images?.[0],
    price: isLoggedIn
      ? {
          centAmount: price?.discounted
            ? price?.discounted.value.centAmount
            : price?.value.centAmount,
          currency: currency ?? '',
        }
      : undefined,
    attributes: {
      normalized: {
        brand:
          attributes?.find((attr: any) => attr.name === 'brand')?.value ?? '',
      },
    },
  }
}
