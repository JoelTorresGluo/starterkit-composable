import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Box,
  Text,
  Heading,
} from '@chakra-ui/react'
import { Gallery } from '../../ui/gallery'
import { IMAGE_PLACEHOLDER_URL } from '../../constants'

export const ProductDetailsModal = (props: { onClose: () => void }) => {
  const images = [
    'https://fastly.picsum.photos/id/979/800/500.jpg?hmac=1o_E8Zt6Ox_dQmnXj3sZrluqavykanPC409l-tVfcks',
    'https://fastly.picsum.photos/id/107/800/500.jpg?hmac=a5IkNdPK3JYCXcBa7MA2q8efy0pmK9CpNVXhFf6G-d4',
    'https://fastly.picsum.photos/id/129/800/500.jpg?hmac=yTBnaliZRSWTktGIJOZj2IJ6jKEKuGIhud2qxpJSaMU',
    'https://fastly.picsum.photos/id/13/800/500.jpg?hmac=ExeWo0XZOPZypzsZXZIJUXdKBe8Aav33FG0r0R7FO2M',
  ]

  return (
    <Modal
      onClose={() => props.onClose()}
      isOpen
      isCentered
      size={{ base: 'full', md: '5xl' }}
      scrollBehavior='inside'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton zIndex={999} bg='shading.200' />
        <ModalBody p='none'>
          <Box
            w='full'
            mx='auto'
            display='flex'
            alignItems='stretch'
            flexDir={{ base: 'column', xs: 'row' }}
          >
            <Box
              py='6'
              px='6'
              display='flex'
              bg='shading.200'
              borderLeftRadius='md'
            >
              <Gallery
                showDotNavigation
                rootProps={{
                  // TODO: Replace pixel value with token.
                  width: '445px',
                  overflow: 'hidden',
                  borderRadius: 'base',
                }}
                images={
                  images.length
                    ? images?.map((imageUrl) => {
                        return {
                          src: imageUrl,
                          alt: '',
                          sizes: 'deviceW',
                        }
                      })
                    : [{ src: IMAGE_PLACEHOLDER_URL, alt: '' }]
                }
              />
            </Box>
            <Box py='12' px='8'>
              <Text textStyle='eyebrow-75' color='text-muted'>
                Eyebrow
              </Text>
              <Heading textStyle='desktop-400' pt='2' pb='4'>
                Detail Modal
              </Heading>
              <Text>
                Our protection plans cover an unlimited number of support
                incidents for hardware and software diagnosis and
                troubleshooting and issue isolation, including graphical user
                interface-level assistance with network configuration and server
                administration. For ease of budgeting, additional devices will
                not increase the cost of your Protection Plan contract.
              </Text>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
