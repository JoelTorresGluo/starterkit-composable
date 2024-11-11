import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
} from '@chakra-ui/react'

interface ConfirmModalProps extends UseDisclosureProps {
  title: string
  description: string
  actionButtonLabel: string
  onConfirm: () => void
  cancelButtonLabel: string
  deleteButtonRef?: React.RefObject<HTMLButtonElement>
}

export function ConfirmModal({
  title,
  description,
  actionButtonLabel,
  onClose,
  isOpen,
  onConfirm,
  cancelButtonLabel,
  deleteButtonRef,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen!}
      onClose={onClose!}
      isCentered
      finalFocusRef={deleteButtonRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb='6'>{description}</ModalBody>

        <ModalFooter>
          <Button variant='solid-alt' mr='3' onClick={onClose}>
            {cancelButtonLabel}
          </Button>
          <Button variant='danger' onClick={onConfirm}>
            {actionButtonLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
