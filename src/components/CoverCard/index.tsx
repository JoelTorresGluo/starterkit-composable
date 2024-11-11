import { Box, BoxProps, LinkOverlay } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'

export interface CoverCardProps {
  priority?: boolean
  theme?: CoverCardTheme
  textAlign?: CoverCardTextAlign
  root?: Omit<BoxProps, 'children'>
  image?: {
    src?: string
    alt?: string
    height?: number
  }
  eyebrow?: BoxProps
  title?: BoxProps
  description?: BoxProps
  href?: string
  overlayBackground?: string
}

export type CoverCardTheme = 'light' | 'dark'
export type CoverCardTextAlign = 'left' | 'center' | 'right'

export const CoverCard = ({
  priority = false,
  theme = 'dark',
  textAlign = 'left',
  root,
  image,
  eyebrow,
  title,
  description,
  href,
  overlayBackground = overlayBackgroundValue[theme],
}: CoverCardProps) => {
  // TODO: Replace pixel values with tokens.
  const minHeight: BoxProps['minHeight'] = root?.minHeight ?? [
    '280px',
    null,
    '375px',
  ]

  return (
    <Box
      minHeight={minHeight}
      position='relative'
      px={{ base: 4, xs: 6 }}
      py={{ base: 6, xs: 12 }}
      {...root}
    >
      <Box
        position='absolute'
        top='none'
        left='none'
        w='full'
        h={`${image?.height || '100'}%`}
      >
        {image?.src && (
          <Image
            priority={priority}
            src={image.src ?? ''}
            alt={image?.alt ?? ''}
            fill={true}
          />
        )}
        <Box
          position='absolute'
          top='none'
          left='none'
          w='full'
          h='full'
          bg={overlayBackground}
        />
      </Box>

      <Box
        position='relative'
        display='initial'
        flexDirection='column'
        justifyContent='end'
        alignItems='stretch'
        w='full'
        textAlign={textAlign}
        minHeight={minHeight}
      >
        {eyebrow?.children && (
          <Box
            textStyle={{ base: 'eyebrow-50', xs: 'eyebrow-75' }}
            layerStyle={`${theme}-text`}
            maxW='initial'
            {...eyebrow}
          />
        )}
        {title?.children && (
          <Box
            as='h2'
            textStyle={{ base: 'mobile-300', xs: 'desktop-300' }}
            layerStyle={`${theme}-text`}
            my='1'
            {...title}
          >
            <LinkOverlay as={NextLink} href={href ?? ''}>
              {title.children}
            </LinkOverlay>
          </Box>
        )}
        {description?.children && (
          <Box
            textStyle={{ base: 'blockquote-75', xs: 'blockquote-100' }}
            layerStyle={`${theme}-text`}
            {...description}
          />
        )}
      </Box>
    </Box>
  )
}

const overlayBackgroundValue: Record<CoverCardTheme, string> = {
  dark: 'rgba(0, 0, 0, 0.5)',
  light: 'rgba(255, 255, 255, 0.5)',
}
