import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { Modal, ModalContent, ModalBody, Box, useToken } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { useSwipeable } from 'react-swipeable'
import { storeDetailsModalAtom } from '../_data'
import { useAsideDrawer } from '../hooks/use-aside-drawer'
import { useStoreLocatorRouter } from '../hooks/use-store-locator-router'

export const AsideDrawer = (props: {
  enabled?: boolean
  children: React.ReactElement
}) => {
  const { isOpen } = useAsideDrawer()
  const { goTo } = useStoreLocatorRouter()
  const [blockScroll, setBlockScroll] = useState(false)
  const modalIsOpen = useAtomValue(storeDetailsModalAtom)

  const handlers = useSwipeable({
    onTouchStartOrOnMouseDown: (eventData) => {
      setBlockScroll(true)
    },
    onTouchEndOrOnMouseUp: (eventData) => {
      setBlockScroll(false)
    },
    onSwipeStart: (eventData) => {
      goTo(isOpen ? 'map' : 'results')
    },
    delta: 1,
    preventScrollOnSwipe: true,
  })

  const [sizeDeviceH] = useToken('sizes', ['sizes.deviceH'])

  if (!props.enabled) {
    return props.children
  }

  // TODO: Tokenize pixel and rem values in file.
  return (
    <>
      {!modalIsOpen && (
        <Global
          styles={{
            '.chakra-modal__content-container': {
              height: '1px !important',
            },
          }}
        />
      )}

      <Modal
        isOpen
        onClose={() => goTo('map')}
        size='xs'
        scrollBehavior='inside'
        blockScrollOnMount={blockScroll}
        trapFocus={false}
      >
        <ModalContent
          borderBottomRadius='none'
          // TODO: replace shadow with token.
          boxShadow='0 0 20px rgba(0, 0, 0, 0.3) !important'
          maxW='full'
          transition='height 0.1s ease-in'
          // TODO: Explore more elegant way to style modal content.
          h={isOpen ? `calc(${sizeDeviceH} * .84)` : '130px'}
          position='fixed'
          p='0 !important'
          bottom='none'
          left='none'
          m='0 !important'
          maxH='auto'
          sx={{
            '#store-locator-aside-drawer': {
              touchAction: 'none',
            },
          }}
        >
          <Box
            id='store-locator-aside-drawer'
            position='absolute'
            zIndex={1}
            top='none'
            left='none'
            w='full'
            h={isOpen ? '50px' : 'full'}
            {...handlers}
          >
            <Box
              w='10'
              h='1-5'
              borderRadius='full'
              mb='none'
              mt='5'
              mx='auto'
            />
          </Box>
          <ModalBody p='none'>{props.children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
