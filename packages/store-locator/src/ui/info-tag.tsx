import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

export const InfoTag = (props: BoxProps) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      w='full'
      color='info.500'
      textStyle='blockquote-75'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='14'
        height='14'
        fill='none'
      >
        <path
          fill='#3182CE'
          d='M7 .75A6.257 6.257 0 0 0 .75 7 6.257 6.257 0 0 0 7 13.25 6.257 6.257 0 0 0 13.25 7 6.257 6.257 0 0 0 7 .75Zm0 2.563a.812.812 0 1 1 0 1.624.812.812 0 0 1 0-1.625Zm1.5 7.062H5.75a.5.5 0 0 1 0-1h.875v-2.75h-.5a.5.5 0 1 1 0-1h1a.5.5 0 0 1 .5.5v3.25H8.5a.5.5 0 1 1 0 1Z'
        />
      </svg>
      <Box ml='1' {...props} />
    </Box>
  )
}
