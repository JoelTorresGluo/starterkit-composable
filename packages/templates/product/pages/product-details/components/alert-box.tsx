'use client'

import {
  Alert,
  AlertDescription,
  AlertDescriptionProps,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Box,
  CloseButton,
  CloseButtonProps,
  Flex,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

interface AlertBoxProps {
  alertDescriptionProps?: AlertDescriptionProps
  closeButtonProps?: CloseButtonProps
  description?: string | React.ReactElement
  onClick?: () => void
  rootProps?: AlertProps
  title?: string
}

export const AlertBox = (props: AlertBoxProps) => {
  const {
    alertDescriptionProps,
    closeButtonProps,
    description,
    onClick,
    rootProps,
    title,
  } = props

  const bgValue = useColorModeValue('info.100', 'gray.700')
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true })

  return isVisible ? (
    <Alert status='info' mt={6} bg={bgValue} {...rootProps}>
      <Flex>
        <AlertIcon aria-hidden={'true'} />
        <Box>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription
            onClick={() => onClick?.()}
            {...alertDescriptionProps}
          >
            {description}
          </AlertDescription>
        </Box>
      </Flex>
      <CloseButton
        alignSelf='center'
        position='relative'
        onClick={onClose}
        {...closeButtonProps}
      />
    </Alert>
  ) : null
}
