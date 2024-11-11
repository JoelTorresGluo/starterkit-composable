'use client'

import {
  Box,
  Radio,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { InfoSectionCustom } from '@modules/account'
import { useUser } from '@modules/commerce'
import { useHandleError } from '@modules/general'
import { countries } from '@modules/general/constants'
import {
  GOOGLE_MAPS_API_KEY,
  StripeAddress,
  commercetoolsCustomerAddressToStripe,
  stripeAddressToComposableShippingAddress,
} from '@modules/stripe'
import {
  ComposableCustomer,
  ComposableAddress,
  UpdateCustomerAction,
  getAddressLabels,
} from '@oriuminc/commerce-generic'
import { StripeAddressElement } from '@oriuminc/stripe'
import {
  ConfirmModal,
  EditableContentCard,
  FormStatus,
} from '@oriuminc/templates/general'
import { CheckboxField, useToast } from '@oriuminc/ui'
import { useRef, useState } from 'react'
import { useIntl } from 'react-intl'

export const AddressFormStripe = ({
  customer,
  customerAddress,
  isEditOpen,
  updateButtonLabel,
  onCancel,
  typeForm,
}: {
  typeForm?: string
  onCancel?: () => void
  updateButtonLabel?: string
  customer?: ComposableCustomer
  customerAddress?: ComposableAddress
  isEditOpen?: boolean
}) => {
  const toast = useToast()
  const intl = useIntl()
  const { createHandleError } = useHandleError()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const deleteButtonRef = useRef(null)
  const [stripeAddress, setStripeAddress] = useState<{
    value: StripeAddress
    complete: boolean
  } | null>(null)
  const [isDefaultAddress, setIsDefaultAddress] = useState(false)
  const [status, setStatus] = useState<FormStatus>()
  const { updateCustomer, customer: _customer } = useUser()
  const defaultShippingAddressId = customer?.defaultShippingAddressId
  const isDefault = customerAddress?.id === defaultShippingAddressId

  const addressLabels = getAddressLabels(customerAddress)

  const deleteAddress = () => {
    if (!customerAddress?.id) {
      return
    }

    updateCustomer.mutate(
      {
        actions: [
          {
            action: 'deleteShippingAddress',
            addressId: customerAddress.id,
          },
        ],
      },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            title: intl.formatMessage({
              id: 'account.dashboard.addresses.delete.title',
            }),
            description: intl.formatMessage({
              id: 'account.dashboard.addresses.delete.success.message',
            }),
          })
        },
        onError: createHandleError(onClose),
      }
    )
  }

  const setDefaultAddress = (addressId: string) => {
    updateCustomer.mutate(
      {
        actions: [
          {
            action: 'setDefaultShippingAddress',
            addressId: addressId,
          },
        ],
      },
      {
        onSuccess: () => {
          toast({
            status: 'success',
            title: intl.formatMessage({
              id: 'account.dashboard.addresses.setDefault.title',
            }),
            description: intl.formatMessage({
              id: 'account.dashboard.addresses.setDefault.success.message',
            }),
          })
        },
        onError: createHandleError(onClose),
      }
    )
  }

  const handleSubmit = () => {
    if (!stripeAddress?.complete) {
      setStatus('error')
      return
    }

    const actions: UpdateCustomerAction[] = []

    if (stripeAddress && typeForm === 'add') {
      updateCustomer.mutate(
        {
          actions: [
            {
              action: 'saveShippingAddress',
              address: {
                ...stripeAddressToComposableShippingAddress(
                  stripeAddress.value
                ),
              },
            },
          ],
        },
        {
          onSuccess: (data) => {
            const { addresses } = data ?? {}
            if (isDefaultAddress) {
              const { id: addressId } = addresses?.[addresses?.length - 1] ?? {}
              if (addressId) {
                setDefaultAddress(addressId)
                setStatus('success')
              }
            }
            onCancel?.()
          },
          onError: () => setStatus('error'),
        }
      )

      return
    }

    if (!customerAddress?.id || !stripeAddress) {
      return
    }

    actions.push({
      action: 'updateShippingAddress',
      addressId: customerAddress.id,
      address: stripeAddressToComposableShippingAddress(stripeAddress.value),
    })

    if (isDefaultAddress) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: customerAddress.id,
      })
    }

    updateCustomer.mutate(
      {
        actions: actions,
      },
      {
        onSuccess: () => setStatus('success'),
        onError: () => setStatus('error'),
      }
    )
  }

  return (
    <Box key={customerAddress?.id} mb='5'>
      <EditableContentCard
        size='Large'
        onCancel={onCancel}
        editModeOn={isEditOpen ?? false}
        deleteFn={onOpen}
        deleteButtonRef={deleteButtonRef}
        title={customerAddress?.addressLine1}
        editTitle={
          typeForm === 'add'
            ? intl.formatMessage({
                id: 'account.dashboard.addresses.addAddress',
              })
            : intl.formatMessage({
                id: 'account.dashboard.addresses.edit',
              })
        }
        readOnly={
          <>
            {addressLabels && (
              <Box gap='1'>
                <InfoSectionCustom.Content
                  content={[
                    addressLabels?.address,
                    addressLabels?.name,
                    addressLabels?.cityRegionPostalCode,
                  ]}
                />
              </Box>
            )}
            <Spacer h='4' />
            <Box
              onClick={(e) => {
                e.preventDefault()
                if (!customerAddress?.id) {
                  return
                }

                !isDefault && setDefaultAddress(customerAddress.id)
              }}
            >
              <Radio
                value='id'
                size='lg'
                isChecked={isDefault}
                _checked={{
                  borderWidth: 1,
                  borderColor: 'primary',
                }}
              >
                <Text textStyle='blockquote-75' fontSize='sm'>
                  {intl.formatMessage({
                    id: 'account.dashboard.addresses.defaultCheckbox',
                  })}
                </Text>
              </Radio>
            </Box>
          </>
        }
        status={status}
        setStatus={setStatus}
        onSubmit={() => handleSubmit()}
        isLoading={updateCustomer.isPending}
        updateButtonLabel={
          updateButtonLabel ??
          intl.formatMessage({ id: 'action.updateInformation' })
        }
        edit={
          <Stack spacing={4} direction='column'>
            <StripeAddressElement
              onChange={(e) => {
                setStripeAddress({
                  value: e.value,
                  complete: e.complete,
                })
                setStatus(undefined)
              }}
              options={{
                autocomplete: {
                  mode: 'google_maps_api',
                  apiKey: GOOGLE_MAPS_API_KEY,
                },
                fields: {
                  phone: 'always',
                },
                display: {
                  name: 'split',
                },
                allowedCountries: countries.map((c) => c.code),
                mode: 'shipping',
                defaultValues: customerAddress
                  ? commercetoolsCustomerAddressToStripe(customerAddress)
                  : undefined,
              }}
            />

            {!isDefault && (
              <CheckboxField
                content={intl.formatMessage({
                  id: 'account.dashboard.addresses.defaultCheckbox',
                })}
                checkboxProps={{
                  name: 'isDefaultAddress',
                  isChecked: isDefaultAddress,
                  onChange: (e) => setIsDefaultAddress(e.target.checked),
                }}
              />
            )}
          </Stack>
        }
      />
      <ConfirmModal
        isOpen={isOpen}
        deleteButtonRef={deleteButtonRef}
        onClose={onClose}
        title={intl.formatMessage({
          id: 'account.dashboard.addresses.delete.title',
        })}
        description={intl.formatMessage({
          id: 'account.dashboard.addresses.delete.description',
        })}
        actionButtonLabel={intl.formatMessage({
          id: 'account.dashboard.addresses.delete.buttonLabel',
        })}
        cancelButtonLabel={intl.formatMessage({ id: 'action.cancel' })}
        onConfirm={deleteAddress}
      />
    </Box>
  )
}
