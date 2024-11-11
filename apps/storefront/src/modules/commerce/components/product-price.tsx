'use client'

import {
  HStack,
  StackProps,
  Text,
  TextProps,
  VisuallyHidden,
} from '@chakra-ui/react'
import { getSavePercentage } from '@modules/commerce'
import { Locale, getCurrency } from '@oriuminc/base'
import { ComposablePrice } from '@oriuminc/commerce-generic'
import { ReactNode } from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'

interface ProductPriceProps {
  price?: ComposablePrice
  rootProps?: StackProps
  priceProps?: TextProps
  textProps?: TextProps
  salePriceProps?: TextProps
  savingRateProps?: TextProps
  children?: ReactNode
  displayDiscountInfo?: boolean
  discountInfo?: string
  locale: Locale
}

export const Price = (props: ProductPriceProps) => {
  const {
    price,
    rootProps,
    priceProps,
    textProps,
    salePriceProps,
    savingRateProps,
    children,
    displayDiscountInfo = true,
    discountInfo,
    locale,
  } = props
  const intl = useIntl()
  const currency = getCurrency(locale)

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  if (!price) return null

  const hasSpecialPrice = price.current.amount < price.original.amount
  const discountPercentage = getSavePercentage({
    regularAmount: price.original.amount,
    saleAmount: price.current.amount,
    decimal: 0,
  })

  if (!price.original.amount && !children) {
    return null
  }

  const regularPriceText = intl.formatNumber(
    price.original.amount / 100,
    formatNumberOptions
  )

  const currentPriceText = intl.formatNumber(
    price.current.amount / 100,
    formatNumberOptions
  )

  const priceWas = hasSpecialPrice
    ? `${intl.formatMessage({ id: 'text.was' })} ${regularPriceText}`
    : ''

  const priceNow = `${intl.formatMessage({
    id: 'product.price.current',
  })} ${hasSpecialPrice ? currentPriceText : regularPriceText}`

  const youSaved =
    discountInfo ??
    intl.formatMessage(
      { id: 'product.price.sale.youSaved' },
      {
        discountPercentage: discountPercentage,
      }
    )

  const ariaLivePrice = hasSpecialPrice
    ? `${priceWas} ${priceNow} ${youSaved}`
    : priceNow

  return (
    <>
      <VisuallyHidden>
        <Text aria-live='polite'>{ariaLivePrice}</Text>
      </VisuallyHidden>
      <HStack spacing='1' aria-hidden {...rootProps}>
        <Text
          as='span'
          textStyle='blockquote'
          color='text'
          textDecoration={hasSpecialPrice ? 'line-through' : 'none'}
          aria-hidden
          {...textProps}
          {...priceProps}
        >
          {children ?? (hasSpecialPrice ? regularPriceText : currentPriceText)}
        </Text>

        {hasSpecialPrice && (
          <Text
            as='span'
            textStyle='blockquote'
            color='danger.600'
            aria-hidden
            {...textProps}
            {...salePriceProps}
          >
            {price.current.amount ? currentPriceText : null}
          </Text>
        )}

        {hasSpecialPrice && displayDiscountInfo && (
          <Text
            as='span'
            aria-hidden
            textStyle='blockquote'
            color='danger.600'
            {...textProps}
            {...savingRateProps}
          >
            {youSaved}
          </Text>
        )}
      </HStack>
    </>
  )
}
