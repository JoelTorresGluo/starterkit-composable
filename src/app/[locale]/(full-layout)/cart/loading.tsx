import { Box, Container, Skeleton } from '@chakra-ui/react'
import { CartLoadingState } from '@oriuminc/ui'

export default function Loading() {
  return (
    <Container maxW='container.2xl' py={{ base: 4, md: 8 }} px='4'>
      <Skeleton h='35px' w='190px' marginBottom='16px' />

      <Box w='full' display={{ sm: 'none' }} mb='10'>
        <Skeleton h='25px' w='full' mb='4' />
        <Skeleton h='48px' w='full' />
      </Box>

      <CartLoadingState />
    </Container>
  )
}
