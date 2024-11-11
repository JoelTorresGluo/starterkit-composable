import { StyleConfig } from '@chakra-ui/react'

export const Drawer: StyleConfig = {
  baseStyle: {},
  variants: {
    megaDrawer: {
      body: {
        px: 4,
      },
      dialog: {
        maxW: {
          base: 'full',
          md: 375,
        },
      },
      header: {
        display: 'grid',
        justifyContent: 'center',
        gap: 4,
        borderBottom: 'sm',
        borderTop: '0',
        h: 12,
        minH: 12,
        py: '0',
        px: 4,
        alignItems: 'center',
        mb: 6,
      },
    },
  },
}
