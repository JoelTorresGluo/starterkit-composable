'use client'

import { Box, Button, ButtonProps } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface SidebarLogoutProps {
  onClick?: () => void
  buttonProps?: ButtonProps
}

export const SidebarLogout = ({ onClick, buttonProps }: SidebarLogoutProps) => {
  const intl = useIntl()

  return (
    <Box w='full'>
      <Button
        my='6'
        onClick={() => onClick?.()}
        size='md'
        variant='outline'
        w='full'
        {...buttonProps}
      >
        {intl.formatMessage({ id: 'action.logout' })}
      </Button>
    </Box>
  )
}
