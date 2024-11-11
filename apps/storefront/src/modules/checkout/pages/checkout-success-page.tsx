'use client'

import { Box, Center, Container, Spinner, VStack } from '@chakra-ui/react'
import {
  CreateAccount,
  OrderItems,
  ThankYou,
  useOrderId,
} from '@modules/checkout'
import { LOCAL_STORAGE_CUSTOM_PAYMENT_AMOUNT, useUser } from '@modules/commerce'
import { analyticsTrackPurchase, useComposable } from '@modules/general'
import { api } from '@modules/trpc/react'
import { useAlgoliaInsights } from '@oriuminc/algolia'
import { getCurrency, writeStorage } from '@oriuminc/base'
import { OrderDetails, OrderSummary } from '@oriuminc/templates/checkout'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef } from 'react'
import { FormatDateOptions, FormatNumberOptions, useIntl } from 'react-intl'

export const CheckoutSuccessPage = () => {
  const router = useRouter()
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const { customer } = useUser()
  const { path, locale } = useComposable()
  const { orderId } = useOrderId()
  const {
    data: order,
    isLoading,
    isError,
  } = api.commerce.getOrder.useQuery(
    {
      orderId, //If needed orderId can be hardcoded to desired orderId to test the page, e.g. orderId: '123'
      locale,
      currency,
    },
    { retry: false }
  )

  const eventSent = useRef(false)
  const {
    trackAlgoliaPurchasedObjectIDs,
    trackAlgoliaPurchasedObjectIDsAfterSearch,
    isUsingAlgolia,
    queryProductCache,
  } = useAlgoliaInsights()

  const orderCurrency = order?.currency || currency

  const stripePaymentIntentId = useMemo(() => {
    // Get payment info from the cart, cause the order has some delay to show this
    if (order?.payments?.[0]?.paymentInterface.identifier === 'STRIPE') {
      return order?.payments?.[0]?.paymentInterface.transactionId ?? ''
    }
  }, [order])

  const { data: stripeData, isLoading: loadingStripeData } =
    api.stripe.getPaymentIntent.useQuery(
      { paymentIntentId: stripePaymentIntentId ?? '' },
      {
        enabled: Boolean(stripePaymentIntentId),
      }
    )

  const stripePaymentDetails = useMemo(() => {
    if (!stripeData) return
    if (loadingStripeData)
      return {
        line1: intl.formatMessage({
          id: 'checkout.paymentSection.stripe.card.loading',
        }),
      }
    const { card, link } = stripeData
    if (card) {
      return {
        line1: `${card.brand} XXXX-${card.last4}`,
        line2: `${card.exp_month}/${card.exp_year}`,
      }
    }
    if (link) {
      return {
        line1: intl.formatMessage({
          id: 'checkout.paymentSection.stripeLink.paymentMethodTitle',
        }),
      }
    }
    return {
      line1: intl.formatMessage({
        id: 'checkout.paymentSection.stripe.paymentMethodTitle',
      }),
    }
  }, [stripeData, loadingStripeData])

  const formatNumberOptions: FormatNumberOptions = {
    currency: orderCurrency,
    style: 'currency',
  }

  const formatDateOptions: FormatDateOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }

  useEffect(() => {
    if (isError) {
      router.push(path.getHome())
    }
  }, [isError, path, router])

  useEffect(() => {
    if (order && !eventSent.current) {
      eventSent.current = true
      analyticsTrackPurchase({ order })
      writeStorage(LOCAL_STORAGE_CUSTOM_PAYMENT_AMOUNT, 0)
      if (isUsingAlgolia && order.items) {
        let productsFromAlgoliaQueries = false
        const _order = {
          items: order?.items.map((item) => {
            // find the algolia queryID from local storage
            const queryID = Object.entries(queryProductCache.entries).reduce<
              string | undefined
            >((acc, [query, productIds]) => {
              if (productIds.includes(item.productId)) {
                productsFromAlgoliaQueries = true
                return query
              }
              return acc
            }, undefined)

            return {
              queryID,
              id: item.productId,
              price: item.variant.price!.current.amount,
              discount:
                item.variant.price!.current.amount -
                item.variant.price!.original.amount,
              quantity: item.quantity,
            }
          }),
          total: order.price.total,
        }

        if (productsFromAlgoliaQueries) {
          trackAlgoliaPurchasedObjectIDsAfterSearch(_order)
        } else {
          trackAlgoliaPurchasedObjectIDs(_order)
        }
        queryProductCache.clear()
      }
    }
  }, [order, queryProductCache.entries])

  if (isError) {
    return null
  }

  if (isLoading) {
    return (
      <Center minH='96'>
        <Spinner />
      </Center>
    )
  }

  const billing = {
    name: `${order?.billingAddress?.firstName} ${order?.billingAddress?.lastName}`,
    addressLine1: `${order?.billingAddress?.addressLine1}`,
    addressLine2: `${order?.billingAddress?.addressLine2}`,
    cityRegionPostalCode: [
      order?.billingAddress?.city,
      order?.billingAddress?.region,
      order?.billingAddress?.postalCode,
    ]
      .filter(Boolean)
      .join(', '),
  }

  const shipping = {
    name: `${order?.shippingAddress?.firstName} ${order?.shippingAddress?.lastName}`,
    addressLine1: `${order?.shippingAddress?.addressLine1}`,
    addressLine2: `${order?.shippingAddress?.addressLine2}`,
    cityRegionPostalCode: [
      order?.shippingAddress?.city,
      order?.shippingAddress?.region,
      order?.shippingAddress?.postalCode,
    ]
      .filter(Boolean)
      .join(', '),
  }

  return (
    <Box bg='shading.100' pb={{ base: 'md', lg: 'xxxl' }}>
      <Container maxW='container.lg' px='4'>
        <VStack spacing='md'>
          <ThankYou
            orderId={order?.id ?? ''}
            confirmationEmailAddress={order?.customerEmail}
          />

          {!customer && order?.customerEmail && (
            <CreateAccount
              confirmationEmailAddress={order.customerEmail}
              firstName={order.shippingAddress?.firstName ?? ''}
              lastName={order.shippingAddress?.lastName ?? ''}
            />
          )}

          <OrderDetails
            confirmationEmailAddress={
              order?.customerEmail ?? order?.shippingAddress?.email ?? ''
            }
            orderDate={intl.formatDate(order?.createdAt, formatDateOptions)}
            paymentMethod={
              stripePaymentDetails ?? {
                line1: intl.formatMessage({
                  id: 'checkout.paymentSection.offlinePayment',
                }),
              }
            }
            deliveryMethod={{
              line1: order?.shippingMethod?.description || '',
              line2: order?.shippingMethod?.title,
            }}
            billing={billing}
            shipping={shipping}
          />

          <OrderSummary
            items={<OrderItems items={order?.items || []} />}
            itemsQuantity={order?.itemsTotalQuantity ?? 0}
            subtotal={intl.formatNumber(
              order?.price.subtotal ?? 0 / 100,
              formatNumberOptions
            )}
            deliveryTitle={order?.shippingMethod?.title}
            delivery={intl.formatNumber(
              order?.price.shipping ?? 0 / 100,
              formatNumberOptions
            )}
            tax={intl.formatNumber(
              order?.price.tax ?? 0 / 100,
              formatNumberOptions
            )}
            discount={
              order?.price.discounts
                ? intl.formatNumber(
                    order?.price.discounts / 100,
                    formatNumberOptions
                  )
                : undefined
            }
            total={intl.formatNumber(
              order?.price.total ?? 0 / 100,
              formatNumberOptions
            )}
          />
        </VStack>
      </Container>
    </Box>
  )
}
