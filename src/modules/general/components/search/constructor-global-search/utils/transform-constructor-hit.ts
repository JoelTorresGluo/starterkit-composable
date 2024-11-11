import { Product } from '@constructor-io/constructorio-ui-autocomplete'
import { SearchDataType } from '../../shared'

export const transformConstructorHit = ({
  item,
  currency,
}: {
  item: Product
  currency: string
}) => {
  if (!item) return null

  return {
    type: SearchDataType.HIT,
    objectID: item?.result_id ?? '',
    name: item.value,
    slug: item?.data?.slug ?? '',
    description: item?.data?.description,
    image: {
      url: item?.data?.image_url ?? '',
      label: item?.data?.description ?? '',
    },
    price: {
      centAmount: item?.data?.[`price_${currency.toUpperCase()}`] ?? 0,
      currency: currency ?? '',
    },
    attributes: {
      normalized: {
        brand: item?.data?.brand,
      },
    },
  }
}
