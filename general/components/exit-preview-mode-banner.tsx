'use client'

import { useRouter } from 'next/router'
import { Box, Button, Flex } from '@chakra-ui/react'

export const ExitPreviewModeBanner = () => {
  const router = useRouter()

  async function exitPreviewMode() {
    const res = await fetch('/api/amplience/exit-preview')

    if (res) {
      router.push('/')
    }
  }

  return (
    <Box w='full'>
      <Flex
        w='full'
        p='2'
        zIndex='4'
        justifyContent='center'
        bg='primary'
        textColor='white'
        align='center'
        top='none'
        left='none'
        pos='fixed'
      >
        Preview Mode is on,&nbsp;
        <Button onClick={() => exitPreviewMode()} variant='link' color='white'>
          turn it off
        </Button>
      </Flex>
    </Box>
  )
}
