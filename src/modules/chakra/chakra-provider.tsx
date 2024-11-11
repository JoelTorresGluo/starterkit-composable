'use client'

import { ChakraProvider as ChakraUiProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { theme } from '@oriuminc/chakra'

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraUiProvider theme={theme}>{children}</ChakraUiProvider>
    </CacheProvider>
  )
}
