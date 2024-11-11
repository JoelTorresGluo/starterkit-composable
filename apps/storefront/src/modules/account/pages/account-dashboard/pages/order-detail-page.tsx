'use client'

import { ChevronLeftIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Spacer,
  Spinner,
  Stack,
  StackDivider,
  Tag,
  Text,
  TextProps,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  CancelOrderButton,
  OrderInfoItem,
  orderStatesVariant,
} from '@modules/account'
import { OrderItems } from '@modules/checkout'
import { useComposable } from '@modules/general'
import { api } from '@modules/trpc/react'
import { getCurrency } from '@oriuminc/base'
import { OrderTotals } from '@oriuminc/templates/checkout'
import NextLink from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'

export const OrderDetailPage = () => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const { path, locale } = useComposable()
  const params = useParams()
  const orderId = `${params.orderId}`

  const {
    data: order,
    isLoading,
    refetch,
  } = api.commerce.getOrder.useQuery({
    orderId,
    locale,
    currency,
  })

  const stripePaymentIntentId = useMemo(() => {
    // Get payment info from the cart, cause the order has some delay to show this
    if (order?.payments?.[0]?.paymentInterface.identifier === 'STRIPE') {
      return order?.payments?.[0]?.paymentInterface.transactionId ?? ''
    }
  }, [order])

  const isStripePayment = Boolean(stripePaymentIntentId)

  const { data: paymentIntent, isLoading: isLoadingStripe } =
    api.stripe.getPaymentIntent.useQuery(
      { paymentIntentId: stripePaymentIntentId ?? '' },
      {
        enabled: isStripePayment,
      }
    )

  const card = paymentIntent?.card
  const isStripeLink = Boolean(paymentIntent?.link)

  const billing = [
    `${order?.billingAddress?.firstName} ${order?.billingAddress?.lastName}`,
    order?.billingAddress?.addressLine1,
    order?.billingAddress?.addressLine2,
    [
      order?.billingAddress?.city,
      order?.billingAddress?.region,
      order?.billingAddress?.postalCode,
    ]
      .filter(Boolean)
      .join(', '),
    `${order?.billingAddress?.phoneNumber ?? ''}`,
  ]

  const shipping = [
    `${order?.shippingAddress?.firstName} ${order?.shippingAddress?.lastName}`,
    order?.shippingAddress?.addressLine1,
    order?.shippingAddress?.addressLine2,
    [
      order?.shippingAddress?.city,
      order?.shippingAddress?.region,
      order?.shippingAddress?.postalCode,
    ]
      .filter(Boolean)
      .join(', '),
    `${order?.shippingAddress?.phoneNumber ?? ''}`,
  ]

  const deliveryMethod = {
    line1: order?.shippingMethod?.description || '',
    line2: order?.shippingMethod?.title,
  }

  const cardData = card ? `${card.brand} XXXX-${card.last4}` : undefined
  const linkData = isStripeLink
    ? intl.formatMessage({
        id: 'checkout.paymentSection.stripeLink.paymentMethodTitle',
      })
    : undefined

  const paymentMethod = {
    line1:
      cardData ??
      linkData ??
      intl.formatMessage({
        id: 'checkout.paymentSection.offlinePayment',
      }),
    line2: card ? `Expiry: ${card.exp_month}/${card.exp_year}` : '',
  }

  const dividerOn = useBreakpointValue({
    base: <StackDivider borderColor='gray.300' />,
    md: <></>,
  })

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  if (isLoading) {
    return (
      <Center minHeight='96'>
        <Spinner />
      </Center>
    )
  }

  const orderState = order?.status!

  return (
    <Box px='4'>
      <Button
        as={NextLink}
        href={path.getAccountDashboard({ page: 'order' })}
        variant='ghost'
        color='text'
        fontSize='sm'
        leftIcon={<ChevronLeftIcon aria-hidden='true' w='6' h='6' />}
        px='1'
      >
        {intl.formatMessage({
          id: 'checkout.success.orderDetails.backToOrderHistory',
        })}
      </Button>

      <Spacer h='10' />

      <Grid
        gridTemplateAreas={{
          base: `
          "status-tag"
          "order-id"
          "date-status"
          "cancel-button"
        `,
          md: `
        "status-tag cancel-button"
        "order-id order-id"
        "date-status date-status"
        "order-status order-status"
      `,
        }}
      >
        <GridItem gridArea='status-tag'>
          <Tag
            w='fit-content'
            variant={
              order?.status ? orderStatesVariant[order.status] : undefined
            }
            textTransform='uppercase'
          >
            {orderState}
          </Tag>
        </GridItem>
        <GridItem gridArea='order-id'>
          <Text textStyle='desktop-400' mb='4'>
            {intl.formatMessage(
              { id: 'account.orders.label' },
              { orderNumber: order?.id.split('-')[0].toUpperCase() }
            )}
          </Text>
        </GridItem>
        <GridItem w='fit-content' gridArea='date-status'>
          <Stack w='fit-content' spacing='2' gap='2' mb='4'>
            <OrderInfoItem
              label={intl.formatMessage({
                id: 'checkout.success.orderDetails.orderDate',
              })}
              value={intl.formatDate(order!.createdAt, {
                month: 'long',
                day: '2-digit',
                year: 'numeric',
              })}
            />

            <OrderInfoItem label='Order Status' value={order?.status} />
          </Stack>
        </GridItem>
        <GridItem gridArea='cancel-button' textAlign='end'>
          {order?.status === 'Open' && (
            <CancelOrderButton
              orderId={orderId}
              onOrderCancelSuccess={refetch}
              buttonProps={{
                size: 'sm',
                variant: 'outline',
                width: { base: 'full', md: 'fit-content' },
              }}
            />
          )}
        </GridItem>
      </Grid>

      <Spacer h='4' />

      <Stack
        spacing='4'
        px='7'
        py='10'
        bg='colors.surface.muted'
        direction={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
        divider={dividerOn}
        gap={{ base: 0, md: '4' }}
      >
        <Stack spacing='8' flex={1}>
          <InfoSectionCustom>
            <InfoSectionCustom.Title
              title={intl.formatMessage({
                id: 'account.orders.shipping.shippedTo',
              })}
              textStyle='mobile-50'
              textColor='text-muted'
            />
            <InfoSectionCustom.Content
              textStyle='blockquote-75'
              content={shipping}
            />
          </InfoSectionCustom>

          <InfoSectionCustom>
            <InfoSectionCustom.Title
              title={intl.formatMessage({
                id: 'checkout.success.orderDetails.deliveryOption',
              })}
              textStyle='mobile-50'
              textColor='text-muted'
            />
            <InfoSectionCustom.Content
              textStyle='blockquote-75'
              content={[deliveryMethod.line1, deliveryMethod.line2 ?? '']}
            />
          </InfoSectionCustom>
        </Stack>

        <Stack spacing='8' flex={1}>
          <InfoSectionCustom>
            <InfoSectionCustom.Title
              title={intl.formatMessage({
                id: 'account.orders.billing.billedTo',
              })}
              textStyle='mobile-50'
              textColor='text-muted'
            />
            <InfoSectionCustom.Content
              textStyle='blockquote-75'
              content={billing}
            />
          </InfoSectionCustom>

          <InfoSectionCustom>
            <InfoSectionCustom.Title
              title={intl.formatMessage({
                id: 'checkout.success.orderDetails.paymentMethod',
              })}
              textStyle='mobile-50'
              textColor='text-muted'
            />
            <InfoSectionCustom.Content
              textStyle='blockquote-75'
              content={
                isStripePayment && isLoadingStripe
                  ? []
                  : [paymentMethod.line1, paymentMethod.line2]
              }
            />
          </InfoSectionCustom>
        </Stack>

        <Stack flex={1}>
          <InfoSectionCustom>
            <InfoSectionCustom.Title
              title={intl.formatMessage({
                id: 'account.orders.summary.summaryOfCharges',
              })}
              textStyle='mobile-50'
              textColor='text-muted'
            />
            <OrderTotals
              subtotal={intl.formatNumber(
                order?.price.subtotal !== undefined
                  ? order?.price.subtotal / 100
                  : 0,
                formatNumberOptions
              )}
              deliveryTitle={order?.shippingMethod?.title}
              total={intl.formatNumber(
                order?.price.total !== undefined ? order?.price.total / 100 : 0,
                formatNumberOptions
              )}
              delivery={intl.formatNumber(
                order?.price.shipping !== undefined
                  ? order?.price.shipping / 100
                  : 0,
                formatNumberOptions
              )}
              discount={
                order?.price.discounts
                  ? intl.formatNumber(
                      order.price.discounts / 100,
                      formatNumberOptions
                    )
                  : undefined
              }
              tax={intl.formatNumber(
                order?.price.tax !== undefined ? order?.price.tax / 100 : 0,
                formatNumberOptions
              )}
            />
          </InfoSectionCustom>
        </Stack>
      </Stack>

      <Spacer h='10' />

      <Box>
        <Text textStyle='desktop-200'>Delivery Contents</Text>
        <Text>
          {intl.formatMessage(
            { id: 'checkout.success.orderSummary.items' },
            { quantity: order?.itemsTotalQuantity }
          )}
        </Text>
        <Spacer h='4' />
        <OrderItems items={order?.items || []} />

        <OrderTotals
          subtotal={intl.formatNumber(
            order?.price.subtotal !== undefined
              ? order?.price.subtotal / 100
              : 0,
            formatNumberOptions
          )}
          deliveryTitle={order?.shippingMethod?.title}
          total={intl.formatNumber(
            order?.price.total !== undefined ? order?.price.total / 100 : 0,
            formatNumberOptions
          )}
          delivery={intl.formatNumber(
            order?.price.shipping !== undefined
              ? order?.price.shipping / 100
              : 0,
            formatNumberOptions
          )}
          discount={
            order?.price.discounts
              ? intl.formatNumber(
                  order.price.discounts / 100,
                  formatNumberOptions
                )
              : undefined
          }
          tax={intl.formatNumber(
            order?.price.tax !== undefined ? order?.price.tax / 100 : 0,
            formatNumberOptions
          )}
        />

        <Spacer h='10' />
      </Box>
    </Box>
  )
}

interface InfoSectionContentProps extends Omit<TextProps, 'content'> {
  content: Array<string | undefined>
}

interface InfoSectionTitleProps extends TextProps {
  title: string
}

const InfoSectionHOC: ({
  children,
}: {
  children: any
}) => React.ReactElement = ({ children }) => {
  return <Box>{children}</Box>
}
const InfoSectionTitle = ({ title, ...textProps }: InfoSectionTitleProps) => {
  return (
    <Text fontSize='md' fontWeight='medium' mb='4' {...textProps}>
      {title}
    </Text>
  )
}

const InfoSectionContent = ({
  content,
  ...textProps
}: InfoSectionContentProps) => {
  return (
    <>
      {content.map((c, index) => {
        if (!c) return <></>

        return (
          <Text key={index} fontSize='sm' {...textProps}>
            {c}
          </Text>
        )
      })}
    </>
  )
}

export interface InfoSectionHOCProps {
  ({ children }: any): React.ReactElement
  Title: ({ title }: InfoSectionTitleProps) => React.ReactElement
  Content: ({ content }: InfoSectionContentProps) => React.ReactElement
}

export const InfoSectionCustom: InfoSectionHOCProps = Object.assign(
  InfoSectionHOC,
  {
    Title: InfoSectionTitle,
    Content: InfoSectionContent,
  }
)
