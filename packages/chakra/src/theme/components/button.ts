import { StyleConfig } from '@chakra-ui/react'
import { component } from '../../figma-tokens'

interface VariantStyle {
  color?: string
  bg?: string
  fill?: string
  opacity?: string
  _hover?: Partial<VariantStyle>
  _active?: Partial<VariantStyle>
  _disabled?: Partial<VariantStyle>
  [key: string]: any
}
type Variants = Record<string, VariantStyle>

function convertFillToBg(styleObject: VariantStyle): VariantStyle {
  const convertedStyles: VariantStyle = {}

  Object.keys(styleObject).forEach((key) => {
    const value = styleObject[key]
    if (
      typeof value === 'object' &&
      value !== null &&
      (key === '_hover' || key === '_active' || key === '_disabled')
    ) {
      convertedStyles[key] = convertFillToBg(value as VariantStyle)
    } else if (key === 'fill') {
      convertedStyles.bg = value
    } else {
      convertedStyles[key] = value
    }
  })

  return convertedStyles
}

function transformVariantKeys(variants: Variants): Variants {
  const newVariants: Variants = {}
  Object.keys(variants).forEach((key) => {
    const variant = variants[key]
    newVariants[key] = convertFillToBg(variant)
  })
  return newVariants
}
function mergeStyles(
  original: VariantStyle,
  updates: VariantStyle
): VariantStyle {
  const merged: VariantStyle = { ...original, ...updates }
  ;['_hover', '_active', '_disabled'].forEach((state) => {
    if (original[state] || updates[state]) {
      merged[state] = mergeStyles(
        (original[state] as VariantStyle) || {},
        (updates[state] as VariantStyle) || {}
      )
    }
  })
  return merged
}

const transformedVariants: Variants = transformVariantKeys(
  component.button.variants
)

const disabledStyles = {
  backgroundColor: 'colors.surface.disabled',
  borderColor: 'colors.surface.disabled',
  color: 'colors.text.disabled',
  opacity: '1',
  _disabled: {
    pointerEvents: 'none',
  },
}
const disabledStylesGhost = {
  backgroundColor: 'none',
}

const customStyles: Variants = {
  solid: {
    color: 'colors.text.primary-inverse',
    _disabled: {
      ...disabledStyles,
      _hover: {
        ...disabledStyles,
      },
      _active: {
        ...disabledStyles,
      },
    },
  },
  'solid-alt': {
    color: 'primary.500',
    _disabled: {
      ...disabledStyles,
      _hover: {
        ...disabledStyles,
      },
      _active: {
        ...disabledStyles,
      },
    },
  },
  outline: {
    color: 'primary.500',
    _active: {
      color: 'primary.800',
    },
    _disabled: {
      ...disabledStyles,
      _hover: {
        ...disabledStyles,
      },
      _active: {
        ...disabledStyles,
      },
    },
  },
  'outline-alt': {
    color: 'colors.text.primary-inverse',
    _hover: {
      color: 'colors.text.primary',
    },
    _active: {
      color: 'colors.text.primary',
    },
    _disabled: {
      ...disabledStyles,
      _hover: {
        ...disabledStyles,
      },
      _active: {
        ...disabledStyles,
      },
    },
  },
  ghost: {
    color: 'primary.500',
    _active: {
      color: 'primary.800',
    },
    _disabled: {
      ...disabledStyles,
      ...disabledStylesGhost,
      _hover: {
        ...disabledStyles,
        ...disabledStylesGhost,
      },
      _active: {
        ...disabledStyles,
        ...disabledStylesGhost,
      },
    },
  },
  'ghost-alt': {
    color: 'colors.text.primary-inverse',
    _hover: {
      color: 'colors.text.primary',
    },
    _active: {
      color: 'colors.text.primary',
    },
    _disabled: {
      ...disabledStyles,
      ...disabledStylesGhost,
      _hover: {
        ...disabledStyles,
        ...disabledStylesGhost,
      },
      _active: {
        ...disabledStyles,
        ...disabledStylesGhost,
      },
    },
    'checkout-edit': {
      color: 'text-muted',
      fontSize: 'md',
      fontWeight: 'regular',
      textDecoration: 'underline',
      textUnderlineOffset: '.125rem',
      height: 'auto',
    },
    megaDrawer: {
      fontSize: 'sm',
      fontWeight: 'regular',
      textDecoration: 'none',
      width: 'full',
      display: 'flex',
      justifyContent: 'space-between',
      py: 2,
      px: '0 !important',
      border: '0 !important',
      borderRadius: 0,
    },
  },
}

export const Button: StyleConfig = {
  baseStyle: component.button.baseStyle,
  sizes: component.button.sizes,
  variants: Object.keys(transformedVariants).reduce((acc, key) => {
    const original = transformedVariants[key] || {}
    const updates = customStyles[key] || {}
    acc[key] = mergeStyles(original, updates)
    return acc
  }, {} as Variants),
}
