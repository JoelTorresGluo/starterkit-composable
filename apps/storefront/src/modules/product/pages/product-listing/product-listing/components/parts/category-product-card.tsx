import {
  AspectRatio,
  LinkBox,
  LinkOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useComposable } from '@modules/general'
import { StarterKitAlgoliaProduct } from '@oriuminc/algolia'
import { getCurrency } from '@oriuminc/base'
import Image from 'next/image'
import NextLink from 'next/link'
import { FunctionComponent } from 'react'
import { useCurrentRefinements, useInstantSearch } from 'react-instantsearch'
import { FormatNumberOptions, useIntl } from 'react-intl'

interface CategoryProductCardProps {
  product: StarterKitAlgoliaProduct
  priority?: boolean
  prefetch?: boolean
}

export const CategoryProductCard: FunctionComponent<
  CategoryProductCardProps
> = ({ product, priority = false, prefetch }) => {
  const intl = useIntl()
  const formatNumberOptions: FormatNumberOptions = {
    currency: getCurrency(intl.locale),
    style: 'currency',
  }
  const { results } = useInstantSearch()
  const { items } = useCurrentRefinements()
  const { path } = useComposable()

  const filters = items?.reduce<string[]>((acc, attribute) => {
    const currentAttributeRefinements = attribute.refinements.reduce<string[]>(
      (acc2, refinement) => [
        ...acc2,
        `${refinement.attribute}:${refinement.value}`,
      ],
      []
    )
    return [...acc, ...currentAttributeRefinements]
  }, [])

  const priceText = product.price
    ? intl.formatNumber(product.price.centAmount / 100, formatNumberOptions)
    : ''

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
            sizes='20vw'
          />
        ) : (
          <Image
            priority={priority}
            src='/img/image-placeholder.svg'
            alt={product.name}
            fill={true}
            style={{ objectFit: 'contain' }}
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
            prefetch={prefetch}
            href={path.getPDP({
              slug: product.slug,
              search: {
                queryID: results.queryID ?? '',
                filters: filters && filters.length > 0 ? filters : undefined,
              },
            })}
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
