import { StyleConfig } from '@chakra-ui/react'

const disabledStyles = {
  bg: 'colors.surface.disabled',
  border: 'none',
  color: 'colors.text.disabled',
  _disabled: {
    pointerEvents: 'none',
  },
}

export const Radio: StyleConfig = {
  baseStyle: {
    control: {
      bg: 'background',
      borderColor: 'colors.surface.border',
      _hover: {
        _checked: {
          bg: 'primary.600',
          border: 'none',
        },
      },
      _checked: {
        bg: 'primary.500',
        border: 'none',
      },
      _invalid: {
        borderColor: 'danger-med',
      },
      _disabled: {
        ...disabledStyles,
        _hover: {
          ...disabledStyles,
        },
        _checked: {
          ...disabledStyles,
        },
      },
    },
  },
}
