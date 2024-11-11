'use client'

import { Box, Flex, Spinner } from '@chakra-ui/react'
import { StripePaymentMethodMessaging } from '@modules/checkout/components/stripe-payment-method-messaging'
import { Price } from '@modules/commerce'
import { PRODUCT_CHANNEL } from '@modules/general'
import { api } from '@modules/trpc/react'
import { Locale, getCurrency } from '@oriuminc/base'
import { ComposableProduct } from '@oriuminc/commerce-generic'
import { useIntl } from 'react-intl'

export const ProductPrice = ({
  product,
  variantIndex,
}: {
  product: ComposableProduct
  variantIndex: number
}) => {
  const intl = useIntl()
  const { data, isFetching } = api.commerce.getProductBySlug.useQuery(
    {
      slug: product.slug,
      locale: intl.locale as Locale,
      currency: getCurrency(intl.locale),
      inventoryChannelKey: PRODUCT_CHANNEL,
    },
    {
      // Since this page is statically generated, and at that time the user context is empty,
      // the static/cached data does not consider if the user has a discount based on the customer group.
      // Always refetch on mount to perform query on the client - with user context set.
      refetchOnMount: 'always',
      initialData: product,
    }
  )

  const selectedVariant = data
    ? data.variants[variantIndex]
    : product.variants[variantIndex]

  return (
    <Box>
      <Flex gap={2} alignItems='center'>
        {isFetching ? (
          <Box minH='30px'>
            <Spinner size='xs' color='primary.500' />
          </Box>
        ) : (
          <Price
            price={selectedVariant?.price}
            textProps={{ textStyle: 'body-100-300' }}
            locale={intl.locale as Locale}
          />
        )}
      </Flex>
      <StripePaymentMethodMessaging
        rootProps={{ mt: 2 }}
        priceAmount={
          selectedVariant?.price?.current.amount
            ? selectedVariant?.price?.current.amount // stripe expects cent amount format
            : undefined
        }
      />
    </Box>
  )
}
