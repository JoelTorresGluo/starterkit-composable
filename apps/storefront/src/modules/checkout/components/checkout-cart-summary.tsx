'use client'

import { ReactNode, useEffect, useId, useMemo, useState } from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Show,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useToken,
  VisuallyHidden,
} from '@chakra-ui/react'
import { LOCAL_STORAGE_CUSTOM_PAYMENT_AMOUNT, useCart } from '@modules/commerce'
import { IMAGE_PLACEHOLDER, useComposable } from '@modules/general'
import { useLocalStorage } from '@oriuminc/base'
import { ComposableCart } from '@oriuminc/commerce-generic'
import {
  HorizontalProductCard2,
  HorizontalProductCard2Props,
} from '@oriuminc/ui'
import { useRouter } from 'next/navigation'
import { useSelectedShippingOption } from '../hooks'
import { CustomPaymentItem } from './custom-payment-item'
import { getCurrency } from '@oriuminc/base'

interface CheckoutCartSummaryItemProps {
  label: string
  value?: string
  textStyle?: string
  children?: ReactNode
  isDiscount?: boolean
}

export const CheckoutCartSummaryItem = (
  props: CheckoutCartSummaryItemProps
) => {
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

export interface CheckoutCartSummaryProps {
  hideCheckoutButton?: boolean
  displayTitle?: boolean
  rootProps?: StackProps
  orderSummaryProps?: StackProps
  showCartItems?: boolean
  cartData?: Partial<ComposableCart> // | OrderFragment['cart']
  textOverride?: {
    total: string
  }
}

export const CheckoutCartSummary = ({
  hideCheckoutButton,
  rootProps,
  orderSummaryProps,
  displayTitle = true,
  showCartItems = false,
  cartData,
  textOverride,
}: CheckoutCartSummaryProps) => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const router = useRouter()
  const { path } = useComposable()
  const { selectedShippingOption } = useSelectedShippingOption()
  const { cart: _cart } = useCart()
  const cart = cartData ?? _cart
  const [customAmountLoaded, setCustomAmountLoaded] = useState(false)
  const [customPaymentAmount] = useLocalStorage(
    LOCAL_STORAGE_CUSTOM_PAYMENT_AMOUNT,
    0
  )
  const displayText = {
    total: textOverride?.total ?? 'cart.summary.estimatedTotal',
  }
  const productCartSize = useBreakpointValue({ base: 'sm', md: 'lg' })

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  const shippingPreview =
    selectedShippingOption?.price !== undefined
      ? selectedShippingOption?.price.amount
      : undefined

  const totalWithShippingPreview = useMemo<number | undefined>(() => {
    if (!shippingPreview) return cart.price?.total
    if (!cart.price) return 0
    if (cart.price.shipping !== undefined) {
      // then cart.price.total already has a shipping cost included
      // subtract it first, then sum the shippingPreview
      return cart.price.total - cart.price.shipping + shippingPreview
    }
    // cart.price.total doesn't have a shipping cost included yet
    // simply sum the shippingPreview
    return cart.price.total + shippingPreview
  }, [cart.price, shippingPreview])

  const itemCount = intl.formatMessage(
    { id: 'category.results.itemCount' },
    { itemCount: _cart.quantity }
  )
  const title = intl.formatMessage({
    id: 'cart.summary.title',
  })
  const totalLabel = intl.formatMessage({
    id: displayText.total,
  })
  const ariaLiveSummary = `${title}: ${itemCount}, ${totalLabel} ${intl.formatNumber(
    cart.price?.total ? cart.price?.total / 100 : 0,
    formatNumberOptions
  )}`

  useEffect(() => {
    setCustomAmountLoaded(true)
  }, [])

  if (!cart) {
    router.push(path.getHome())
  }

  const summaryId = `summary-title-${useId()}`

  const [spacing6, spacing8] = useToken('spacing', ['spacing.6', 'spacing.8'])

  return (
    <Stack
      px={{ base: 4, md: 'none' }}
      spacing={{ base: 4, md: 6 }}
      w='full'
      {...rootProps}
    >
      <Box
        as='section'
        aria-labelledby={summaryId}
        p={{ base: 'none', lg: `${spacing8} ${spacing6}` }}
        backgroundColor='transparent'
        {...orderSummaryProps}
      >
        {displayTitle && (
          <>
            <Show above='md'>
              <Text
                as='h2'
                id={summaryId}
                textStyle='heading-200'
                aria-live='polite'
                aria-label={ariaLiveSummary}
                mb='1'
              >
                {title}
              </Text>
            </Show>
            <Show below='md'>
              <VisuallyHidden
                as='h2'
                id={summaryId}
                aria-live='polite'
                aria-label={ariaLiveSummary}
              >
                {title}
              </VisuallyHidden>
            </Show>
          </>
        )}

        {showCartItems && (
          <Accordion defaultIndex={0} allowToggle={true}>
            <AccordionItem border='0'>
              <Heading as='h3'>
                <AccordionButton
                  display='flex'
                  gap='1'
                  borderBottom='sm'
                  paddingX='0'
                  pb='3'
                  _hover={{ bg: 'transparent' }}
                >
                  <Text as='span'>{itemCount}</Text>
                  <AccordionIcon />
                  <Text as='span' fontWeight='bold' ml='auto'>
                    {cart.price &&
                      intl.formatNumber(
                        cart.price.subtotal / 100,
                        formatNumberOptions
                      )}
                  </Text>
                </AccordionButton>
              </Heading>
              <AccordionPanel p='none'>
                <Stack
                  divider={<Divider />}
                  spacing='2'
                  borderBottom='sm'
                  mb='5'
                >
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
                        size={
                          productCartSize as HorizontalProductCard2Props['size']
                        }
                        image={{
                          src:
                            item.variant?.images?.[0]?.url || IMAGE_PLACEHOLDER,
                          alt: item.title,
                          onClickImage: () =>
                            router.push(path.getPDP({ slug: item.slug })),
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
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}

        <Stack mt={{ base: 'none', md: 3 }} spacing='3'>
          <CheckoutCartSummaryItem
            label={intl.formatMessage({ id: 'cart.summary.subtotal' })}
            value={intl.formatNumber(
              cart.price?.subtotal ? cart.price?.subtotal / 100 : 0,
              formatNumberOptions
            )}
          />

          {shippingPreview !== undefined && (
            <CheckoutCartSummaryItem
              label={selectedShippingOption?.title || ''}
              value={intl.formatNumber(
                shippingPreview / 100,
                formatNumberOptions
              )}
            />
          )}

          {cart.price?.tax ? (
            <CheckoutCartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.tax' })}
              value={intl.formatNumber(
                cart.price.tax / 100,
                formatNumberOptions
              )}
            />
          ) : (
            <CheckoutCartSummaryItem
              label={intl.formatMessage({ id: 'cart.summary.tax' })}
              value={intl.formatMessage({
                id: 'cart.summary.tax.calculatedAtNextStep',
              })}
            />
          )}

          {cart.price?.discounts && (
            <CheckoutCartSummaryItem
              isDiscount
              label={intl.formatMessage({ id: 'cart.summary.discount' })}
              value={intl.formatNumber(
                cart.price.discounts / 100,
                formatNumberOptions
              )}
            />
          )}

          <Divider />

          <CheckoutCartSummaryItem
            textStyle='heading-100'
            label={totalLabel}
            value={intl.formatNumber(
              totalWithShippingPreview ? totalWithShippingPreview / 100 : 0,
              formatNumberOptions
            )}
          />
          {customAmountLoaded && !!customPaymentAmount && (
            <CustomPaymentItem
              customPaymentAmount={customPaymentAmount / 100}
              formatNumberOptions={formatNumberOptions}
            />
          )}
        </Stack>
      </Box>

      {!hideCheckoutButton && (
        <Button
          colorScheme='blue'
          size='lg'
          fontSize='sm'
          onClick={() => router.push(path.getCheckout())}
        >
          {intl.formatMessage({ id: 'action.checkout' })}
        </Button>
      )}
    </Stack>
  )
}
