import { core, semantic, overlay } from '../../figma-tokens'

export const palette = {
  white: core.shading['shading-000'],
  black: core.shading['shading-1000'],
  // Notes: you can override the chalkra-ui colors here
  // gray: {
  //   '200': 'red',
  // },
  primary: {
    '100': core.primary['primary-100'],
    '200': core.primary['primary-200'],
    '300': core.primary['primary-300'],
    '400': core.primary['primary-400'],
    '500': core.primary['primary-500'],
    '600': core.primary['primary-600'],
    '700': core.primary['primary-700'],
    '800': core.primary['primary-800'],
    '900': core.primary['primary-900'],
  },
  secondary: {
    '100': core.secondary['secondary-100'],
    '200': core.secondary['secondary-200'],
    '300': core.secondary['secondary-300'],
    '400': core.secondary['secondary-400'],
    '500': core.secondary['secondary-500'],
    '600': core.secondary['secondary-600'],
    '700': core.secondary['secondary-700'],
    '800': core.secondary['secondary-800'],
    '900': core.secondary['secondary-900'],
  },
  tertiary: {
    '100': core.tertiary['tertiary-100'],
    '200': core.tertiary['tertiary-200'],
    '300': core.tertiary['tertiary-300'],
    '400': core.tertiary['tertiary-400'],
    '500': core.tertiary['tertiary-500'],
    '600': core.tertiary['tertiary-600'],
    '700': core.tertiary['tertiary-700'],
    '800': core.tertiary['tertiary-800'],
    '900': core.tertiary['tertiary-900'],
  },
  success: {
    '100': core.success['success-100'],
    '200': core.success['success-200'],
    '300': core.success['success-300'],
    '400': core.success['success-400'],
    '500': core.success['success-500'],
    '600': core.success['success-600'],
    '700': core.success['success-700'],
    '800': core.success['success-800'],
    '900': core.success['success-900'],
  },
  danger: {
    '100': core.danger['danger-100'],
    '200': core.danger['danger-200'],
    '300': core.danger['danger-300'],
    '400': core.danger['danger-400'],
    '500': core.danger['danger-500'],
    '600': core.danger['danger-600'],
    '700': core.danger['danger-700'],
    '800': core.danger['danger-800'],
    '900': core.danger['danger-900'],
  },
  warning: {
    '100': core.warning['warning-100'],
    '200': core.warning['warning-200'],
    '300': core.warning['warning-300'],
    '400': core.warning['warning-400'],
    '500': core.warning['warning-500'],
    '600': core.warning['warning-600'],
    '700': core.warning['warning-700'],
    '800': core.warning['warning-800'],
    '900': core.warning['warning-900'],
  },
  info: {
    '100': core.info['info-100'],
    '200': core.info['info-200'],
    '300': core.info['info-300'],
    '400': core.info['info-400'],
    '500': core.info['info-500'],
    '600': core.info['info-600'],
    '700': core.info['info-700'],
    '800': core.info['info-800'],
    '900': core.info['info-900'],
  },
  shading: {
    '000': core.shading['shading-000'],
    '50': core.shading['shading-50'],
    '100': core.shading['shading-100'],
    '200': core.shading['shading-200'],
    '300': core.shading['shading-300'],
    '400': core.shading['shading-400'],
    '500': core.shading['shading-500'],
    '600': core.shading['shading-600'],
    '700': core.shading['shading-700'],
    '800': core.shading['shading-800'],
    '900': core.shading['shading-900'],
    '950': core.shading['shading-950'],
    '1000': core.shading['shading-1000'],
  },
}

// Semantic UI Tokens - Global Status
export const semanticUI = {
  // success
  'success-light': semantic.ui['success-light'],
  'success-med': semantic.ui['success-med'],
  'success-dark': semantic.ui['success-dark'],
  // info
  'info-light': semantic.ui['info-light'],
  'info-med': semantic.ui['info-med'],
  'info-dark': semantic.ui['info-dark'],
  // warning
  'warning-light': semantic.ui['warning-light'],
  'warning-med': semantic.ui['warning-med'],
  'warning-dark': semantic.ui['warning-dark'],
  // danger
  'danger-light': semantic.ui['danger-light'],
  'danger-med': semantic.ui['danger-med'],
  'danger-dark': semantic.ui['danger-dark'],
}

// Semantic Color Tokens - Brand, Text, Surface
export const semanticColorTokens = {
  colors: {
    light: {
      background: palette.white,
      text: palette.black, //Body foreground color
      'text-muted': semantic.text.muted, // Body foreground color (muted) for alternative styling
      primary: semantic.brand.primary, // Primary color for links, buttons, etc.
      secondary: semantic.brand.secondary, //A secondary brand color for alternative styling
      highlight: semantic.surface.highlight, //A highlight color for emphasizing UI
      muted: semantic.brand.muted,
      accent: semantic.brand.accent, //A contrast color for emphasizing UI
    },
    dark: {
      background: palette.black,
      text: palette.white,
      'text-muted': semantic.text['muted-inverse'],
      primary: semantic.text['primary-inverse'],
      secondary: semantic.text['secondary-inverse'],
      highlight: semantic.surface.highlight,
      muted: semantic.text['muted-inverse'],
      accent: semantic.brand.accent,
    },
    /* 
      We are showing the full object for clarity here
      Could also do the following for simplicity.

      brand: semantic.brand
      text: semantic.text
      surface: semantic.surface

      */
    brand: {
      primary: semantic.brand.primary,
      secondary: semantic.brand.secondary,
      muted: semantic.brand.muted,
      accent: semantic.brand.accent,
    },
    text: {
      primary: semantic.text.primary,
      secondary: semantic.text.secondary,
      muted: semantic.text.muted,
      disabled: semantic.text.disabled,
      success: semantic.text.success,
      warning: semantic.text.warning,
      danger: semantic.text.danger,
      link: semantic.text.link,
      'primary-inverse': semantic.text['primary-inverse'],
      'secondary-inverse': semantic.text['secondary-inverse'],
      'muted-inverse': semantic.text['muted-inverse'],
    },
    surface: {
      primary: semantic.surface.primary,
      highlight: semantic.surface.highlight,
      muted: semantic.surface.muted,
      disabled: semantic.surface.disabled,
      border: semantic.surface.border,
      inverse: semantic.surface.inverse,
      'border-inverse': semantic.surface['border-inverse'],
    },
  },
}

// Overlay Tokens
export const overlayTokens = {
  overlay: {
    dark: {
      fill: overlay.dark.fill,
      gradientRight: overlay.dark.gradientRight,
      gradientLeft: overlay.dark.gradientLeft,
    },
    light: {
      fill: overlay.light.fill,
      gradientRight: overlay.light.gradientRight,
      gradientLeft: overlay.light.gradientLeft,
    },
  },
}

export const colors = {
  ...palette,
  ...semanticColorTokens,
  ...semanticUI,
  ...overlayTokens,
}
