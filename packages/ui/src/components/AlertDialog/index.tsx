import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  CloseButton,
} from '@chakra-ui/react'

export interface AlertDialogProps {
  theme?: AlertDialogTheme
  isOpen: boolean
  onClose: () => void
  leastDestructiveRef: React.RefObject<HTMLButtonElement>
  headerText: string
  bodyText: string
  actionButtonText: string
}

export type AlertDialogTheme = 'dark' | 'light' | 'highlight'

export const AlertDialog = ({
  theme = 'dark',
  onClose,
  isOpen,
  leastDestructiveRef,
  headerText,
  bodyText,
  actionButtonText = 'Accept',
}: AlertDialogProps) => {
  let style = { cancelBtn: {}, actionBtn: {}, bg: '', color: '' }
  switch (theme) {
    case 'dark':
      style = {
        cancelBtn: {
          variant: 'outline-alt',
        },
        actionBtn: {
          variant: 'solid-alt',
        },
        bg: 'colors.surface.inverse',
        color: 'colors.text.primary-inverse',
      }
      break
    case 'light':
      style = {
        cancelBtn: {
          variant: 'outline',
        },
        actionBtn: {
          variant: 'solid',
        },
        bg: 'colors.surface.primary',
        color: 'colors.text.primary',
      }
      break
    case 'highlight':
      style = {
        cancelBtn: {
          variant: 'outline',
        },
        actionBtn: {
          variant: 'solid',
        },
        bg: 'colors.surface.highlight',
        color: 'colors.text.primary',
      }
      break
    default:
      break
  }

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={leastDestructiveRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent p='4' bg={style.bg} color={style.color}>
          <AlertDialogHeader
            color={style.color}
            textStyle='heading-200'
            px='none'
            py='2'
          >
            {headerText}
          </AlertDialogHeader>
          <AlertDialogBody
            color={style.color}
            textStyle='body-75-100'
            px='none'
            py='2'
          >
            {bodyText}
          </AlertDialogBody>
          <AlertDialogFooter p={{ base: 3, lg: 4 }}>
            <Button
              ref={leastDestructiveRef}
              size={{ base: 'md', lg: 'sm' }}
              onClick={onClose}
              {...style.cancelBtn}
            >
              Cancel
            </Button>
            <Button
              onClick={onClose}
              size={{ base: 'md', lg: 'sm' }}
              ml='3'
              {...style.actionBtn}
            >
              {actionButtonText}
            </Button>
          </AlertDialogFooter>
          <CloseButton
            alignSelf='flex-start'
            position='absolute'
            right={4}
            top={6}
            onClick={onClose}
          />
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  )
}
