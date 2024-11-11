import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IntlShape } from 'react-intl'
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { theme } from '@oriuminc/chakra'
import { IMAGE_PLACEHOLDER_URL } from '../constants'
import { Store } from '../_data'
import { Gallery } from '../ui/gallery'
import { UseStoreLocatorRouter } from '../hooks/use-store-locator-router'
import { StoreSummary } from './store-summary'

export const InfoWindow = (props: {
  store: Store
  distance?: string
  deps: {
    intl: IntlShape
    router: UseStoreLocatorRouter
  }
  isBookmarked?: boolean
  onBookmark?: (store: Store) => void
  variant?: 'details' | 'gallery'
}) => {
  const {
    store,
    distance,
    deps,
    variant = 'details',
    onBookmark,
    isBookmarked,
  } = props
  const images = store?.image_gallery ?? []
  const [domLoaded, setDomLoaded] = useState(false)
  const [_isBookmarked, setIsBookmarked] = useState(isBookmarked)

  useEffect(() => {
    setTimeout(() => setDomLoaded(true), 100)
  }, [setDomLoaded])

  // TODO: Replace pixel and rem values in file with tokens.

  return (
    <ChakraProvider theme={theme}>
      {variant === 'details' && (
        <Box
          w={{ base: '220px', md: '648px' }}
          h={{ base: '280px', md: '250px' }}
        >
          <Box
            pl='3'
            pr='3'
            w='full'
            display='flex'
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
          >
            <Box w='full'>
              <Box
                display={{ base: 'block', md: 'none' }}
                borderRadius='sm'
                w='full'
                overflow='hidden'
                mb='4'
                sx={{
                  img: {
                    display: 'block !important',
                    width: '100% !important',
                  },
                }}
              >
                <Image
                  src={store.image_cover?.src ?? IMAGE_PLACEHOLDER_URL}
                  width='220'
                  height='150'
                  alt=''
                  style={{ objectFit: 'cover' }}
                />
              </Box>

              <Box w='full' display={{ base: 'none', md: 'block' }}>
                <Image
                  src={store.image_cover?.src ?? IMAGE_PLACEHOLDER_URL}
                  width='288'
                  height='170'
                  alt=''
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            </Box>
            <StoreSummary
              root={{ w: 'full', pl: { base: 'none', md: 6 } }}
              store={store}
              distance={distance}
              deps={deps}
              isBookmarked={_isBookmarked}
              onBookmark={() => {
                onBookmark?.(store)
                setIsBookmarked(!_isBookmarked)
              }}
            />
          </Box>
        </Box>
      )}

      {domLoaded && variant === 'gallery' && (
        <Box pl='3' pr='3' display='flex'>
          <Gallery
            rootProps={{
              width: '330px',
              overflow: 'hidden',
              borderRadius: 'base',
            }}
            images={
              images.length
                ? images?.map((img) => {
                    return {
                      src: img.src,
                      alt: img.alt ?? '',
                      sizes: '600px',
                    }
                  })
                : [{ src: IMAGE_PLACEHOLDER_URL, alt: '' }]
            }
          />
        </Box>
      )}
    </ChakraProvider>
  )
}
