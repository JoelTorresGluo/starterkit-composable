import { Box, Button, Flex, Grid, GridItem, Skeleton } from '@chakra-ui/react'
import { useAlgoliaInsights } from '@oriuminc/algolia'
import { useGridLayout } from '@oriuminc/base'
import { useInfiniteHits } from 'react-instantsearch'
import { StarterKitProduct } from '../../../../product-listing-shared'
import { CategoryProductCard } from '../parts'

import { PREFETCH_PRODUCT_CARD_LINKS } from '@modules/general'

export const InfiniteHits = () => {
  const { items, isLastPage, showMore } = useInfiniteHits()
  const { trackAlgoliaClickedObjectIDAfterSearch } = useAlgoliaInsights()
  const { gridTemplateColumns } = useGridLayout()

  if (!items || items?.length === 0) {
    return (
      <Box>
        <Grid
          gridColumnGap={{ base: 4, lg: 5 }}
          gridRowGap={{ base: 8, lg: 12 }}
          gridTemplateColumns={gridTemplateColumns}
        >
          {new Array(6).fill(true).map((el, idx) => {
            return (
              <GridItem key={idx}>
                <Skeleton
                  // TODO: Replace pixel values with tokens.
                  h={{ base: '260px', sm: '400px' }}
                />
                <Skeleton w='50%' mt='1' h='18px' />
                <Skeleton w='86%' mt='1' h='5' />
                <Skeleton w='20%' mt='1' h='5' />
              </GridItem>
            )
          })}
        </Grid>
      </Box>
    )
  }

  return (
    <Box>
      <Grid
        gridColumnGap={{ base: 4, lg: 5 }}
        gridRowGap={{ base: 8, lg: 12 }}
        gridTemplateColumns={gridTemplateColumns}
      >
        {items.map((product, index: number) => {
          return (
            <GridItem
              key={`${product.objectID}${index}`}
              onClick={() => trackAlgoliaClickedObjectIDAfterSearch(product)}
            >
              <CategoryProductCard
                product={product as unknown as StarterKitProduct}
                priority={index < 3}
                prefetch={PREFETCH_PRODUCT_CARD_LINKS}
              />
            </GridItem>
          )
        })}
      </Grid>
      {!isLastPage && (
        <Flex my='16' alignItems='center' justifyContent='center'>
          <Button
            variant='outline'
            colorScheme='blue'
            onClick={async () => await showMore()}
          >
            Show More
          </Button>
        </Flex>
      )}
    </Box>
  )
}
