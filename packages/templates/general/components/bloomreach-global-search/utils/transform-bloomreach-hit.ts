import { Product } from '../../../../product/pages/bloomreach-product-listing/types'
import { SearchDataType } from '../../global-search-shared'

export const transformBloomreachHit = ({
  item,
  currency,
}: {
  item: Product
  currency: string
}) => {
  if (!item) return null

  return {
    type: SearchDataType.HIT,
    objectID: item?.pid ?? '',
    name: item.title,
    slug: item?.url ?? '',
    description: item?.data?.description,
    image: {
      //url: item?.data?.image_url ?? '',
      url: item?.thumb_image ?? '',
      label: item?.data?.description ?? '',
    },
    price: {
      //centAmount: item?.price?.[`price_${currency.toUpperCase()}`] ?? 0,
      centAmount: item?.price,
      currency: currency ?? '',
    },
    attributes: {
      normalized: {
        brand: item?.brand,
      },
    },
  }
}
