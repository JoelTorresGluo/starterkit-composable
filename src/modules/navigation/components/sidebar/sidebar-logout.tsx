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
        borderRadius='md'
        h='10'
        mx='0'
        my='6'
        onClick={() => onClick?.()}
        size='md'
        textStyle='mobile-50'
        variant='outline'
        w='full'
        {...buttonProps}
      >
        {intl.formatMessage({ id: 'action.logout' })}
      </Button>
    </Box>
  )
}
