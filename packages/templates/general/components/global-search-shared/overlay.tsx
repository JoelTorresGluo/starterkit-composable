import { Box, BoxProps, Portal } from '@chakra-ui/react'

interface OverlayProps extends BoxProps {
  zIndex: number
}

export const Overlay = (props: OverlayProps) => {
  return (
    <Portal>
      <Box
        position='fixed'
        top='none'
        left='none'
        h='deviceH'
        w='deviceW'
        backgroundColor='blackAlpha.600'
        {...props}
      ></Box>
    </Portal>
  )
}
