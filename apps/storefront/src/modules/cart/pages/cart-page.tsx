'use client'

import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  List,
  ListItem,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { CartSummary, CheckoutButton, CheckoutButtonEnum } from '@modules/cart'
import {
  EXCLUDED_PRODUCT_ATTRIBUTES,
  RelatedProducts,
  useCart,
} from '@modules/commerce'
import {
  IMAGE_PLACEHOLDER,
  useComposable,
  useHandleError,
} from '@modules/general'
import { getCurrency } from '@oriuminc/base'
import { getFormattedAttributes } from '@oriuminc/commerce-generic'
import { CartEmptyState } from '@oriuminc/templates/cart'
import {
  CartLoadingState,
  HorizontalProductCard2,
  HorizontalProductCard2Props,
} from '@oriuminc/ui'
import { useRouter } from 'next/navigation'
import { FormatNumberOptions, useIntl } from 'react-intl'

export const CartPage = () => {
  const intl = useIntl()
  const { createHandleError } = useHandleError()
  const router = useRouter()
  const { path } = useComposable()
  const currency = getCurrency(intl.locale)
  const { cart, updateCartItem, deleteCartItem } = useCart()
  const productCartSize = useBreakpointValue({ base: 'sm', md: 'lg' })

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  const cartProductsIds = cart.items?.map((product) => product.productId) ?? []

  return (
    <Container maxW='container.2xl' py={{ base: 4, md: 8 }} px='4'>
      <Flex
        gap={{ base: 1, md: 2.5 }}
        mb={{ base: 'none', md: 4 }}
        alignItems='center'
      >
        <Text as='h1' textStyle='heading-300' textColor='text-primary'>
          {intl.formatMessage({ id: 'cart.title.myBag' })}
        </Text>

        <Text
          alignSelf='flex-end'
          textStyle={{ base: 'body-100', md: 'body-500' }}
          textColor='text-muted'
        >
          {intl.formatMessage(
            { id: 'cart.titleCount' },
            { count: cart.quantity }
          )}
        </Text>
      </Flex>

      <Stack
        w='full'
        maxW='full'
        display={{ sm: 'none' }}
        mb={{ base: 4, md: 10 }}
      >
        <Flex justify='space-between' mb='4'>
          <Text textStyle='body-75' textColor='text-muted'>
            {intl.formatMessage({ id: 'cart.summary.estimatedTotal' })}
          </Text>
          <Text textStyle='body-75'>
            {cart.price?.total
              ? intl.formatNumber(cart.price.total / 100, formatNumberOptions)
              : ''}
          </Text>
        </Flex>
        <CheckoutButton style={CheckoutButtonEnum.Desktop} />
      </Stack>

      {cart.isLoading ? (
        <CartLoadingState />
      ) : cart.isEmpty ? (
        <CartEmptyState />
      ) : (
        <>
          <Flex w='full' direction={{ base: 'column', lg: 'row' }}>
            <List
              display='grid'
              w='full'
              maxW='full'
              borderTop={{
                base: 'none',
                md: 'sm',
              }}
              pt={{ lg: 10 }}
              mb={{ base: 6, lg: 'none' }}
              sx={{ li: { mt: 'none !important' } }}
              gap='3'
            >
              {cart?.items?.map((item) => {
                const brand = item.variant?.attributes?.find(
                  (attr) => attr.name === 'brand'
                )?.value
                const _productSlug = item.variant?.id
                  ? `${item.slug}?vid=${item.variant?.id}`
                  : item.slug
                const regularPrice = item.variant?.price?.original.amount!
                const currentPrice = item.variant?.price?.current.amount!

                return (
                  <ListItem
                    key={item.itemId}
                    pb={{ base: 4, lg: 4 }}
                    pt={{ base: 'none', lg: 4 }}
                    borderBottom='sm'
                  >
                    <HorizontalProductCard2
                      key={item.itemId}
                      editable
                      columns={4}
                      size={
                        productCartSize as HorizontalProductCard2Props['size']
                      }
                      image={{
                        src:
                          item.variant?.images?.[0]?.url || IMAGE_PLACEHOLDER,
                        alt: `${intl.formatMessage(
                          { id: 'cart.item.viewMoreDetailsAbout' },
                          { name: item.title ?? 'product' }
                        )}`,
                        onClickImage: () =>
                          router.push(path.getPDP({ slug: _productSlug })),
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
                          ? intl.formatNumber(
                              currentPrice / 100,
                              formatNumberOptions
                            )
                          : undefined
                      }
                      onAddToWishlist={() => null}
                      onRemove={() => {
                        deleteCartItem.mutate(
                          { lineItemId: item.itemId },
                          {
                            onError: createHandleError(),
                          }
                        )
                      }}
                      onChangeQuantity={(val) => {
                        updateCartItem.mutate(
                          {
                            quantity: val,
                            lineItemId: item.itemId,
                            variantId: item.variant?.id,
                          },
                          {
                            onError: createHandleError(),
                          }
                        )
                      }}
                      isLoading={
                        updateCartItem.isPending || deleteCartItem.isPending
                      }
                    />
                  </ListItem>
                )
              })}
            </List>
            <Flex
              as='aside'
              justify='flex-end'
              w='full'
              // TODO: Replace pixel value with token.
              maxW={{ base: 'full', xl: '450px' }}
              ml={{ base: 'auto', lg: 12 }}
              aria-label={intl.formatMessage({ id: 'cart.summary.title' })}
            >
              <CartSummary />
            </Flex>
          </Flex>
          <Box mt={20} px={8}>
            <RelatedProducts
              title={intl.formatMessage({
                id: 'algolia.recommendations.youMightAlsoLike',
              })}
              productIDs={cartProductsIds}
            />
          </Box>
        </>
      )}
    </Container>
  )
}
