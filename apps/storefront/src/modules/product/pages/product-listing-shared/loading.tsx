import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  VStack,
} from '@chakra-ui/react'
import { PageContainer } from '@oriuminc/templates/general'

export const ProductListingPageLoading = () => {
  return (
    <PageContainer>
      <Box>
        <Skeleton
          h='24px'
          w='150px'
          maxW='100%'
          mt={{ base: '24px', lg: '64px' }}
          mb={{ base: '8px', lg: '12px' }}
        />
        <Skeleton
          h='58px'
          w='350px'
          maxW='100%'
          mb={{ base: '36px', lg: '48px' }}
        />

        <Flex gap='24px'>
          <Skeleton
            display={{ base: 'none', lg: 'block' }}
            h='500px'
            flexBasis='72'
            flexShrink='0'
          />

          <Box flexGrow={1}>
            <Skeleton w='full' h='48px' />

            <Skeleton
              display={{ base: 'block', lg: 'none' }}
              w='full'
              h='48px'
              mt='20px'
            />

            <Grid
              gridColumnGap={{ base: 4, lg: 5 }}
              gridRowGap={{ base: 8, lg: 12 }}
              gridTemplateColumns={{
                base: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              }}
              mt='40px'
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <GridItem key={index}>
                  <VStack>
                    <Skeleton w='full' h='260px' />
                    <SkeletonText noOfLines={3} w='full' />
                  </VStack>
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Box>
    </PageContainer>
  )
}
