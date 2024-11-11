import { HStack, StackProps, Text, TextProps } from '@chakra-ui/react'

interface PriceProps {
  priceProps?: TextProps
  regularPrice: String
  rootProps?: StackProps
  specialPrice?: String
  specialPriceProps?: TextProps
}

export const Price = (props: PriceProps) => {
  const {
    priceProps,
    regularPrice,
    rootProps,
    specialPrice,
    specialPriceProps,
  } = props

  if (!regularPrice) return null

  return (
    <HStack spacing='1' {...rootProps}>
      <Text
        as='span'
        textStyle='blockquote'
        color='text'
        textDecoration={specialPrice ? 'line-through' : 'none'}
        {...priceProps}
      >
        {regularPrice}
      </Text>

      {specialPrice && (
        <Text
          as='span'
          textStyle='blockquote'
          color='danger.600'
          {...specialPriceProps}
        >
          {specialPrice}
        </Text>
      )}
    </HStack>
  )
}
