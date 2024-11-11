import { AlertProps, createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(['container', 'title', 'description', 'icon'])

const baseStyle = definePartsStyle((props: AlertProps) => {
  const { status, variant } = props

  const successBase = status === 'success' && {
    container: {
      background: 'success-light',
      color: 'text',
      borderRadius: 'md',
    },
  }

  const successSolid = status === 'success' &&
    variant === 'solid' && {
      container: {
        background: 'success-med',
      },
    }

  const warningBase = status === 'warning' && {
    container: {
      background: 'warning-light',
      color: 'text',
      borderRadius: 'md',
    },
  }

  const warningSolid = status === 'warning' &&
    variant === 'solid' && {
      container: {
        background: 'warning-med',
      },
    }

  const errorBase = status === 'error' && {
    container: {
      background: 'danger-light',
      color: 'text',
      borderRadius: 'md',
    },
  }

  const errorSolid = status === 'error' &&
    variant === 'solid' && {
      container: {
        background: 'danger-med',
      },
    }
  const infoBase = status === 'info' && {
    container: {
      background: 'info-light',
      color: 'text',
      borderRadius: 'lg',
    },
  }
  const infoSolid = status === 'info' &&
    variant === 'solid' && {
      container: {
        background: 'info-med',
      },
    }

  return {
    ...successBase,
    ...successSolid,
    ...warningBase,
    ...warningSolid,
    ...errorBase,
    ...errorSolid,
    ...infoBase,
    ...infoSolid,
  }
})

export const alertTheme = defineMultiStyleConfig({ baseStyle }) as any
