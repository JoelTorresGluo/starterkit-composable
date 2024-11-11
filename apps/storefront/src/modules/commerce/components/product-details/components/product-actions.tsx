'use client'

import { Box, Button, HStack, Stack } from '@chakra-ui/react'
import { useCart, usePDPSearchParams } from '@modules/commerce'
import { PRODUCT_CHANNEL, useHandleError } from '@modules/general'
import { api } from '@modules/trpc/react'
import { useAlgoliaInsights } from '@oriuminc/algolia'
import { Locale, getCurrency } from '@oriuminc/base'
import { ComposableProduct } from '@oriuminc/commerce-generic'
import { AlertBox } from '@oriuminc/templates/product'
import { QuantityPicker2, useToast } from '@oriuminc/ui'
import { useState } from 'react'
import { useIntl } from 'react-intl'
import { AddToWhislistButton } from './add-to-wishlist-button'
import { VariantSelector } from './variant-selector'

export const ProductActions = ({
  product,
  variantIndex,
}: {
  product: ComposableProduct
  variantIndex: number
}) => {
  const intl = useIntl()
  const toast = useToast()
  const { createHandleError } = useHandleError()
  const { addCartItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const {
    trackAlgoliaAddedToCartObjectIDsAfterSearch,
    trackAlgoliaAddedToCartObjectIDs,
    trackAlgoliaConvertedFilters,
    queryProductCache,
  } = useAlgoliaInsights()
  const searchQueryParams = usePDPSearchParams()

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

  const isOutOfStock =
    selectedVariant.stockQuantity !== undefined &&
    selectedVariant.stockQuantity === 0

  const handleAddToCart = () => {
    if (!product?.id) {
      return
    }

    addCartItem.mutate(
      {
        productId: product.id,
        variantId: selectedVariant ? selectedVariant.id.toString() : undefined,
        quantity,
      },
      {
        onSuccess: () => {
          if (searchQueryParams.queryID) {
            queryProductCache.add({
              queryID: searchQueryParams.queryID,
              objectID: product.id,
            })

            trackAlgoliaAddedToCartObjectIDsAfterSearch({
              objectIDs: [product.id],
              queryID: searchQueryParams.queryID,
            })

            if (searchQueryParams.filters && searchQueryParams.filters.length) {
              trackAlgoliaConvertedFilters({
                filters: searchQueryParams.filters,
              })
            }
          } else {
            trackAlgoliaAddedToCartObjectIDs(product.id)
          }

          toast({
            status: 'success',
            title: intl.formatMessage({ id: 'cart.title.myBag' }),
            description: intl.formatMessage(
              { id: 'cart.item.add.success' },
              { name: product.title }
            ),
          })

          //Bloomreach track for Add to Bag
          // @ts-ignore
          if (window.BrTrk !== undefined) {
            // @ts-ignore
            window.BrTrk.getTracker().logEvent('cart', 'click-add', {
              prod_id: product.id,
              sku: selectedVariant?.sku,
            })
          }
        },
        onError: createHandleError(),
      }
    )
  }

  return (
    <>
      <Button
        my='6'
        mx='0'
        size='lg'
        variant='solid'
        w='full'
        onClick={() => handleAddToCart()}
        isDisabled={isOutOfStock || isFetching}
        isLoading={addCartItem.isPending}
      >
        {intl.formatMessage({ id: 'action.addToBag' })}
      </Button>
      <HStack
        spacing={{ base: 4, md: 8 }}
        align='flex-end'
        justify='space-evenly'
      >
        <Box flex='1'>
          <QuantityPicker2
            value={quantity}
            onChange={(val) => setQuantity(val)}
            min={1}
            max={30}
            buttonProps={{
              size: 'sm',
            }}
          />
        </Box>
        <Box flex='1'>
          <AddToWhislistButton productId={product.id} />
        </Box>
      </HStack>
      <AlertBox
        description={intl.formatMessage({
          id: isOutOfStock
            ? 'product.outOfStock.info'
            : 'product.shippingAndReturn.info',
        })}
        rootProps={{
          ...(isOutOfStock && {
            bg: '#FDE5D8',
            status: 'error',
          }),
        }}
      />
      <Stack my='10' mx='0' direction='column' spacing={{ base: 6, md: 8 }}>
        <VariantSelector product={product} currentVariantIndex={variantIndex} />
      </Stack>
    </>
  )
}
