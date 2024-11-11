import { FormatNumberOptions } from 'react-intl'
import { Container, Flex, Skeleton } from '@chakra-ui/react'

import { Currency, Locale, getCurrency } from '@oriuminc/base'
import { ComposableProductSearchQueryParams } from '@oriuminc/commerce-generic'

import { GenericConnector, GenericConnectorProps } from '@modules/commerce'
import { PREFETCH_PRODUCT_CARD_LINKS } from '@modules/general'
import { getServerIntl } from '@modules/intl'
import { getServerLocale } from '@modules/server/server-context'
import { staticApi } from '@modules/trpc/server'

interface ComponentProductsConnectorProps {
  title?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  query?: ComposableProductSearchQueryParams
}

export const ComponentProductsConnector = async (
  props: ComponentProductsConnectorProps
) => {
  const locale = getServerLocale()
  const intl = await getServerIntl(locale)
  const currency = getCurrency(locale)

  const { title, ctaLabel, ctaHref, query } = props

  const productsData = await staticApi.commerce.getProducts({
    query,
    locale: locale as Locale,
    currency: currency as Currency,
  })

  const products = productsData?.results

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  if (!products) return null

  const genericProducts: GenericConnectorProps['products'] = products?.map(
    (product) => {
      const masterVariant = product.variants[0]
      const currentPrice = masterVariant?.price?.current
      const originalPrice = masterVariant?.price?.original
      const brand = masterVariant?.attributes?.find(
        (attr) => attr.name === 'brand'
      )?.value
      return {
        id: product.id,
        name: product.title ?? '',
        slug: product.slug ?? '',
        brand: brand ? `${brand}` : undefined,
        img: {
          url: masterVariant?.images?.[0].url ?? '',
          alt: product.title ?? undefined,
        },
        price: {
          regular: originalPrice!.amount,
          current: currentPrice!.amount,
          regularFormatted: intl.formatNumber(
            originalPrice!.amount / 100,
            formatNumberOptions
          ),
          currentFormatted: intl.formatNumber(
            currentPrice!.amount / 100,
            formatNumberOptions
          ),
        },
      }
    }
  )

  return (
    <GenericConnector
      sectionTitle={title}
      ctaHref={ctaHref}
      ctaLabel={ctaLabel}
      products={genericProducts}
      prefetch={PREFETCH_PRODUCT_CARD_LINKS}
    />
  )
}

export const ProductConnectorSkeleton = () => {
  return (
    <>
      <Container
        maxW='container.2xl'
        px={{ base: 'sm', md: 'xl' }}
        py={{ base: 'sm', md: 'lg' }}
      >
        <Flex
          gap={{ base: 2, md: '2-5' }}
          mb={{ base: 8, md: 12 }}
          justifyContent='space-between'
          as='aside'
        >
          <Skeleton height='40px' width='300px' />
          <Skeleton height='40px' width='200px' />
        </Flex>

        <Flex
          alignItems='baseline'
          wrap='wrap'
          justifyContent='space-evenly'
          gap='2'
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} height='350px' width='200px' />
          ))}
        </Flex>
      </Container>
    </>
  )
}
