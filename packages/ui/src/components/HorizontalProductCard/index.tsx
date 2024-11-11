import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  CloseButton,
  CloseButtonProps,
  DividerProps,
  Flex,
  FlexProps,
  Image,
  ImageProps,
  Stack,
} from '@chakra-ui/react'

type DefaultStyleOption = {
  productSectionStyle: FlexProps
  imageBoxStyle: ImageProps
}

type DefaultStylesTyps = {
  full: DefaultStyleOption
  mini: DefaultStyleOption
}

// TODO: Replace pixel values with tokens.
const DefaultStyles: DefaultStylesTyps = {
  full: {
    productSectionStyle: {
      align: 'flex-start',
      justify: 'space-between',
      direction: { base: 'column', sm: 'row' },
      ml: { base: 3, lg: 12 },
    },
    imageBoxStyle: {
      minW: '145px',
      w: '145px',
      h: { base: '192px', lg: '175px' },
    },
  },
  mini: {
    productSectionStyle: {},
    imageBoxStyle: {
      minW: '100px',
      w: '100px',
      h: { base: '120px', lg: '150px' },
    },
  },
}

export interface HorizontalProductCardProps {
  brand?: BoxProps
  closeButtonProps?: CloseButtonProps
  deleteButton?: ButtonProps
  dividerProps?: DividerProps
  image?: {
    src: string
    alt: string
    onClickImage?: () => void
  }
  imageProps?: ImageProps
  imageSection?: React.ReactElement
  name?: BoxProps
  onClickCloseButton?: () => void
  price?: BoxProps
  productSection?: React.ReactElement
  productSectionProps?: FlexProps
  quantity?: BoxProps
  rootProps?: BoxProps
  variant?: 'full' | 'mini'
}

export const HorizontalProductCard = ({
  brand,
  closeButtonProps,
  deleteButton,
  image,
  imageProps,
  imageSection,
  name,
  onClickCloseButton,
  price,
  productSection,
  productSectionProps,
  quantity,
  rootProps,
  variant = 'full',
}: HorizontalProductCardProps) => {
  return (
    <Box {...rootProps}>
      {variant === 'mini' && typeof onClickCloseButton === 'function' && (
        <Box position='relative'>
          <CloseButton
            position='absolute'
            right='-5px'
            mt='-10px'
            onClick={() => onClickCloseButton()}
            fontSize={{ base: '2xs', md: 'xs' }}
            {...closeButtonProps}
          />
        </Box>
      )}
      <Flex justify='space-between'>
        {imageSection ?? (
          <Button display='contents' onClick={() => image?.onClickImage?.()}>
            <Box
              borderWidth='1px'
              overflow='hidden'
              {...DefaultStyles[variant].imageBoxStyle}
            >
              <Image
                src={image?.src ?? ''}
                alt={image?.alt ?? ''}
                draggable='false'
                fit='contain'
                h='full'
                w='full'
                {...imageProps}
              />
            </Box>
          </Button>
        )}
        <Flex
          ml='4'
          w='full'
          {...DefaultStyles[variant].productSectionStyle}
          {...productSectionProps}
        >
          {productSection ?? (
            <Flex
              w='full'
              direction={{
                base: 'column',
                lg: variant === 'full' ? 'row' : 'column',
              }}
            >
              <Box w='full'>
                {brand?.children && (
                  <Box textStyle='body-25-50' color='text-muted' {...brand} />
                )}
                {name?.children && (
                  <Box
                    textStyle='blockquote-75-100'
                    fontWeight='450'
                    paddingRight={3}
                    {...name}
                  />
                )}
                {price?.children && (
                  <Box textStyle='blockquote-75-100' {...price} />
                )}
              </Box>
              <Stack>
                {quantity?.children && (
                  <Box
                    minW='20'
                    textStyle='blockquote'
                    color='text-muted'
                    {...quantity}
                  />
                )}
                {deleteButton?.children && (
                  <Button
                    maxW='10'
                    variant='ghost'
                    size='xs'
                    fontWeight='bold'
                    color='text'
                    _hover={{
                      textDecoration: 'underline',
                    }}
                    {...deleteButton}
                  />
                )}
              </Stack>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
