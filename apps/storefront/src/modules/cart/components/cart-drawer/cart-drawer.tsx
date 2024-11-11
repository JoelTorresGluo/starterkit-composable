'use client'

import {
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import { EXCLUDED_PRODUCT_ATTRIBUTES, useCart } from '@modules/commerce'
import {
  IMAGE_PLACEHOLDER,
  useComposable,
  useHandleError,
} from '@modules/general'
import { getCurrency } from '@oriuminc/base'
import { getFormattedAttributes } from '@oriuminc/commerce-generic'
import { CartLoadingState, HorizontalProductCard2 } from '@oriuminc/ui'
import { useRouter } from 'next/navigation'
import { FormatNumberOptions, useIntl } from 'react-intl'
import { CartDrawerSummary } from '../cart-drawer-summary'
import { CartDrawerFooter } from './cart-drawer-footer'
import { CartDrawerEmptyState } from './cart-drawer-empty-state'

export const CartDrawer = () => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const router = useRouter()
  const { cartDrawer, path } = useComposable()
  const { cart, deleteCartItem, updateCartItem } = useCart()
  const { createHandleError } = useHandleError()

  const title = intl.formatMessage({ id: 'cart.drawer.title' })
  const titleCount = intl.formatMessage(
    { id: 'cart.drawer.titleCount.myBag' },
    { count: cart.quantity }
  )
  const itemCount = intl.formatMessage(
    { id: 'category.results.itemCount' },
    { itemCount: cart.quantity }
  )
  const estimatedTotalLabel = intl.formatMessage({
    id: 'cart.summary.estimatedTotal',
  })
  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  const estimatedTotal =
    cart?.price?.total !== undefined
      ? intl.formatNumber(cart?.price?.total, formatNumberOptions)
      : null

  const ariaLiveSummary = `${title} ${itemCount} ${estimatedTotalLabel}: ${estimatedTotal}`

  return (
    <Drawer
      isOpen={cartDrawer.isOpen}
      placement='right'
      onClose={cartDrawer.onClose}
      size='md'
    >
      <DrawerOverlay />
      <DrawerContent maxW={{ base: 'full', sm: 550 }}>
        <DrawerHeader maxH={{ base: 50, md: 60 }}>
          <DrawerCloseButton size='lg' fontSize='sm' left='xs' />
          <Center h='6' fontSize={{ base: 'md', md: 'xl' }} lineHeight='6'>
            <Text
              as='h2'
              textStyle={{ base: 'mobile-200', md: 'mobile-300' }}
              aria-label={ariaLiveSummary}
              aria-live='polite'
            >
              {titleCount}
            </Text>
          </Center>
        </DrawerHeader>
        <Divider />
        <DrawerBody pb='4' pt='none'>
          {cart.isLoading ? (
            <CartLoadingState />
          ) : cart.isEmpty ? (
            <CartDrawerEmptyState onClose={cartDrawer.onClose} />
          ) : (
            <Stack spacing='2'>
              <List
                display='flex'
                flexDirection='column'
                gap={{ base: 3 }}
                pt={{ base: 3, sm: 4 }}
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
                      borderBottom='sm'
                      mb={{ base: 'none', sm: 1 }}
                      pb={{ base: 4, sm: 8 }}
                    >
                      <HorizontalProductCard2
                        editable
                        columns={3}
                        size='sm'
                        image={{
                          src:
                            item.variant?.images?.[0]?.url || IMAGE_PLACEHOLDER,
                          alt: `${intl.formatMessage(
                            { id: 'cart.item.viewMoreDetailsAbout' },
                            { name: item.title ?? 'product' }
                          )}`,
                          onClickImage: async () => {
                            await router.push(
                              path.getPDP({ slug: _productSlug })
                            )
                            cartDrawer.onClose()
                          },
                        }}
                        name={item.title || ''}
                        brand={brand}
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
                        onRemove={() => {
                          deleteCartItem.mutate(
                            { lineItemId: item.itemId },
                            {
                              onError: createHandleError(),
                            }
                          )
                        }}
                        details={getFormattedAttributes({
                          attributes: item.variant?.attributes,
                          excludeAttributes: EXCLUDED_PRODUCT_ATTRIBUTES,
                        })}
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
              <CartDrawerSummary />
            </Stack>
          )}
        </DrawerBody>
        <DrawerFooter pt='none' px='5' pb='4' boxShadow='sm-inverseY'>
          {!cart.isLoading && !cart.isEmpty && <CartDrawerFooter />}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
