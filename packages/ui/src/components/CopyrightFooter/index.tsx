import { Box, ButtonGroup, IconButton, Stack, Text } from '@chakra-ui/react'
import { FaInstagramSquare, FaTwitter, FaYoutube } from 'react-icons/fa'

export interface CopyrightFooterProps {
  copyrightText?: string
}

export const CopyrightFooter = ({ copyrightText }: CopyrightFooterProps) => {
  return (
    <Stack
      pt={{ base: 'none', md: 8 }}
      pb={{ base: 12, md: 8 }}
      justify='space-between'
      direction={{ base: 'column-reverse', md: 'row' }}
      align={{ base: 'left', md: 'center' }}
    >
      <Box>
        <Text fontSize='sm' color='subtle'>
          {copyrightText}
        </Text>
      </Box>

      <ButtonGroup variant='ghost'>
        <IconButton
          as='a'
          href='#'
          aria-label='Instagram'
          icon={<FaInstagramSquare fontSize='3xl' />}
        />
        <IconButton
          as='a'
          href='#'
          aria-label='Twitter'
          icon={<FaTwitter fontSize='3xl' />}
        />
        <IconButton
          as='a'
          href='#'
          aria-label='YouTube'
          icon={<FaYoutube fontSize='3xl' />}
        />
      </ButtonGroup>
    </Stack>
  )
}
