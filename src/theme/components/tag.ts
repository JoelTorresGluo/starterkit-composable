import { StyleConfig } from '@chakra-ui/react'

export const Tag: StyleConfig = {
  baseStyle: () => ({
    container: {
      borderRadius: 'sm',
      gap: '1',
      boxShadow: 'none',
    },
  }),
  sizes: {
    sm: {
      container: {
        px: '2',
        height: '5',
      },
      label: {
        textStyle: 'button-50',
      },
    },
    md: {
      container: {
        px: '2',
        height: '6',
      },
      label: {
        textStyle: 'button-75',
      },
    },
    lg: {
      container: {
        px: '3',
        height: '8',
      },
      label: {
        textStyle: 'button-100',
      },
    },
  },
  variants: {
    solid: () => {
      return {
        container: {
          bg: 'primary',
          color: 'colors.text.primary-inverse',
        },
      }
    },
    'solid-blue': () => {
      return {
        container: {
          bg: 'info-med',
          color: 'colors.text.primary-inverse',
        },
      }
    },
    'solid-green': () => {
      return {
        container: {
          bg: 'success-med',
          color: 'colors.text.primary-inverse',
        },
      }
    },
    'solid-orange': () => {
      return {
        container: {
          bg: 'warning-med',
          color: 'colors.text.primary-inverse',
        },
      }
    },
    'solid-red': () => {
      return {
        container: {
          bg: 'danger-med',
          color: 'colors.text.primary-inverse',
        },
      }
    },
    'solid-gray': () => {
      return {
        container: {
          bg: 'colors.surface.inverse',
          color: 'colors.text.primary-inverse',
        },
      }
    },
    outline: () => {
      return {
        container: {
          color: 'primary',
          borderColor: 'primary',
          bg: 'white',
          borderStyle: 'solid',
          borderWidth: '1px',
          boxShadow: 'none',
        },
      }
    },
    'outline-blue': () => {
      return {
        container: {
          color: 'info-med',
          borderColor: 'info-med',
          borderWidth: '1px',
        },
      }
    },
    'outline-green': () => {
      return {
        container: {
          color: 'success-med',
          borderColor: 'success-med',
          borderWidth: '1px',
        },
      }
    },
    'outline-orange': () => {
      return {
        container: {
          color: 'warning-med',
          borderColor: 'warning-med',
          borderWidth: '1px',
        },
      }
    },
    'outline-red': () => {
      return {
        container: {
          color: 'danger-med',
          borderColor: 'danger-med',
          borderWidth: '1px',
        },
      }
    },
    'outline-gray': () => {
      return {
        container: {
          color: 'text-muted',
          borderColor: 'muted',
          borderWidth: '1px',
        },
      }
    },
    subtle: () => {
      return {
        container: {
          bg: 'highlight',
          color: 'primary',
        },
      }
    },
    'subtle-blue': () => {
      return {
        container: {
          bg: 'info-light',
          color: 'info-dark',
        },
      }
    },
    'subtle-green': () => {
      return {
        container: {
          bg: 'success-light',
          color: 'success-dark',
        },
      }
    },
    'subtle-orange': () => {
      return {
        container: {
          bg: 'warning-light',
          color: 'warning-dark',
        },
      }
    },
    'subtle-red': () => {
      return {
        container: {
          bg: 'danger-light',
          color: 'danger-dark',
        },
      }
    },
    'subtle-gray': () => {
      return {
        container: {
          bg: 'muted',
          color: 'colors.text.primary',
        },
      }
    },
  },
}
