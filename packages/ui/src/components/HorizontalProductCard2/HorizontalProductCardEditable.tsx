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
import { QuantityPicker2 } from '../QuantityPicker2'

export interface HorizontalProductCardEditableProps
  extends HorizontalProductCardCommon {
  totalPrice?: string
  onChangeQuantity?: (val: number) => any
}

const getGridConfig: (labels: {
  quantityLabel: string
  itemPriceLabel: string
}) => ProductCardLayout = ({ quantityLabel, itemPriceLabel }) => ({
  2: null,
  3: {
    sm: {
      areas: `
                    ". . remove"
                    "img brand ."
                    "img name ."
                    "img details ."
                    "img price ."
                    "img quantity ."
                    "img wishlist ."

                `,
      columns: 'auto 1fr auto',
      rows: 'auto auto auto auto auto 1fr',
      removeButton: 'icon',
      image: {
        width: 100,
        height: 100,
      },
      quantity: {
        align: 'start',
      },
    },
    lg: {
      areas: `
                    "img . ."
                    "img brand quantity"
                    "img name quantity"
                    "img price quantity"
                    "img details ."
                    "img . remove"
                `,
      columns: 'auto 1fr auto',
      rows: 'auto auto auto auto 1fr auto',
      removeButton: 'text',
      image: {
        width: 145,
        height: 145,
      },
      quantity: {
        label: quantityLabel,
        align: 'end',
      },
    },
  },
  4: {
    sm: {
      areas: `
                    ". . remove"
                    "img brand ."
                    "img name ."
                    "img details ."
                    "img price ."
                    "img quantity ."
                    "img wishlist ."

                `,
      columns: 'auto 1fr auto',
      rows: 'auto auto auto auto auto 1fr',
      removeButton: 'icon',
      image: {
        width: 100,
        height: 100,
      },
      quantity: {
        align: 'start',
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
        align: 'end',
      },
      price: {
        label: itemPriceLabel,
        display: 'block',
        align: 'end',
      },
    },
  },
  5: {
    sm: {
      areas: `
                    "img . remove"
                    "img brand ."
                    "img name ."
                    "img details ."
                    "img price ."
                    "img quantity ."
                    "img wishlist ."

                `,
      columns: 'auto 1fr auto',
      rows: 'auto auto auto auto auto 1fr',
      removeButton: 'icon',
      image: {
        width: 100,
        height: 100,
      },
      quantity: {
        align: 'start',
      },
    },
    lg: {
      areas: `
                    "img brand price quantity total-price"
                    "img name price quantity total-price"
                    "img details price quantity total-price"
                    "img meta . wishlist remove"
                `,
      columns: 'auto 1fr auto auto auto',
      rows: 'auto auto 1fr auto',
      removeButton: 'text',
      image: {
        width: 145,
        height: 145,
      },
      quantity: {
        display: 'block',
        label: quantityLabel,
        align: 'end',
      },
      price: {
        label: itemPriceLabel,
        display: 'block',
        align: 'end',
      },
    },
  },
})

export const HorizontalProductCardEditable = (
  props: HorizontalProductCardEditableProps
) => {
  const intl = useIntl()

  const {
    image,
    brand,
    name,
    details = [],
    regularPrice,
    salePrice,
    totalPrice,
    quantity,
    metaText,
  } = props
  const { columns = 3, size = 'lg' } = props
  const { onRemove, onAddToWishlist, onChangeQuantity, isLoading } = props

  const quantityLabel = intl.formatMessage({ id: 'cart.item.quantity' })
  const itemPriceLabel = intl.formatMessage({ id: 'cart.item.price' })
  const itemTotalPriceLabel = intl.formatMessage({ id: 'cart.item.totalPrice' })

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

  const getGridItemDisplayValue = (area: string, defaultDisplay?: string) => {
    const shouldHide = !gridTemplateAreas.includes(area)
    return shouldHide ? 'none' : defaultDisplay
  }

  const removeButtonLabel = `${intl.formatMessage({
    id: 'action.remove',
  })} ${name}`
  const addToWishlistButtonLabel = `${intl.formatMessage({
    id: 'action.addToWishlist',
  })} ${name}`
  const quantityAriaLabel = `${intl.formatMessage({
    id: 'cart.item.quantityFor',
  })} ${name}`

  const handleRemove = async () => {
    if (!isLoading) {
      await onRemove?.()
    }
  }

  return (
    <Box {...props.containerProps}>
      <Grid
        gridTemplateAreas={gridTemplateAreas}
        gridTemplateColumns={gridTemplateColumns}
        gridTemplateRows={gridTemplateRows}
        columnGap='4'
        alignItems='start'
      >
        <GridItem area='img' borderRadius='none'>
          <Button
            borderRadius='none'
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
        <GridItem
          area='quantity'
          display={getGridItemDisplayValue('quantity', 'flex')}
          flexDirection='column'
          alignItems={quantityOptions?.align}
        >
          <Text textStyle='mobile-75' color='text-muted' mb={2}>
            {quantityOptions?.label}
          </Text>
          <QuantityPicker2
            hideLabel
            ariaLabel={quantityAriaLabel}
            rootProps={{ maxW: 24 }}
            isLoading={isLoading}
            value={quantity}
            onChange={onChangeQuantity}
          />
        </GridItem>
        <GridItem
          area='wishlist'
          display={getGridItemDisplayValue(
            'wishlist',
            size === 'lg' ? 'flex' : undefined
          )}
          justifyContent='end'
        >
          {onAddToWishlist && (
            <Text
              as='button'
              textStyle={size === 'lg' ? 'link-50' : 'link-25'}
              onClick={onAddToWishlist}
              cursor='pointer'
              aria-label={addToWishlistButtonLabel}
              _focus={{ outline: 'none', shadow: 'outline' }}
            >
              {intl.formatMessage({ id: 'action.addToWishlist' })}
            </Text>
          )}
        </GridItem>
        <GridItem area='remove' display='flex' justifyContent='end'>
          {onRemove && (
            <>
              {removeButtonType === 'text' && (
                <Text
                  as='button'
                  textAlign='end'
                  textStyle='link-50'
                  onClick={handleRemove}
                  cursor='pointer'
                  aria-label={removeButtonLabel}
                  _focus={{ outline: 'none', shadow: 'outline' }}
                >
                  {intl.formatMessage({ id: 'action.remove' })}
                </Text>
              )}
              {removeButtonType === 'icon' && (
                <CloseButton
                  aria-label={removeButtonLabel}
                  size='xs'
                  fontSize='xs'
                  isDisabled={isLoading}
                  onClick={handleRemove}
                />
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
          aria-live='polite'
          area='total-price'
          textAlign={priceOptions?.align}
          display={getGridItemDisplayValue('total-price')}
        >
          <Text
            as={priceOptions?.display === 'block' ? 'p' : 'span'}
            color='text-muted'
            textStyle='mobile-75'
            mb='2'
          >
            {itemTotalPriceLabel}
          </Text>
          <Text
            as={priceOptions?.display === 'block' ? 'p' : 'span'}
            textStyle={{ base: 'body-50', md: 'body-75' }}
          >
            {totalPrice}
          </Text>
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
