import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  CloseButton,
  Button,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { HorizontalProductCardCommon, ProductCardLayout } from './types'

export interface HorizontalProductCardReadOnlyProps
  extends HorizontalProductCardCommon {}

const getGridConfig: (labels: {
  quantityLabel: string
  itemPriceLabel: string
}) => ProductCardLayout = ({ quantityLabel, itemPriceLabel }) => ({
  2: {
    sm: {
      areas: `
                    ". . remove"
                    "img brand brand"
                    "img name name"
                    "img price price"
                    "img quantity quantity"
                `,
      columns: 'auto 1fr auto',
      removeButton: 'icon',
      image: {
        width: 100,
        height: 100,
      },
      quantity: {
        display: 'inline',
        label: `${quantityLabel}: `,
      },
    },
    lg: {
      areas: `
                    ". . remove"
                    "img brand brand"
                    "img name name"
                    "img price price"
                    "img quantity quantity"
                `,
      columns: 'auto 1fr auto',
      removeButton: 'icon',
      image: {
        width: 100,
        height: 100,
      },
      quantity: {
        display: 'inline',
        label: `${quantityLabel}: `,
      },
    },
  },
  3: {
    sm: {
      areas: `
                    "img . . remove"
                    "img brand brand brand"
                    "img name name name"
                    "img price price price"
                    "img details details details"
                    "img wishlist wishlist wishlist"
                    "meta meta meta meta"
                `,
      columns: 'auto 1fr 1fr auto',
      rows: '5px auto auto auto auto auto auto',
      removeButton: 'icon',
      image: {
        width: 100,
        height: 100,
      },
    },
    lg: {
      areas: `
                    "img brand brand price"
                    "img name name price"
                    "img details details price"
                    "img meta wishlist remove"
                `,
      columns: 'auto 1fr auto auto',
      rows: 'auto auto 1fr auto',
      removeButton: 'text',
      image: {
        width: 145,
        height: 145,
      },
      price: {
        label: itemPriceLabel,
        display: 'block',
        align: 'end',
      },
    },
  },
  4: {
    sm: {
      areas: `
                    "img . . remove"
                    "img brand brand brand"
                    "img name name name"
                    "img price price price"
                    "img details details details"
                    "img wishlist wishlist wishlist"
                    "meta meta meta meta"
                `,
      columns: 'auto 1fr 1fr auto',
      rows: '5px auto auto auto auto auto auto',
      removeButton: 'icon',
      image: {
        width: 100,
        height: 100,
      },
    },
    lg: {
      areas: `
                    "img brand quantity price"
                    "img name quantity price"
                    "img details quantity price"
                    "img meta wishlist remove"
                `,
      columns: 'auto 1fr auto auto',
      rows: 'auto auto 1fr auto',
      removeButton: 'text',
      image: {
        width: 145,
        height: 145,
      },
      quantity: {
        display: 'block',
        label: quantityLabel,
        align: 'center',
      },
      price: {
        label: itemPriceLabel,
        display: 'block',
        align: 'end',
      },
    },
  },
  5: null,
})

export const HorizontalProductCardReadOnly = (
  props: HorizontalProductCardReadOnlyProps
) => {
  const intl = useIntl()

  const {
    image,
    brand,
    name,
    details = [],
    regularPrice,
    salePrice,
    quantity,
    metaText,
  } = props
  const { columns = 3, size = 'lg' } = props
  const { onRemove, onAddToWishlist } = props

  const quantityLabel = intl.formatMessage({ id: 'cart.item.quantity' })
  const itemPriceLabel = intl.formatMessage({ id: 'cart.item.price' })

  const grid = getGridConfig({ quantityLabel, itemPriceLabel })

  const gridSettings = grid[columns]?.[size]

  if (!gridSettings) {
    return null
  }

  const gridTemplateAreas = gridSettings.areas
  const gridTemplateColumns = gridSettings.columns
  const gridTemplateRows = gridSettings.rows
  const removeButtonType = gridSettings.removeButton
  const imageSize = gridSettings.image
  const quantityOptions = gridSettings.quantity
  const priceOptions = gridSettings.price

  const getGridItemDisplayValue = (area: string) => {
    const shouldHide = !gridTemplateAreas.includes(area)
    return shouldHide ? 'none' : undefined
  }

  return (
    <Box {...props.containerProps}>
      <Grid
        gridTemplateAreas={gridTemplateAreas}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
        columnGap='4'
        alignItems='start'
        py='4'
      >
        {image && (
          <GridItem area='img'>
            <Button
              variant='unstyled'
              onClick={image?.onClickImage}
              h='full'
              w='full'
            >
              <Image
                src={image?.src}
                alt={image?.alt ?? name}
                fit='contain'
                w={imageSize.width}
                h={imageSize.height}
              />
            </Button>
          </GridItem>
        )}
        <GridItem area='brand' textStyle='body-25-50' color='text-muted'>
          {brand}
        </GridItem>
        <GridItem
          as='h3'
          area='name'
          textStyle={{ base: 'body-75', md: 'body-100' }}
        >
          {name}
        </GridItem>
        <GridItem
          area='price'
          textStyle={{ base: 'body-50', md: 'body-75' }}
          textAlign={priceOptions?.align}
        >
          <Text
            as={priceOptions?.display === 'block' ? 'p' : 'span'}
            textStyle='mobile-75'
            color='text-muted'
            mb='2'
          >
            {priceOptions?.label}
          </Text>
          <Text
            as={priceOptions?.display === 'block' ? 'p' : 'span'}
            mr={priceOptions?.display !== 'block' ? 1 : undefined}
            textDecoration={salePrice ? 'line-through' : undefined}
          >
            {regularPrice}
          </Text>
          <Text
            as={priceOptions?.display === 'block' ? 'p' : 'span'}
            color='danger-med'
          >
            {salePrice}
          </Text>
        </GridItem>
        <GridItem area='remove' display='flex' justifyContent='end'>
          {onRemove && (
            <>
              {removeButtonType === 'text' && (
                <Text
                  as='button'
                  textAlign='end'
                  textStyle='link-50'
                  onClick={onRemove}
                  cursor='pointer'
                  _focus={{ outline: 'none', shadow: 'outline' }}
                >
                  {intl.formatMessage({ id: 'action.remove' })}
                </Text>
              )}
              {removeButtonType === 'icon' && (
                <CloseButton size='sm' isDisabled={false} onClick={onRemove} />
              )}
            </>
          )}
        </GridItem>
        <GridItem
          area='details'
          textStyle={{ base: 'body-25', md: 'body-50' }}
          color='text-muted'
          display={getGridItemDisplayValue('details')}
          mt='1'
        >
          {details.map(({ name, value }, index) => (
            <Text key={index}>
              {name}: {value}
            </Text>
          ))}
        </GridItem>
        <GridItem
          area='quantity'
          textAlign={quantityOptions?.align}
          display={getGridItemDisplayValue('quantity')}
        >
          <Text
            as={quantityOptions?.display === 'block' ? 'p' : 'span'}
            color='text-muted'
            textStyle='mobile-75'
            mr='1'
          >
            {quantityOptions?.label}
          </Text>
          <Text
            as={quantityOptions?.display === 'block' ? 'p' : 'span'}
            textStyle={{ base: 'body-50', md: 'body-75' }}
          >
            {quantity}
          </Text>
        </GridItem>
        <GridItem
          mt={size === 'sm' ? 2 : 'none'}
          area='wishlist'
          display={getGridItemDisplayValue('wishlist')}
        >
          {onAddToWishlist && (
            <Text
              textStyle={size === 'lg' ? 'link-50' : 'link-25'}
              onClick={onAddToWishlist}
              cursor='pointer'
              _focus={{ outline: 'none', shadow: 'outline' }}
            >
              {intl.formatMessage({ id: 'action.addToWishlist' })}
            </Text>
          )}
        </GridItem>
        <GridItem
          area='meta'
          fontSize={size === 'lg' ? 'body-50' : 'body-25'}
          display={getGridItemDisplayValue('meta')}
        >
          {metaText}
        </GridItem>
      </Grid>
    </Box>
  )
}
