import { Flex, Skeleton, VStack } from '@chakra-ui/react'

export default function Loading() {
  return (
    <VStack width='full'>
      <Skeleton height='400px' width='full' />
      <Flex
        justifyContent='space-between'
        width='full'
        height='300px'
        gap='10px'
      >
        <Skeleton height='full' flexBasis='25%' />
        <Skeleton height='full' flexBasis='25%' />
        <Skeleton height='full' flexBasis='25%' />
        <Skeleton height='full' flexBasis='25%' />
      </Flex>
      <Skeleton height='400px' width='full' />
    </VStack>
  )
}
