import {
  Stack,
  Container,
  Skeleton,
  SkeletonText,
  BoxProps,
} from '@chakra-ui/react'

interface AccountLoadingStateProps {
  rootProps?: BoxProps
}

export const AccountLoadingState = ({
  rootProps,
}: AccountLoadingStateProps) => {
  return (
    <Container maxW='container.2xl' p='none'>
      <Stack spacing='0' direction={{ base: 'column', md: 'row' }} w='full'>
        <Stack
          // TODO: replace pixel values with tokens in file.
          minW={{ base: 'full', md: '300px', lg: '395px' }}
          pt={{ base: 'none', md: 12, lg: 12 }}
          pr={{ base: 'none', md: 3, lg: 3 }}
          pb={{ base: 4, md: 16, lg: 16 }}
          pl={{ base: 'none', md: 8, lg: 12 }}
          spacing='6'
          display={{ base: 'none', md: 'flex' }}
        >
          <Skeleton w='30%' h='4' />
          <Skeleton w='80%' h='6' />
          <Skeleton w='80%' h='6' />
          <Skeleton w='80%' h='6' />
          <Skeleton w='80%' h='6' />
          <Skeleton w='80%' h='6' />
          <Skeleton w='full' h='12' mb='4' />
          <SkeletonText w='full' h='12' />
          <Skeleton w='80%' h='6' />
          <Skeleton w='80%' h='6' />
          <Skeleton w='80%' h='6' />
        </Stack>
        <Stack
          w={{ base: '90%', md: '70%' }}
          pt={{ base: 8, md: 12, lg: 12 }}
          pr={{ base: 4, md: 8, lg: 12 }}
          pb={{ base: 8, md: 16, lg: 16 }}
          pl={{ base: 4, md: 6, lg: 6 }}
          overflow='auto'
          spacing='4'
          m={{ base: 4, md: 'none' }}
        >
          <Skeleton w='50%' h='8' />
          <Skeleton h='32' />
          <Skeleton h='32' />
          <Skeleton h='32' />
        </Stack>
      </Stack>
    </Container>
  )
}
