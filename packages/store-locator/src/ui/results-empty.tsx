import { Box, BoxProps } from '@chakra-ui/react'

export const ResultsEmpty = (props: {
  root?: BoxProps
  title: string
  description: string
}) => {
  return (
    <Box
      display='flex'
      w='full'
      margin='0 auto'
      flexDir='column'
      justifyItems='center'
      alignItems='center'
      textAlign='center'
      {...props.root}
    >
      <Box>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='40'
          height='56'
          fill='none'
        >
          <path
            fill='#111'
            stroke='#111'
            strokeWidth='3'
            d='m18.012 53.488-.004-.006c-2.163-2.919-6.314-8.776-9.893-15.236C3.635 30.159 1.5 23.755 1.5 19.125 1.5 9.472 9.737 1.5 20 1.5s18.5 7.972 18.5 17.625c0 4.634-2.135 11.037-6.607 19.12-3.58 6.461-7.734 12.318-9.894 15.238l-.004.005a2.47 2.47 0 0 1-3.983 0ZM20 29.5h.002a9.51 9.51 0 0 0 9.498-9.498V20a9.5 9.5 0 1 0-9.5 9.5Z'
          />
        </svg>
      </Box>
      <Box textStyle='desktop-300' fontWeight='bold' mt='5' mb='2'>
        {props.title}
      </Box>
      <Box textStyle='blockquote-100'>{props.description}</Box>
    </Box>
  )
}
