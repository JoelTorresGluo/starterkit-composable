import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export const HomeTag = (props: BoxProps) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      borderRadius='md'
      bg='shading.200'
      lineHeight='shorter'
      px='2'
      py='1'
      color='text'
      fontSize='sm'
      fontWeight='700'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='12'
        height='12'
        fill='none'
      >
        <path
          stroke='#111'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.5'
          d='M1.875 4.969v5.53a.375.375 0 0 0 .375.376H4.5V7.687a.562.562 0 0 1 .563-.562h1.875a.563.563 0 0 1 .562.562v3.188h2.25a.375.375 0 0 0 .375-.375V4.969m1.125 1.03L6.255 1.22c-.117-.124-.39-.126-.51 0L.75 5.999m8.625-1.804V1.5H8.25v1.617'
        />
      </svg>
      <Box ml='1' {...props} />
    </Box>
  )
}
