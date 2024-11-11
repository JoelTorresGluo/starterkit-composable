import {
  Text,
  VStack,
  AspectRatio,
  LinkBox,
  LinkOverlay,
  useToken,
} from '@chakra-ui/react'
import { StarterKitAlgoliaProduct } from '@oriuminc/algolia'
import Image from 'next/image'
import NextLink from 'next/link'
import { FunctionComponent } from 'react'

interface CategoryProductCardProps {
  product: StarterKitAlgoliaProduct
  priority?: boolean
  isLoggedIn?: boolean
}

// TODO: Fix issue that makes the useToken hook fail the build.
// const [sizeDeviceW] = useToken('sizes', ['sizes.deviceW'])

export const CategoryProductCard: FunctionComponent<
  CategoryProductCardProps
> = ({ product, priority = false, isLoggedIn = true }) => {
  let priceText = product.price
    ? `$${(product.price.centAmount / 100).toFixed(2)}`
    : ''
  if (!isLoggedIn) {
    priceText = ``
  }
  const ariaLabel = `${product.name}, ${priceText}, ${product.attributes.normalized.brand}`
  return (
    <LinkBox
      as='article'
      aria-labelledby={`product-${product.objectID}`}
      display='flex'
      flexDirection='column'
      borderRadius='lg'
      gap='3'
    >
      <AspectRatio w='full' ratio={{ base: 4 / 6, lg: 5 / 6 }}>
        {product.image ? (
          <Image
            priority={priority}
            src={product.image.url}
            alt={product.image.label ?? ''}
            fill={true}
            style={{ objectFit: 'contain' }}
            // sizes={`calc(${sizeDeviceW} / 5)`}
            sizes='20vw'
          />
        ) : (
          <Image
            priority={priority}
            src='/img/image-placeholder.svg'
            alt={product.name}
            fill={true}
            style={{ objectFit: 'contain' }}
            // sizes={`calc(${sizeDeviceW} / 5)`}
            sizes='20vw'
          />
        )}
      </AspectRatio>
      <VStack spacing='0-5' alignItems='initial'>
        <Text fontSize={{ base: '2xs', lg: 'xs' }} color='gray.600'>
          {product.attributes.normalized.brand}
        </Text>
        <Text
          as='h3'
          fontSize='sm'
          lineHeight='short'
          id={`product-${product.objectID}`}
          aria-label={ariaLabel}
        >
          <LinkOverlay
            as={NextLink}
            href={`/product/${product.slug}`}
            cursor='pointer'
            borderRadius='lg'
            textStyle={{ base: 'body-75', md: 'body-100' }}
            _hover={{ textDecor: 'underline', color: 'primary' }}
          >
            {product.name}
          </LinkOverlay>
        </Text>
        <Text textStyle={{ base: 'body-50', md: 'body-75' }}>{priceText}</Text>
      </VStack>
    </LinkBox>
  )
}
