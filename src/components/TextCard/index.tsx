import Image from 'next/image'
import NextLink from 'next/link'
import { Box, BoxProps, Button, ButtonProps } from '@chakra-ui/react'

export interface TextCardProps {
  priority?: boolean
  root?: Omit<BoxProps, 'children'>
  theme?: TextCardTheme
  title?: BoxProps
  description?: BoxProps
  button?: ButtonProps & { href?: string }
  image?: {
    src?: string
    alt?: string
  }
  textAlign?: TextCardTextAlign
}

export type TextCardTextAlign = 'left' | 'center' | 'right'
export type TextCardTheme = 'dark' | 'light' | 'highlight'

export const TextCard = ({
  priority = false,
  theme = 'dark',
  textAlign = 'center',
  image,
  description,
  title,
  button,
  root,
}: TextCardProps) => {
  const alignItems = alignItemsValue[textAlign]
  // TODO: Replace pixel values with tokens.
  const minHeight: BoxProps['minHeight'] = root?.minHeight ?? {
    base: '280px',
    xs: '375px',
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      layerStyle={theme}
      alignItems={alignItems}
      textAlign={textAlign}
      px={{ base: 4, xs: 6 }}
      py={{ base: 6, xs: 12 }}
      minHeight={minHeight}
      {...root}
    >
      {image?.src && (
        <Box mb='6'>
          <Image
            priority={priority}
            src={image.src}
            alt={image?.alt ?? ''}
            width='50'
            height='50'
          />
        </Box>
      )}

      {title?.children && (
        <Box
          as='h2'
          textStyle={{ base: 'mobile-300', xs: 'desktop-300' }}
          mb='1'
          {...title}
        />
      )}

      {description?.children && (
        <Box textStyle='blockquote-100' {...description} />
      )}

      {button?.children && !button?.href && (
        <Button
          layerStyle={theme}
          variant='ghost'
          mt='4'
          flexGrow='0'
          {...button}
        />
      )}

      {button?.children && button?.href && (
        <Button
          as={NextLink}
          href={button.href ?? ''}
          layerStyle={theme}
          mt='4'
          variant='ghost'
          flexGrow='0'
          px={textAlign !== 'center' ? 0 : undefined}
          _hover={{
            bg: 'none',
          }}
          _active={{
            bg: 'none',
          }}
          {...button}
        />
      )}
    </Box>
  )
}

const alignItemsValue: Record<TextCardTextAlign, ButtonProps['alignItems']> = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
}
