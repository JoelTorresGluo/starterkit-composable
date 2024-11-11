import { StyleConfig } from '@chakra-ui/react'

export const Badge: StyleConfig = {
  baseStyle: {
    paddingY: 0,
    paddingX: 1,
    borderRadius: 'sm',
    textStyle: 'eyebrow',
    borderWidth: 1,
    borderColor: 'primary',
  },
  variants: {
    solid: () => ({
      bg: 'primary',
    }),
    outline: () => ({
      color: 'primary',
      borderWidth: 1,
      borderColor: 'primary',
      '--badge-color': 'none',
    }),
    subtle: () => ({
      bg: 'muted',
      borderWidth: 1,
      borderColor: 'muted',
      color: 'secondary',
    }),
  },
}
