import { BoxProps, Grid, GridItem, Skeleton } from '@chakra-ui/react'

interface CartLoadingStateProps {
  rootProps?: BoxProps
}

export const CartLoadingState = ({ rootProps }: CartLoadingStateProps) => {
  return (
    <Grid
      gap={{ base: 6, lg: 12 }}
      w='full'
      gridTemplateColumns={{ lg: '1fr 35%', xl: '1fr 32%' }}
    >
      <GridItem display='flex' gap='16px'>
        <Skeleton
          // TODO: Replace pixel values with tokens.
          w='145px'
          h='145px'
        />
        <Skeleton w='full' h='145px' flexGrow={1} />
      </GridItem>
      <GridItem>
        <Skeleton w='full' h='235px' mb='24px' />
        <Skeleton w='full' h='48px' />
      </GridItem>
    </Grid>
  )
}
