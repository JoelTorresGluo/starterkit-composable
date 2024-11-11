import { Box, BoxProps } from '@chakra-ui/react'

export const WarnTag = (props: BoxProps) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      w='full'
      color='danger.500'
      textStyle='blockquote-75'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='14'
        height='14'
        fill='none'
      >
        <path
          fill='#E53E3E'
          d='M7 .5A6.507 6.507 0 0 0 .5 7c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5S10.584.5 7 .5Zm0 9.997a.626.626 0 1 1 0-1.251.626.626 0 0 1 0 1.251Zm.679-6.286-.18 3.813a.5.5 0 1 1-1 0l-.179-3.81v-.002a.68.68 0 1 1 1.357 0h.002Z'
        />
      </svg>
      <Box ml='1' {...props} />
    </Box>
  )
}
