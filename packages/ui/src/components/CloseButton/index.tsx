import { CloseButton as ChakraCloseButton } from '@chakra-ui/react'

export interface CloseButtonProps {
  size: CloseButtonSize
  isDisabled: boolean
}

export type CloseButtonSize = 'sm' | 'md' | 'lg'

export const CloseButton = ({
  size = 'sm',
  isDisabled = false,
}: CloseButtonProps) => {
  return <ChakraCloseButton size={size} isDisabled={isDisabled} />
}
