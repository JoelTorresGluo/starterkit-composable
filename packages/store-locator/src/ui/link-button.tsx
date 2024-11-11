import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

export const LinkButton = (props: ButtonProps) => {
  return (
    <Button
      variant='unstyled'
      h='auto'
      color='text'
      fontSize='sm'
      fontWeight='700'
      textDecorationLine='underline'
      textUnderlineOffset='1'
      {...props}
    />
  )
}
