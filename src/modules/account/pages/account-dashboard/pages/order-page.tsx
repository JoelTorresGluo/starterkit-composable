'use client'

import {
  Box,
  Button,
  Container,
  Flex,
  Link,
  SimpleGrid,
  Spacer,
  Stack,
  StackDivider,
  Tag,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { CancelOrderButton, DashboardContentLayout } from '@modules/account'
import { ORDER_DEFAULT_LIMIT } from '@modules/commerce'
import { useComposable } from '@modules/general'
import { api } from '@modules/trpc/react'
import { getCurrency } from '@oriuminc/base'
import { ComposableAddress, getAddressLabels } from '@oriuminc/commerce-generic'
import { CartLoadingState, Pagination } from '@oriuminc/ui'
import NextLink from 'next/link'
import { ReactNode, useState } from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'

interface OrderHistoryEmptyProps {
  title: string
  description: string
  buttonLabel: string
  buttonHref: string
}

const OrderHistoryEmpty = ({
  title,
  description,
  buttonLabel,
  buttonHref,
}: OrderHistoryEmptyProps) => {
  return (
    <Flex
      bg='shading.100'
      p='8'
      h='xl'
      justifyContent='center'
      alignItems='center'
    >
      <VStack spacing='4'>
        <Text textStyle='desktop-300'>{title}</Text>

        <Text textStyle='blockquote-100'>{description}</Text>
        <Link as={NextLink} href={buttonHref}>
          <Button
            variant='solid'
            type='submit'
            fontSize='mobile-50'
            fontWeight='bold'
          >
            {buttonLabel}
          </Button>
        </Link>
      </VStack>
    </Flex>
  )
}

export const AccountOrderHistoryPage = () => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const { locale, path } = useComposable()
  const [page, setPage] = useState(1)

  const { data, isLoading, refetch } = api.commerce.getOrders.useQuery({
    locale,
    currency,
    offset: (page - 1) * ORDER_DEFAULT_LIMIT,
    sort: 'createdAt desc',
  })

  const { paging, results } = data ?? {}

  const title = intl.formatMessage({ id: 'account.orders.title' })
  const notFoundTitle = intl.formatMessage({
    id: 'account.orders.notFound.title',
  })
  const notFoundDescription = intl.formatMessage({
    id: 'account.orders.notFound.description',
  })
  const notFoundButtonLabel = intl.formatMessage({
    id: 'account.orders.notFound.button',
  })
  const viewOrderLabel = intl.formatMessage({ id: 'account.orders.viewOrder' })

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  if (isLoading) {
    return <CartLoadingState />
  }

  return (
    <Container maxW='container.2xl' px='4'>
      <DashboardContentLayout
        title={title}
        subTitle={intl.formatMessage(
          { id: 'account.orders.ordersCount' },
          { numOrders: paging?.total }
        )}
      >
        {results && results.length > 0 ? (
          <>
            {results?.map((order) => {
              const orderTotal = intl.formatNumber(
                order.price.total / 100,
                formatNumberOptions
              )

              return (
                <OrderCard
                  key={order.id}
                  numberOfItems={order.itemsTotalQuantity}
                  orderDate={intl.formatDate(order.createdAt, {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                  orderNumber={order.id}
                  orderState={order.status}
                  orderTotal={orderTotal}
                  shippingAddress={order.shippingAddress}
                  viewOrderLabel={viewOrderLabel}
                  onOrderCancelSuccess={refetch}
                />
              )
            })}

            <Pagination
              showText={true}
              onPageChange={(page) => setPage(page)}
              activePage={page}
              itemsPerPage={ORDER_DEFAULT_LIMIT}
              totalRecords={paging?.total ?? 0}
              variant='outline'
            />
          </>
        ) : (
          <OrderHistoryEmpty
            title={notFoundTitle}
            description={notFoundDescription}
            buttonLabel={notFoundButtonLabel}
            buttonHref={path.getHome()}
          />
        )}
      </DashboardContentLayout>
    </Container>
  )
}

interface IOrderDetailShippingAddress {
  receiver: string
  address: string
  phone?: string
}

interface OrderDetailsProps {
  numberOfItems: number
  orderDate: string
  orderNumber: string
  orderState: 'Open' | 'Cancelled' | 'Complete' | 'Confirmed'
  orderTotal: string
  shippingAddress?: ComposableAddress
  viewOrderLabel: string
  onOrderCancelSuccess?: () => void
}

export const orderStatesVariant = {
  Open: 'solid-orange',
  Confirmed: 'solid-green',
  Complete: 'solid-green',
  Cancelled: 'solid-gray',
}

const OrderCard = ({
  numberOfItems,
  orderDate,
  orderNumber,
  orderState,
  orderTotal,
  shippingAddress,
  viewOrderLabel,
  onOrderCancelSuccess,
}: OrderDetailsProps) => {
  const intl = useIntl()
  const dividerOn = useBreakpointValue({
    md: <></>,
    base: <StackDivider borderColor='gray.200' />,
  })

  const addressLabels = getAddressLabels(shippingAddress)

  return (
    <Stack spacing='4' mb='5'>
      <Box
        borderColor='shading.100'
        borderWidth={1}
        py={{ base: '4', md: '8' }}
        px='5'
        w='full'
      >
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: '4', md: '10' }}
          justify='space-between'
        >
          <Stack>
            <Stack justify='space-between'>
              <Tag
                w='fit-content'
                variant={orderStatesVariant[orderState] ?? ''}
                textTransform='uppercase'
              >
                {orderState}
              </Tag>
              <Text as='h3' textStyle='desktop-200'>
                {intl.formatMessage(
                  { id: 'account.orders.label' },
                  { orderNumber: orderNumber.split('-')[0].toUpperCase() }
                )}
              </Text>
            </Stack>

            <Spacer h='4' />

            <Stack
              w='fit-content'
              spacing={{ base: 0, md: '2' }}
              divider={dividerOn}
              gap='2'
            >
              <OrderInfoItem
                label={intl.formatMessage({ id: 'account.orders.date' })}
                value={orderDate}
              />
              <OrderInfoItem
                label={intl.formatMessage({ id: 'account.orders.shipTo' })}
              >
                <Stack spacing={0}>
                  <Text textStyle='blockquote-50'>{addressLabels?.name}</Text>
                  <Text textStyle='blockquote-50'>
                    {addressLabels?.address}
                  </Text>
                  {shippingAddress?.phoneNumber && (
                    <Text textStyle='blockquote-50'>
                      {shippingAddress.phoneNumber}
                    </Text>
                  )}
                </Stack>
              </OrderInfoItem>
              <OrderInfoItem
                label={intl.formatMessage({
                  id:
                    numberOfItems > 1
                      ? 'account.orders.numberOfItems'
                      : 'account.orders.numberOfItem',
                })}
                value={numberOfItems}
              />
              <OrderInfoItem
                label={intl.formatMessage({ id: 'account.orders.total' })}
                value={orderTotal}
              />
            </Stack>
          </Stack>
          <Stack direction={{ base: 'column', md: 'row' }}>
            <Button
              variant='outline'
              as={NextLink}
              href={`order/${orderNumber}`}
              aria-label={`${viewOrderLabel} #${orderNumber
                .split('-')[0]
                .toUpperCase()}, status ${orderState}`}
            >
              {viewOrderLabel}
            </Button>
            {orderState === 'Open' && (
              <CancelOrderButton
                orderId={orderNumber}
                onOrderCancelSuccess={onOrderCancelSuccess}
                buttonProps={{
                  variant: 'ghost',
                  color: 'black',
                  width: { base: 'full', md: 'fit-content' },
                }}
              />
            )}
          </Stack>
        </Stack>
      </Box>
    </Stack>
  )
}

interface OrderInfoItemProps {
  label: string
  value?: string | number
  children?: ReactNode
}

export const OrderInfoItem = ({
  label,
  value,
  children,
}: OrderInfoItemProps) => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} fontSize='sm'>
      <Text textStyle='blockquote-50' fontWeight='medium' color='text-muted'>
        {label}
      </Text>
      {value ? <Text textStyle='blockquote-50'>{value}</Text> : children}
    </SimpleGrid>
  )
}
