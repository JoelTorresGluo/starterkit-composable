import NextLink from 'next/link'
import Image from 'next/image'
import {
  AspectRatio,
  Box,
  BoxProps,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react'

export interface ArticleCardProps {
  priority?: boolean
  root?: Omit<BoxProps, 'children'>
  textAlign?: ArticleCardTextAlign
  image?: {
    src?: string
    alt?: string
    ratio?: number
  }
  eyebrow?: BoxProps
  title?: BoxProps
  description?: BoxProps
  href?: string
}

export type ArticleCardTextAlign = 'left' | 'center' | 'right'

export const ArticleCard = ({
  priority = false,
  textAlign = 'left',
  root,
  image,
  eyebrow,
  title,
  description,
  href,
}: ArticleCardProps) => {
  return (
    <LinkBox
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='stretch'
      textAlign={textAlign}
      {...root}
    >
      {image?.src && (
        <AspectRatio
          ratio={image?.ratio ?? 4 / 3}
          position='relative'
          w='full'
          overflow='hidden'
          mb='3'
        >
          <Image
            priority={priority}
            src={image.src ?? ''}
            alt={image?.alt ?? ''}
            fill={true}
            style={{ objectFit: 'cover' }}
          />
        </AspectRatio>
      )}
      {eyebrow?.children && (
        <Box
          textStyle={{ base: 'eyebrow-50', md: 'eyebrow-75' }}
          textColor='text-muted'
          maxW='initial'
          {...eyebrow}
        />
      )}
      {title?.children && (
        <Box
          as='h3'
          flexGrow='1'
          textStyle={{ base: 'mobile-200', md: 'desktop-200' }}
          textColor='text'
          my='1'
        >
          <LinkOverlay as={NextLink} href={href ?? ''}>
            {title.children}
          </LinkOverlay>
        </Box>
      )}
      {description?.children && (
        <Box textStyle='body-75-100' textColor='text' {...description} />
      )}
    </LinkBox>
  )
}
