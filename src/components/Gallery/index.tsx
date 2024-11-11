'use client'

import { useState } from 'react'
import Image from 'next/image'
import NextLink from 'next/link'
import {
  AspectRatio,
  Box,
  Circle,
  HStack,
  IconButton,
  Link,
  IconButtonProps,
  Skeleton,
  Stack,
  StackProps,
} from '@chakra-ui/react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'
import { Carousel, CarouselSlide, useCarousel } from '../Carousel'

export type GalleryStyle = 'slide-show' | 'blog' | undefined
export interface GalleryProps {
  images?: Array<{
    src: string
    alt: string
    dimensions?: { width: number; height: number }
    sizes?: string
  }>
  href?: string
  aspectRatio?: number
  rootProps?: StackProps
  style?: {
    base: GalleryStyle
    lg: GalleryStyle
  }
}

const getDisplayStyle = (
  styleType: GalleryStyle,
  style?: GalleryProps['style']
) => ({
  base: style?.base === styleType ? 'initial' : 'none',
  lg: style?.lg === styleType ? 'initial' : 'none',
})

export const Gallery = (props: GalleryProps) => {
  const {
    images,
    aspectRatio = 4 / 3,
    rootProps,
    style = { base: 'blog', lg: 'blog' },
  } = props
  const [currentSlide, setCurrentSlide] = useState(0)

  const [ref, slider] = useCarousel({
    slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
    destroyed: () => setCurrentSlide(0),
  })

  if (!images) {
    return (
      <Stack spacing='4' {...rootProps}>
        <ElementLinkHandler href={props.href}>
          <AspectRatio ratio={aspectRatio} w='full' bg='gray.200'>
            <Skeleton w='full' />
          </AspectRatio>
        </ElementLinkHandler>
      </Stack>
    )
  }

  const hasPrevious = currentSlide !== 0
  const hasNext = currentSlide < images.length - 1

  return (
    <>
      {/* slide-show */}
      <Stack
        display={getDisplayStyle('slide-show', style)}
        role='img'
        spacing='4'
        aria-label='Product Image Gallery'
        {...rootProps}
      >
        <Box
          position='relative'
          sx={{
            _hover: {
              '> button': {
                display: 'inline-flex',
              },
            },
          }}
        >
          <Carousel ref={ref}>
            {images.map((image, i) => (
              <CarouselSlide key={i}>
                <ElementLinkHandler href={props.href}>
                  <AspectRatio
                    ratio={aspectRatio}
                    transition='all 200ms'
                    opacity={currentSlide === i ? 1 : 0.4}
                    bg='white'
                    _hover={{ opacity: 1 }}
                  >
                    <Image
                      role='img'
                      alt={image.alt || `Product image ${i + 1}`}
                      aria-label={image.alt || `Product image ${i + 1}`}
                      src={image.src}
                      fill={true}
                      style={{ objectFit: 'contain' }}
                      sizes={image.sizes}
                      priority={i === 0}
                    />
                  </AspectRatio>
                </ElementLinkHandler>
              </CarouselSlide>
            ))}
          </Carousel>
          {hasPrevious && (
            <CarouselIconButton
              pos='absolute'
              left='3'
              top='50%'
              transform='translateY(-50%)'
              onClick={() => slider.current?.prev()}
              icon={<IoChevronBackOutline color='black' />}
              aria-label='Previous Slide'
            />
          )}
          {hasNext && (
            <CarouselIconButton
              pos='absolute'
              right='3'
              top='50%'
              transform='translateY(-50%)'
              onClick={() => slider.current?.next()}
              icon={<IoChevronForwardOutline color='black' />}
              aria-label='Next Slide'
            />
          )}
        </Box>
        {images.length > 1 && (
          <HStack position='relative' w='full' justify='center'>
            {images.map((_, index) => (
              <Circle
                key={index}
                size='2'
                bg={currentSlide === index ? 'primary' : 'accent'}
              />
            ))}
          </HStack>
        )}
      </Stack>
      {/* // blog (Default) */}
      <Stack
        display={getDisplayStyle('blog', style)}
        role='img'
        aria-label='Product Image Gallery'
        {...rootProps}
      >
        {images.map((image, i) => {
          const { width: w, height: h } = image.dimensions ?? {}
          const imageRatio =
            w && h ? (w / h > 0.75 ? w / h : 0.75) : aspectRatio
          return (
            <ElementLinkHandler key={i} href={props.href}>
              <AspectRatio ratio={imageRatio}>
                <Image
                  role='img'
                  alt={image.alt || `Product image ${i + 1}`}
                  aria-label={image.alt || `Product image ${i + 1}`}
                  src={image.src}
                  fill={true}
                  style={{ objectFit: 'contain' }}
                  sizes={image.sizes}
                  priority={i === 0}
                />
              </AspectRatio>
            </ElementLinkHandler>
          )
        })}
      </Stack>
    </>
  )
}

const CarouselIconButton = (props: IconButtonProps) => (
  <IconButton
    display='none'
    fontSize='lg'
    isRound
    boxShadow='base'
    bg='white'
    _hover={{
      bg: 'gray.100',
    }}
    _active={{
      bg: 'gray.200',
    }}
    _focus={{ boxShadow: 'inerhit' }}
    _focusVisible={{ boxShadow: 'outline' }}
    {...props}
  />
)

const ElementLinkHandler = (props: {
  children: React.ReactElement
  href?: string
}) => {
  return props.href ? (
    <Link as={NextLink} href={props.href}>
      {props.children}
    </Link>
  ) : (
    props.children
  )
}
