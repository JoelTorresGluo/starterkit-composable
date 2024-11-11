import { StyleConfig } from '@chakra-ui/react'

export const Accordion: StyleConfig = {
  baseStyle: {},
  variants: {
    megaDrawer: {
      root: {
        px: 0,
      },
      container: {
        borderBottom: 'sm',
        borderTop: 0,
        background: 'transparent',
        py: 0,
        px: 0,
      },
    },
  },
}
