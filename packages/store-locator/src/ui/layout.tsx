import { ReactElement } from 'react'
import {
  Box,
  Skeleton,
  VStack,
  Alert,
  AlertIcon,
  useToken,
} from '@chakra-ui/react'

interface LayoutProps {
  loading?: boolean
  error?: boolean
  main?: ReactElement | null
  aside?: ReactElement | null
  geolocationAvailable?: boolean
}

const skeletonList = new Array(15).fill(0)
// TODO: Fix issue that makes the useToken hook fail the build.
// const [sizeDeviceH] = useToken('sizes', ['sizes.deviceH'])

// TODO: Replace pixel values with tokens and explore better layout options.
export const Layout = ({
  error,
  loading,
  main = null,
  aside = null,
  geolocationAvailable = true,
}: LayoutProps) => {
  const desktopMainWidth = '70%'
  const desktopAsideWidth = '30%'
  // const desktopHeight = `calc(${sizeDeviceH} - 182px)`
  // const mobileHeight = `calc((${sizeDeviceH} * .85) - 100px)`
  const desktopHeight = `calc(100dvh - 182px)`
  const mobileHeight = `calc(85dvh - 100px)`

  return (
    <Box>
      {!geolocationAvailable && (
        <Box>
          <Alert status='info'>
            <AlertIcon />
            Geolocation is not available
          </Alert>
        </Box>
      )}

      <Box
        h={{ base: 'auto', md: desktopHeight }}
        display='flex'
        alignItems='stretch'
        flexDir={{ base: 'column', md: 'row' }}
      >
        {error ? (
          <Box>Something went wrong</Box>
        ) : (
          <>
            <Box
              display='flex'
              w={{ base: 'full', md: desktopMainWidth }}
              h={{ base: mobileHeight, md: 'auto' }}
              alignItems='stretch'
            >
              {loading ? (
                <Box p='5' w='full' h='full'>
                  <Skeleton w='full' h='full' />
                </Box>
              ) : (
                main
              )}
            </Box>
            <Box
              position='relative'
              display='flex'
              flexDir='column'
              h={{ base: 'auto', md: 'full' }}
              w={{ base: 'full', md: desktopAsideWidth }}
              overflow='hidden'
            >
              {loading ? (
                <Box pr='5' py='20' h='90%' borderRadius='sm' overflow='hidden'>
                  <VStack>
                    {skeletonList.map((_, idx) => (
                      <Skeleton key={idx} w='full' h='70px' />
                    ))}
                  </VStack>
                </Box>
              ) : (
                aside
              )}
            </Box>
          </>
        )}
      </Box>
    </Box>
  )
}
