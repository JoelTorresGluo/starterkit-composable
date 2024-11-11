import { useToast as useChakraToast, UseToastOptions } from '@chakra-ui/react'

export const useToast: (options?: UseToastOptions) => any = (
  options?: UseToastOptions
) => {
  return useChakraToast({
    position: 'top',
    duration: 2500,
    isClosable: true,
    ...options,
  })
}
