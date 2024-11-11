import { useIntl } from 'react-intl'
import { useState } from 'react'
import {
  Alert,
  AlertProps,
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { FormStatus } from '@oriuminc/templates/general'
import { ComposableAddress, getAddressLabels } from '@oriuminc/commerce-generic'
import { ShippingAddressForm } from './shipping-address-form'
import { ActorRefFrom } from 'xstate'
import { deliveryOptionsMachine } from '../machines/sections/delivery-options-machine'
import { ENABLE_STRIPE_ADDRESS_ELEMENT } from '../constants'
import { ShippingAddressFormStripe } from './shipping-address-form-stripe'

export interface ShippingAddressOptionProps {
  address?: ComposableAddress
  isNewAddress?: boolean
  onEdit?: () => any
  onSelect: () => void
  deliveryOptionsRef: ActorRefFrom<typeof deliveryOptionsMachine>
}

export const ShippingAddressOption = ({
  address,
  isNewAddress = false,
  onEdit,
  onSelect,
  deliveryOptionsRef,
}: ShippingAddressOptionProps) => {
  const intl = useIntl()
  const [status, setStatus] = useState<FormStatus>()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addressLabels = getAddressLabels(address)

  const addressTitle =
    addressLabels?.address ??
    intl.formatMessage({
      id: 'checkout.shippingAddressForm.title.newShippingAddress',
    })

  const content = {
    select: intl.formatMessage({ id: 'action.select' }),
    title: intl.formatMessage({
      id: 'checkout.shippingAddressForm.title.editShippingAddress',
    }),
    button: {
      cancel: intl.formatMessage({ id: 'action.cancel' }),
      delete: intl.formatMessage({ id: 'action.delete' }),
      edit: intl.formatMessage({ id: 'action.edit' }),
      submit: intl.formatMessage({ id: 'action.update' }),
    },
    alert: {
      error: intl.formatMessage({ id: 'account.dashboard.submit.error' }),
      success: intl.formatMessage(
        { id: 'account.dashboard.submit.success' },
        { title: addressTitle }
      ),
    },
  }

  const StatusAlert = ({
    status,
    alertProps,
  }: {
    status: FormStatus
    alertProps?: AlertProps
  }) => {
    if (status === undefined) <></>

    return status === 'success' ? (
      <Alert
        status='success'
        borderRadius='md'
        mt='2'
        py='2'
        px='3'
        {...alertProps}
      >
        {content.alert.success}
      </Alert>
    ) : (
      <Alert
        status='error'
        borderRadius='md'
        mt='2'
        py='2'
        px='3'
        {...alertProps}
      >
        {content.alert.error}
      </Alert>
    )
  }

  return (
    <Box>
      {address && (
        <Modal isOpen={isOpen} onClose={onClose} size='lg'>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <HStack justifyContent='space-between'>
                <Text as='h3' textStyle='desktop-200'>
                  {content.title}
                </Text>
                <ModalCloseButton size='md' fontSize='sm' top='3' right='3' />
              </HStack>
            </ModalHeader>
            <ModalBody pb='6'>
              {status && (
                <StatusAlert status={status} alertProps={{ mb: 3, p: 3 }} />
              )}
              {ENABLE_STRIPE_ADDRESS_ELEMENT ? (
                <ShippingAddressFormStripe
                  showSubmitButton
                  deliveryOptionsRef={deliveryOptionsRef}
                  setStatus={setStatus}
                  initialValues={address}
                  onClose={onClose}
                  onChange={({ isValid }) => {
                    if (!isValid) return
                    // validation.run('shippingAddressForm')
                  }}
                />
              ) : (
                <ShippingAddressForm
                  showSubmitButton
                  deliveryOptionsRef={deliveryOptionsRef}
                  setStatus={setStatus}
                  initialValues={address}
                  onClose={onClose}
                  onChange={({ isValid }) => {
                    if (!isValid) return
                    // validation.run('shippingAddressForm')
                  }}
                />
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <Flex alignItems='flex-start' cursor='pointer'>
        <Flex flex='1' alignItems='flex-start' onClick={onSelect}>
          <Radio
            value={isNewAddress ? 'new' : address?.id}
            inputProps={{ 'aria-label': `${content.select} ${content.title}` }}
            size='lg'
          />
          <Box flex='1' textAlign='left' fontSize='sm' px='2'>
            <Text fontWeight='extrabold' aria-label={addressTitle}>
              {addressTitle}
            </Text>
            {addressLabels && (
              <>
                <Box fontSize='sm'>
                  <Text>{addressLabels.name}</Text>
                  <Text>{addressLabels.cityRegionPostalCode}</Text>
                </Box>
                {status === 'success' && <StatusAlert status={status} />}
              </>
            )}
          </Box>
        </Flex>
        {onEdit && (
          <Button
            size='sm'
            color='text'
            variant='ghost'
            textDecoration='underline'
            aria-label={`${content.title} ${addressLabels?.address}`}
            onClick={() => {
              setStatus(undefined)
              onOpen()
              onEdit()
            }}
          >
            {content.button.edit}
          </Button>
        )}
      </Flex>
    </Box>
  )
}
