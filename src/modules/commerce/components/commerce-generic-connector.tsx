'use client'

import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { useAlgoliaInsights } from '@oriuminc/algolia'
import { ProductCard } from '@oriuminc/ui'
import NextLink from 'next/link'
import { useId } from 'react'

export interface GenericConnectorProps {
  sectionTitle?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  ctaHeight?: string | null
  ctaMaxWidth?: string | null
  ctaMinWidth?: string | null
  products?: {
    id: string
    name: string
    slug: string
    brand?: string | null
    img?: {
      url?: string
      alt?: string
    }
    price?: PriceProps
  }[]
  prefetch?: boolean | undefined
}

export interface PriceProps {
  current: number
  currentFormatted: string
  regular?: number
  regularFormatted?: string
}

// TODO: use the ComposableProduct type here
export const GenericConnector = (props: GenericConnectorProps) => {
  const {
    sectionTitle,
    ctaLabel,
    ctaHref,
    products,
    ctaHeight,
    ctaMaxWidth,
    ctaMinWidth,
    prefetch,
  } = props
  const { trackAlgoliaClickedObjectIDs } = useAlgoliaInsights()
  const genericConnectorId = `generic-connector-title-${useId()}`

  if (!products || products.length === 0) return null

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
          aria-labelledby={genericConnectorId}
        >
          <Text
            as='h2'
            alignSelf='flex-end'
            textStyle={{ base: 'body-100-300', md: 'body-300-500' }}
            color='primary'
            id={genericConnectorId}
          >
            {sectionTitle}
          </Text>
          {ctaLabel && ctaHref && (
            <Button as={NextLink} href={ctaHref}>
              {ctaLabel}
            </Button>
          )}
        </Flex>

        <Flex
          alignItems='baseline'
          wrap='wrap'
          justifyContent='space-evenly'
          gap='2'
        >
          {products?.map((product, idx: number) => (
            <ProductCard
              prefetch={prefetch}
              key={idx}
              brand={{
                children: <Text>{product.brand}</Text>,
              }}
              name={{
                children: <Text>{product.name}</Text>,
              }}
              image={{
                src: product.img?.url || '',
                alt: product.img?.alt,
                ratio: 1,
              }}
              href={`/product/${product.slug}`}
              price={{
                children: product.price && <Price {...product.price} />,
              }}
              root={{
                onClick: () => {
                  trackAlgoliaClickedObjectIDs({ objectIDs: [product.id] })
                },
                // TODO: Replace pixel values with tokens.
                minWidth: ctaMinWidth || '150px',
                maxW: ctaMaxWidth || '200px',
                ...(ctaHeight && { height: ctaHeight }),
                flex: 1,
              }}
            />
          ))}
        </Flex>
      </Container>
    </>
  )
}

const Price = (props: PriceProps) => {
  const { regular = 0, current, currentFormatted, regularFormatted } = props
  const hasSpecialPrice = Boolean(current < regular)

  if (!regular && !current) {
    return null
  }

  return (
    <HStack spacing='1'>
      <Text
        as='span'
        textStyle='blockquote'
        color='text'
        textDecoration={hasSpecialPrice ? 'line-through' : 'none'}
      >
        {hasSpecialPrice ? regularFormatted : currentFormatted}
      </Text>

      {hasSpecialPrice && (
        <Text as='span' textStyle='blockquote' color='danger.600'>
          {currentFormatted}
        </Text>
      )}
    </HStack>
  )
}
