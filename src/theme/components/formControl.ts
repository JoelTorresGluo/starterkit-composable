import { mode, Styles } from '@chakra-ui/theme-tools'
import { borders } from '../foundations/borders'
import { borderStyles } from '../foundations/borderStyles'

export default {
  // Styles for the base style
  parts: ['FormControl', 'FormLabel', 'FormErrorMessage', 'FormHelperText'],
  baseStyle: {
    FormLabel: {
      color: 'danger-med',
    },
  },
  sizes: {
    sm: {
      field: {
        textStyle: 'body-50',
        height: 8,
        px: 3,
      },
      formLabel: {
        color: 'danger-med',
      },
    },
    md: {
      field: {
        textStyle: 'body-100',
        height: 10,
        px: 4,
      },
    },
    lg: {
      field: {
        textStyle: 'body-200',
        height: 12,
        px: 4,
      },
    },
  },
  variants: {
    outline: (props: Styles) => {
      return {
        field: {
          borderColor: 'colors.surface.border',
          bg: mode('white', 'black')(props),
          color: 'colors.text.primary',
          _placeholder: {
            color: 'colors.text.disabled',
          },
          _hover: {
            borderColor: 'colors.surface.border',
          },
          _focus: {
            borderWidth: borders.sm,
            borderStyle: borderStyles.normal,
            borderColor: 'info-med',
          },
          _invalid: {
            borderColor: 'danger-med',
          },
        },
      }
    },
  },
  defaultProps: {
    variant: 'outline',
  },
}
