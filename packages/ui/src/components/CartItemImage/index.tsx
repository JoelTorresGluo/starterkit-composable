import {
  Box,
  Image,
  BoxProps,
  ImageProps,
  Button,
  ButtonProps,
} from '@chakra-ui/react'

interface CartItemImageProps {
  name: string
  placeholderImage: string
  onClick?: () => void
  imageHref?: string
  boxProps?: BoxProps
  imageProps?: ImageProps
  rootProps?: ButtonProps
}

/**
 * @deprecated since version 2.x
 * This UI component will be removed
 *
 */
export const CartItemImage = ({
  name,
  placeholderImage,
  onClick,
  boxProps,
  imageProps,
  rootProps,
  imageHref,
}: CartItemImageProps) => {
  return (
    <Button display='contents' onClick={() => onClick?.()} {...rootProps}>
      <Box
        // TODO: Replace pixel and color values with tokens.
        w='145px'
        minW='145px'
        h={{ base: '213px', md: '175px' }}
        borderWidth='1px'
        overflow='hidden'
        bg='red'
        {...boxProps}
      >
        <Image
          fit='contain'
          src={imageHref || placeholderImage}
          alt={name}
          draggable='false'
          loading='lazy'
          w='full'
          h='full'
          {...imageProps}
        />
      </Box>
    </Button>
  )
}
