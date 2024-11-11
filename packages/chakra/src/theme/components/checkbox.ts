import { StyleConfig } from '@chakra-ui/react'

const disabledStyles = {
  bg: 'colors.surface.disabled',
  border: 'none',
  color: 'colors.text.disabled',
  _disabled: {
    pointerEvents: 'none',
  },
}

export const Checkbox: StyleConfig = {
  baseStyle: {
    container: {
      alignItems: 'start',
      height: 'auto',
      gap: 2,
    },
    label: {
      marginLeft: 0,
    },
    control: {
      bg: 'background',
      borderColor: 'colors.surface.border',
      borderWidth: '2px',
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
        _checked: {
          borderColor: 'danger-med',
          borderWidth: '2px',
          _hover: {
            borderColor: 'danger-med',
            borderWidth: '2px',
          },
        },
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
