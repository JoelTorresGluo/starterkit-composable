import NextLink from 'next/link'
import Image from 'next/image'
import React, { useId } from 'react'
import {
  AspectRatio,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  LinkBox,
  LinkOverlay,
  Text,
} from '@chakra-ui/react'

export interface ProductCardProps {
  root?: Omit<BoxProps, 'children'>
  topLeft?: BoxProps
  image?: {
    src?: string
    alt?: string
    ratio?: number
    sizes?: string
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  }
  brand?: BoxProps
  name?: BoxProps
  href?: string
  price?: BoxProps
  button?: ButtonProps
  prefetch?: boolean | undefined
}

const extractStringValue = (element: React.ReactNode): string | undefined => {
  if (typeof element === 'string') {
    return element
  }

  // Check if it's a ReactElement
  if (React.isValidElement(element)) {
    if (typeof element.props.children === 'string') {
      return element.props.children
    }
    if (typeof element.props.currentFormatted === 'string') {
      return element.props.currentFormatted
    }
  }

  return undefined
}

export const ProductCard = ({
  root,
  topLeft,
  image,
  brand,
  name,
  href,
  price,
  button,
  prefetch,
}: ProductCardProps) => {
  const ariaName = extractStringValue(name?.children)
  const ariaPrice = extractStringValue(price?.children)
  const ariaBrand = extractStringValue(brand?.children)
  const ariaLabel = [ariaName, ariaPrice, ariaBrand].filter(Boolean).join(', ')
  const productCardId = `product-card-title-${useId()}`

  return (
    <LinkBox
      as='article'
      display='flex'
      aria-labelledby={productCardId}
      flexDirection='column'
      justifyContent='center'
      {...root}
    >
      {image?.src && (
        <AspectRatio
          ratio={image?.ratio ?? 1}
          position='relative'
          w='full'
          overflow='hidden'
          mb='4'
        >
          <Image
            src={image.src ?? ''}
            alt={image?.alt ?? ''}
            fill={true}
            style={{ objectFit: image.objectFit || 'contain' }}
            sizes={image.sizes}
          />
        </AspectRatio>
      )}
      {topLeft?.children && (
        <Box position='absolute' top='none' left='none' {...topLeft} />
      )}
      {brand?.children && (
        <Box
          textStyle={{ base: 'body-50', xs: 'body-75' }}
          textColor='text-muted'
          {...brand}
        />
      )}
      {name?.children && (
        <Text
          as='h3'
          textStyle={{ base: 'body-75', xs: 'body-100' }}
          my='1'
          id={productCardId}
        >
          <LinkOverlay
            as={NextLink}
            prefetch={prefetch}
            href={href ?? ''}
            textColor='text'
            aria-label={ariaLabel}
            textStyle={{ base: 'body-75', md: 'body-100' }}
            _hover={{ textDecor: 'underline', color: 'primary' }}
          >
            {name.children}
          </LinkOverlay>
        </Text>
      )}
      {price?.children && (
        <Box
          textStyle={{ base: 'mobile-75', xs: 'desktop-75' }}
          textColor='text'
          {...price}
        />
      )}
      {button?.children && <Button mt='4' size='md' w='full' {...button} />}
    </LinkBox>
  )
}
