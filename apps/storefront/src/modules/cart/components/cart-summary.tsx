'use client'

import { Box, Divider, Flex, Stack, StackProps, Text } from '@chakra-ui/react'
import {
  CartPromotion,
  CheckoutButton,
  CheckoutButtonEnum,
} from '@modules/cart'
import { useCart } from '@modules/commerce'
import { IMAGE_PLACEHOLDER, useComposable } from '@modules/general'
import { getCurrency } from '@oriuminc/base'
import { ComposableCart } from '@oriuminc/commerce-generic'
import { CartPromotionAccordion } from '@oriuminc/templates/cart'
import { HorizontalProductCard2 } from '@oriuminc/ui'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'
interface CartSummaryItemProps {
  label: string
  value?: string
  textStyle?: string
  children?: ReactNode
  isDiscount?: boolean
}

const CartSummaryItem = (props: CartSummaryItemProps) => {
  const { label, value, textStyle, children, isDiscount } = props
  return (
    <Flex
      as='p'
      textStyle={!textStyle ? 'body-50-75' : textStyle}
      justify='space-between'
    >
      <Text as='span'>{label}</Text>
      {value ? (
        <Text as='span' color={isDiscount ? 'danger.600' : undefined}>
          {isDiscount && '-'}
          {value}
        </Text>
      ) : (
        children
      )}
    </Flex>
  )
}

export interface CartSummaryProps {
  hideCheckoutButton?: boolean
  displayTitle?: boolean
  rootProps?: StackProps
  orderSummaryProps?: StackProps
  promotionSection?: boolean
  showCartItems?: boolean
  cartData?: Partial<ComposableCart> // | OrderFragment['cart']
  textOverride?: {
    total: string
  }
}

export const CartSummary = ({
  hideCheckoutButton,
  rootProps,
  orderSummaryProps,
  displayTitle = true,
  promotionSection = true,
  showCartItems = false,
  cartData,
  textOverride,
}: CartSummaryProps) => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const router = useRouter()
  const { cart: _cart } = useCart()
  const cart = cartData ?? _cart
  const displayText = {
    total: textOverride?.total ?? 'cart.summary.estimatedTotal',
  }
  const { path } = useComposable()

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  const estimatedTotal = cart?.price?.total
    ? intl.formatNumber(cart.price.total / 100, formatNumberOptions)
    : '0'
  const title = intl.formatMessage({
    id: 'cart.summary.title',
  })
  const totalLabel = intl.formatMessage({
    id: displayText.total,
  })
  const titleCount = intl.formatMessage(
    { id: 'cart.titleCount' },
    { count: cart?.items?.length }
  )
  const ariaLiveSummary = `${title}: ${titleCount} ${totalLabel} ${estimatedTotal}`

  return (
    <Stack spacing={{ base: 4, md: 6 }} w='full' {...rootProps}>
      <Box
        bg='colors.surface.muted'
        px={{ base: 4, lg: 6 }}
        pt={{ base: 4, lg: 8 }}
        pb={{ base: 8 }}
        {...orderSummaryProps}
      >
        {displayTitle && (
          <Text
            as='h2'
            textStyle='heading-200'
            mb='sm'
            aria-label={ariaLiveSummary}
            aria-live='polite'
          >
            {title}
          </Text>
        )}

        {showCartItems && (
          <Stack spacing='2'>
            {cart.items?.map((item) => {
              const brand = item.variant?.attributes?.find(
                (attr) => attr.name === 'brand'
              )?.value
              const regularPrice = item.variant?.price?.original.amount!
              const currentPrice = item.variant?.price?.current.amount!
              return (
                <HorizontalProductCard2
                  key={item.itemId}
                  columns={2}
                  size='sm'
                  image={{
                    src: item.variant?.images?.[0]?.url || IMAGE_PLACEHOLDER,
                    alt: `${intl.formatMessage(
                      { id: 'cart.item.viewMoreDetailsAbout' },
                      { name: item.title ?? 'product' }
                    )}`,
                    onClickImage: () =>
                      router.push(path.getPDP({ slug: item.slug! })),
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
                />
              )
            })}
          </Stack>
        )}

        <Stack spacing='4' mt='lg'>
          <Stack spacing='1' mt='lg'>
            <CartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
              value={intl.formatNumber(
                cart?.price?.subtotal ? cart?.price?.subtotal / 100 : 0,
                formatNumberOptions
              )}
            />

            <CartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.shipping' })}
              value={
                cart.price?.shipping !== undefined
                  ? intl.formatNumber(cart.price?.shipping, formatNumberOptions)
                  : intl.formatMessage({
                      id: 'cart.summary.tax.calculatedAtNextStep',
                    })
              }
            />

            <CartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.tax' })}
              value={
                cart.price?.tax !== undefined
                  ? intl.formatNumber(
                      cart.price?.tax / 100,
                      formatNumberOptions
                    )
                  : intl.formatMessage({
                      id: 'cart.summary.tax.calculatedAtNextStep',
                    })
              }
            />

            {cart.price?.discounts && cart.price.discounts > 0 && (
              <CartSummaryItem
                isDiscount
                label={intl.formatMessage({ id: 'cart.summary.discount' })}
                value={intl.formatNumber(
                  cart.price.discounts / 100,
                  formatNumberOptions
                )}
              />
            )}
          </Stack>

          {promotionSection && (
            <CartPromotionAccordion>
              <CartPromotion />
            </CartPromotionAccordion>
          )}

          <CartSummaryItem
            textStyle='heading-100'
            label={totalLabel}
            value={estimatedTotal}
          />
        </Stack>
      </Box>

      {!hideCheckoutButton && (
        <CheckoutButton style={CheckoutButtonEnum.Desktop} />
      )}
    </Stack>
  )
}
