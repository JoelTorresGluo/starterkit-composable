'use client'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonProps,
  useDisclosure,
} from '@chakra-ui/react'
import { api } from '@modules/trpc/react'
import { Locale, getCurrency } from '@oriuminc/base'
import { useToast } from '@oriuminc/ui'
import { useRef } from 'react'
import { useIntl } from 'react-intl'

export const CancelOrderButton = ({
  orderId,
  onOrderCancelSuccess,
  buttonProps,
}: {
  orderId: string
  onOrderCancelSuccess?: () => void
  buttonProps?: ButtonProps
}) => {
  const intl = useIntl()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const cancelRef = useRef(null)
  const { mutate, isPending } = api.commerce.cancelOrder.useMutation()

  const handleConfirmCancel = () => {
    mutate(
      {
        orderId,
        locale: intl.locale as Locale,
        currency: getCurrency(intl.locale),
      },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            title: intl.formatMessage({
              id: 'account.orders.cancel.action.success.toast',
            }),
          })
          onOrderCancelSuccess?.()
          onClose()
        },
        onError: (e) => {
          toast({
            status: 'error',
            description: e.message,
          })
          onClose()
        },
      }
    )
  }

  return (
    <>
      <Button onClick={onOpen} {...buttonProps}>
        {intl.formatMessage({ id: 'account.orders.cancel.action' })}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {intl.formatMessage({ id: 'account.orders.cancel.action' })}
            </AlertDialogHeader>

            <AlertDialogBody>
              {intl.formatMessage({
                id: 'account.orders.cancel.action.confirm',
              })}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                isDisabled={isPending}
                variant='outline'
              >
                {intl.formatMessage({
                  id: 'account.orders.cancel.action.confirm.no',
                })}
              </Button>
              <Button
                onClick={handleConfirmCancel}
                isLoading={isPending}
                ml={3}
              >
                {intl.formatMessage({
                  id: 'account.orders.cancel.action.confirm.yes',
                })}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
