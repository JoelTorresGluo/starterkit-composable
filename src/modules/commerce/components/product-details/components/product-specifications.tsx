import { Box, Text } from '@chakra-ui/react'
import {
  ComposableProduct,
  ComposableProductVariant,
} from '@oriuminc/commerce-generic'

export const ProductSpecifications = ({
  product,
  variant,
}: {
  product: ComposableProduct
  variant: ComposableProductVariant
}) => {
  const specifications =
    variant.attributes?.reduce<[string, string][]>(
      (arr, { name, value }, idx) => {
        if (!!value && typeof value !== 'object') {
          arr.push([name.toUpperCase(), value])
        }
        return arr
      },
      []
    ) ?? []

  return (
    <>
      {specifications.map(([name, value], index) => (
        <Box key={`${name}-${index}`}>
          <Text>{`${name}: ${value}`}</Text>
        </Box>
      ))}
    </>
  )
}
