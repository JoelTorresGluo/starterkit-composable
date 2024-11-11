import React from 'react'
import { Button } from '@chakra-ui/react'

interface CheckoutStepLinksProps {
  title: string
  isAllowed: boolean
  active: boolean
  onClick?: () => void
}

export const CheckoutStepLink = ({
  isAllowed,
  active,
  title,
  onClick,
}: CheckoutStepLinksProps) => {
  return (
    <Button
      borderBottom='md'
      borderBottomColor={active ? 'primary' : 'transparent'}
      borderRadius='none'
      color={active ? 'primary' : 'text-muted'}
      fontWeight={active ? 'bold' : 'regular'}
      disabled={!isAllowed}
      fontSize={{ base: 'xs', md: 'sm' }}
      tabIndex={isAllowed ? 0 : -1}
      arial-label={'Checkout step ' + title}
      onClick={() => isAllowed && onClick !== undefined && onClick()}
      px={{ base: 3, md: 4 }}
      py={{ base: 2, md: 'none' }}
      textDecoration='none'
      variant='link'
      _hover={{
        textDecoration: 'none',
      }}
    >
      {title}
    </Button>
  )
}
