'use client'

import {
  Box,
  BoxProps,
  Button,
  CloseButton,
  Flex,
  Text,
  useOutsideClick,
  Stack,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import FocusLock from 'react-focus-lock'

/**
 * This is a custom implementation of @chakra-ui's Modal component,
 * that doesn't remove the modal content from the DOM when closed.
 *
 * It was built to support the PLP's mobile filters modal, using Algolia hooks,
 * which needs to keep the component that called the hook (ex. useRefinementList) mounted,
 * otherwise it will clear the refinement on unmount.
 */

export const PersistentModal = (
  rootProps: BoxProps & {
    isOpen: Boolean
    onClose: () => void
    title: string
    closeButtonLabel: string
  }
) => {
  const { isOpen, onClose, title, closeButtonLabel, children, ...rest } =
    rootProps

  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  })

  const modalPadding = 4

  return (
    <Box
      ref={ref}
      aria-modal='true'
      display={isOpen ? 'block' : 'none'}
      position='fixed'
      bg='background'
      zIndex='modal'
      h='deviceH'
      w='deviceW'
      maxH='deviceH'
      role='dialog'
      inset='none'
      overflowY='auto'
      p={modalPadding}
      pt='none'
      {...rest}
    >
      <FocusLock returnFocus persistentFocus={false}>
        <Stack spacing='4'>
          <Flex
            justify='space-between'
            position='sticky'
            top='none'
            bg='background'
            pt={modalPadding}
            zIndex={10}
          >
            <Text as='h2' fontSize='lg' fontWeight='bold'>
              {title}
            </Text>
            <CloseButton onClick={() => onClose()} />
          </Flex>

          <Box>{children}</Box>

          <Flex justify='flex-end'>
            <Button colorScheme='blue' onClick={() => onClose()}>
              {closeButtonLabel}
            </Button>
          </Flex>
        </Stack>
      </FocusLock>
    </Box>
  )
}
