'use client'

import Image from 'next/image'
import { Box, BoxProps, Flex, useToken } from '@chakra-ui/react'

export interface BannerImageProps {
  priority?: boolean
  root?: BoxProps
  imageBox?: BoxProps
  imageDesktop?: {
    src?: string
    alt?: string
  }
  imageMobile?: {
    src?: string
    alt?: string
  }
  overlayBackground?: string
}

export const BannerImage = ({
  priority = false,
  imageDesktop,
  imageMobile,
  imageBox,
  overlayBackground,
  root,
}: BannerImageProps) => {
  const [size56] = useToken('sizes', ['sizes.56'])

  const imageBase: BoxProps = {
    position: 'relative',
    w: 'full',
    minH: { base: 72, lg: `calc(${size56} * 2)` },
    overflow: 'hidden',
  }

  if (!imageDesktop?.src && !imageMobile?.src) {
    return null
  }

  return (
    <Flex alignItems='stretch' role='presentation' {...root}>
      <Box display={{ base: 'none', xs: 'block' }} {...imageBase} {...imageBox}>
        <Image
          src={imageDesktop?.src || imageMobile?.src || ''}
          alt={imageDesktop?.alt || imageMobile?.alt || ''}
          fill={true}
          style={{ objectFit: 'cover' }}
          priority={priority}
        />
        {overlayBackground && (
          <Box
            position='absolute'
            inset='none'
            background={overlayBackground}
          />
        )}
      </Box>

      <Box display={['block', 'block', 'none']} {...imageBase} {...imageBox}>
        <Image
          src={imageMobile?.src || imageDesktop?.src || ''}
          alt={imageMobile?.alt || imageDesktop?.alt || ''}
          fill={true}
          style={{ objectFit: 'cover' }}
          priority={priority}
        />
        {overlayBackground && (
          <Box position='absolute' inset='none' bg={overlayBackground} />
        )}
      </Box>
    </Flex>
  )
}
