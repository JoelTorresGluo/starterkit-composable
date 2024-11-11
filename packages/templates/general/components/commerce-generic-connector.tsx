'use client'

import { Button, Container, Flex, HStack, Text } from '@chakra-ui/react'
import { useComposable } from '@oriuminc/base'
import { ProductCard } from '@oriuminc/ui'
import { useRouter } from 'next/router'
import { useId } from 'react'

export interface GenericConnectorProps {
  sectionTitle?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  ctaHeight?: string | null
  ctaMaxWidth?: string | null
  ctaMinWidth?: string | null
  products?: {
    name: string
    slug: string
    brand?: string | null
    img?: {
      url?: string
      alt?: string
    }
    price?: PriceProps
  }[]
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
  } = props
  const { path } = useComposable()
  const router = useRouter()
  const genericConnectorId = `generic-connector-title-${useId()}`

  if (!products || products.length === 0) return null

  return (
    <>
      <Container
        as='aside'
        aria-labelledby={genericConnectorId}
        maxW='container.2xl'
        px={{ base: 'sm', md: 'xl' }}
        py={{ base: 'sm', md: 'lg' }}
      >
        <Flex
          gap={{ base: 2, md: '2-5' }}
          mb={{ base: 8, md: 12 }}
          justifyContent='space-between'
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
            <Button onClick={() => router.push(ctaHref)}>{ctaLabel}</Button>
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
              href={path.getPDP({ slug: product.slug })}
              price={{
                children: product.price && <Price {...product.price} />,
              }}
              root={{
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
