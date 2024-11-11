import { Divider, Stack, useBreakpointValue } from '@chakra-ui/react'
import { EXCLUDED_PRODUCT_ATTRIBUTES } from '@modules/commerce'
import { IMAGE_PLACEHOLDER, useComposable } from '@modules/general'
import { getCurrency } from '@oriuminc/base'
import {
  ComposableOrder,
  getFormattedAttributes,
} from '@oriuminc/commerce-generic'
import {
  HorizontalProductCard2,
  HorizontalProductCard2Props,
} from '@oriuminc/ui'
import { useRouter } from 'next/navigation'
import { FormatNumberOptions, useIntl } from 'react-intl'

interface OrderItemsProps {
  items: ComposableOrder['items']
}

export const OrderItems = ({ items }: OrderItemsProps) => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const router = useRouter()
  const { path } = useComposable()
  const productCartSize = useBreakpointValue({ base: 'sm', md: 'lg' })

  const orderCurrency =
    items[0]?.variant.price?.current.currencyCode || currency

  const formatNumberOptions: FormatNumberOptions = {
    currency: orderCurrency,
    style: 'currency',
  }

  return (
    <Stack divider={<Divider />} spacing='2'>
      {items?.map((item) => {
        const brand = item.variant?.attributes?.find(
          (attr) => attr.name === 'brand'
        )?.value
        const regularPrice = item.variant?.price?.original.amount!
        const currentPrice = item.variant?.price?.current.amount!
        return (
          <HorizontalProductCard2
            key={item.itemId}
            columns={4}
            size={productCartSize as HorizontalProductCard2Props['size']}
            image={{
              src: item.variant?.images?.[0]?.url || IMAGE_PLACEHOLDER,
              alt: item.title ?? '',
              onClickImage: () =>
                router.push(path.getPDP({ slug: item.slug! })),
            }}
            name={item.title || ''}
            brand={brand}
            details={getFormattedAttributes({
              attributes: item.variant?.attributes,
              excludeAttributes: EXCLUDED_PRODUCT_ATTRIBUTES,
            })}
            quantity={item.quantity}
            regularPrice={intl.formatNumber(
              regularPrice / 100,
              formatNumberOptions
            )}
            salePrice={
              regularPrice > currentPrice
                ? intl.formatNumber(currentPrice / 100, formatNumberOptions)
                : undefined
            }
          />
        )
      })}
    </Stack>
  )
}
