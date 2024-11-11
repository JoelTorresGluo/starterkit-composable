import {
  Alert as ChakraAlert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex,
} from '@chakra-ui/react'

export interface AlertProps {
  variant?: AlertVariant
  onClose: () => void
  titleText: string
  bodyText: string
  alertStatus: AlertStatus
  titlePosition: AlertTitlePosition
}

export type AlertVariant = 'subtle' | 'solid' | 'left-accent'
export type AlertStatus = 'success' | 'info' | 'warning' | 'error' | 'loading'
export type AlertTitlePosition = 'none' | 'left' | 'top'

export const Alert = ({
  variant = 'subtle',
  onClose,
  titleText,
  bodyText,
  alertStatus,
  titlePosition,
}: AlertProps) => {
  return (
    <ChakraAlert status={alertStatus} variant={variant} borderRadius='md'>
      <AlertIcon />
      <Flex flexDirection={titlePosition === 'top' ? 'column' : 'row'}>
        {titleText && titlePosition !== 'none' && (
          <AlertTitle>{titleText}</AlertTitle>
        )}
        <AlertDescription>{bodyText}</AlertDescription>
      </Flex>
      <CloseButton
        alignSelf='flex-start'
        position='relative'
        // TODO: Check if lack of unit is an issue.
        right={-1}
        top='none'
        onClick={onClose}
      />
    </ChakraAlert>
  )
}
