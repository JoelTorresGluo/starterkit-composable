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
import { Carousel, CarouselSlide, useCarousel } from '@oriuminc/ui'

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
  showDotNavigation?: boolean
}

export const Gallery = (props: GalleryProps) => {
  const { images, aspectRatio = 4 / 3, rootProps, showDotNavigation } = props
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
    <Stack
      // TODO: Investigate if img role value is necessary or correct
      role='img'
      spacing='4'
      {...rootProps}
    >
      <Box position='relative' tabIndex={0}>
        <Carousel ref={ref}>
          {images.map((image, i) => (
            <CarouselSlide key={image.src}>
              <ElementLinkHandler href={props.href}>
                <AspectRatio
                  ratio={aspectRatio}
                  transition='all 200ms'
                  opacity={currentSlide === i ? 1 : 0.4}
                  bg='gray.200'
                  _hover={{ opacity: 1 }}
                >
                  <Image
                    alt={image.alt}
                    aria-label={image.alt}
                    src={image.src}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    // TODO: Replace pixel value with token.
                    sizes={image.sizes ?? '500px'}
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
            icon={<IoChevronBackOutline />}
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
            icon={<IoChevronForwardOutline />}
            aria-label='Next Slide'
          />
        )}
      </Box>
      {showDotNavigation && images.length > 1 && (
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
  )
}

const CarouselIconButton = (props: IconButtonProps) => (
  <IconButton
    display='flex'
    borderRadius='sm'
    boxShadow='base'
    bg='shading.200'
    opacity='0.8'
    color='text'
    _hover={{ bg: 'shading.300' }}
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
