'use client'

import { Box, BoxProps } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export const MegaMenu = ({ children, ...props }: BoxProps) => {
  const intl = useIntl()
  return (
    <Box
      as='nav'
      id='mega-menu'
      _focus={{ outline: 'none', boxShadow: 'outline' }}
      tabIndex={-1}
      aria-label='Main Menu'
      position='relative'
      zIndex='2'
      display={['none', null, null, 'flex']}
      justifyContent='center'
      borderBottom='sm'
      {...props}
    >
      {children}
    </Box>
  )
}
