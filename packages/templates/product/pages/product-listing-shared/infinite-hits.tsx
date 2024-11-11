import { Box, Button, Flex, Grid, GridItem, Skeleton } from '@chakra-ui/react'
import { useGridLayout } from '@oriuminc/base'
import { CategoryProductCard } from '../product-listing/components/parts'
import { StarterKitProduct } from './types'

export const InfiniteHits = (props: {
  isLoading?: boolean
  items: any[] | null
  isLastPage: boolean
  isLoggedIn?: boolean
  showMore: () => void
}) => {
  const {
    items,
    isLastPage,
    showMore,
    isLoading = false,
    isLoggedIn = true,
  } = props
  const { gridTemplateColumns } = useGridLayout()

  if (!items || items?.length === 0 || isLoading) {
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
        {items.map((product: StarterKitProduct, index: number) => {
          return (
            <GridItem key={`${product.objectID}${index}`}>
              <CategoryProductCard
                product={product}
                priority={index < 3}
                isLoggedIn={isLoggedIn}
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
