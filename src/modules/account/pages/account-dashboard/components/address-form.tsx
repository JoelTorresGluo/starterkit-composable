'use client'

import {
  Box,
  Radio,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { InfoSectionCustom } from '@modules/account'
import { useUser } from '@modules/commerce'
import { countries, useHandleError } from '@modules/general'
import {
  ComposableAddress,
  ComposableCustomer,
  UpdateCustomerAction,
  getComposableAddressSchema,
} from '@oriuminc/commerce-generic'
import {
  ConfirmModal,
  EditableContentCard,
  FormStatus,
} from '@oriuminc/templates/general'
import { CheckboxField, InputField, SelectField, useToast } from '@oriuminc/ui'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

export const AddressForm = ({
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
  const { createHandleError } = useHandleError()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const deleteButtonRef = useRef(null)

  const [status, setStatus] = useState<FormStatus>()
  const { updateCustomer } = useUser()

  const intl = useIntl()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ComposableAddress>({
    resolver: zodResolver(getComposableAddressSchema(intl)),
    mode: 'onTouched',
  })

  // if (!customer) return <></>

  const defaultShippingAddressId = customer?.defaultShippingAddressId
  const isDefault = customerAddress?.id === defaultShippingAddressId

  const deleteAddress = () => {
    updateCustomer.mutate(
      {
        actions: [
          {
            action: 'deleteShippingAddress',
            addressId: customerAddress?.id,
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

  const onSubmit = (data: ComposableAddress) => {
    const actions: UpdateCustomerAction[] = []

    const { isDefaultAddress, ...addressData } = data

    if (typeForm === 'add') {
      actions.push({
        action: 'saveShippingAddress',
        address: addressData,
      })
      updateCustomer.mutate(
        { actions: actions },
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

    actions.push({
      action: 'updateShippingAddress',
      addressId: customerAddress?.id,
      address: addressData,
    })

    if (isDefaultAddress) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: customerAddress?.id,
      })
    }

    updateCustomer.mutate(
      { actions },
      {
        onSuccess: () => setStatus('success'),
        onError: () => setStatus('error'),
      }
    )
  }
  const onError = (e: any) => {
    setStatus('error')
  }

  return (
    <Box key={customerAddress?.id} mb={5}>
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
            <Box gap={1}>
              <InfoSectionCustom.Content
                content={[
                  `${customerAddress?.firstName} ${customerAddress?.lastName}`,
                  `${customerAddress?.addressLine1} ${customerAddress?.addressLine2}`,
                  `${customerAddress?.phoneNumber}`,
                ]}
              />
            </Box>
            <Spacer h={4} />
            <Box
              onClick={(e) => {
                e.preventDefault()
                !isDefault && setDefaultAddress(customerAddress?.id!)
              }}
            >
              <Radio value='id' size='lg' isChecked={isDefault}>
                <Text textStyle='blockquote-75' fontSize='sm'>
                  {intl.formatMessage({
                    id: 'account.dashboard.addresses.defaultCheckbox',
                  })}
                </Text>
              </Radio>
            </Box>
          </>
        }
        isDirty={isDirty}
        status={status}
        setStatus={setStatus}
        onSubmit={handleSubmit(onSubmit, onError)}
        resetEditForm={reset}
        updateButtonLabel={
          updateButtonLabel ??
          intl.formatMessage({ id: 'action.updateInformation' })
        }
        edit={
          <Stack spacing='4' direction='column'>
            <Stack direction={{ base: 'column', md: 'row' }}>
              <InputField
                label={intl.formatMessage({
                  id: 'checkout.shippingAddressForm.label.firstName',
                })}
                inputProps={{
                  defaultValue: customerAddress?.firstName ?? '',
                  ...register('firstName'),
                }}
                error={errors.firstName}
                isRequired
              />
              <InputField
                label={intl.formatMessage({
                  id: 'checkout.shippingAddressForm.label.lastName',
                })}
                inputProps={{
                  defaultValue: customerAddress?.lastName ?? '',
                  ...register('lastName'),
                }}
                error={errors.lastName}
                isRequired
              />
            </Stack>
            <Stack alignItems='baseline' gap={1}>
              <InputField
                label={intl.formatMessage({
                  id: 'account.dashboard.addresses.label.addressLine1',
                })}
                inputProps={{
                  defaultValue: customerAddress?.addressLine1 ?? '',
                  ...register('addressLine1'),
                }}
                error={errors.addressLine1}
                isRequired
              />
              <InputField
                label={intl.formatMessage({
                  id: 'account.dashboard.addresses.label.addressLine2',
                })}
                inputProps={{
                  defaultValue: customerAddress?.addressLine2 ?? '',
                  placeholder: intl.formatMessage({
                    id: 'account.dashboard.addresses.placeholder.addressLine2',
                  }),
                  ...register('addressLine2'),
                }}
                error={errors.addressLine2}
              />
            </Stack>

            <Stack direction={{ base: 'column', md: 'row' }}>
              <SelectField
                label={intl.formatMessage({
                  id: 'checkout.shippingAddressForm.label.country',
                })}
                selectProps={{
                  backgroundColor: 'white',
                  defaultValue: customerAddress?.country ?? '',
                  ...register('country'),
                }}
                error={errors.country}
                isRequired
              >
                <option defaultValue='' disabled value=''>
                  {intl.formatMessage({
                    id: 'action.selectCountry',
                  })}
                </option>
                <>
                  {countries.map((country) => {
                    const label = country.intlId
                      ? intl.formatMessage({ id: country.intlId })
                      : country.name
                    return (
                      <option
                        title={label}
                        aria-label={label}
                        key={country.code}
                        value={country.code}
                      >
                        {label}
                      </option>
                    )
                  })}
                </>
              </SelectField>
              <InputField
                label={intl.formatMessage({
                  id: 'checkout.shippingAddressForm.label.postcode',
                })}
                inputProps={{
                  defaultValue: customerAddress?.postalCode ?? '',
                  ...register('postalCode'),
                }}
                error={errors.postalCode}
                isRequired
              />
            </Stack>

            <Stack direction={{ base: 'column', md: 'row' }}>
              <InputField
                label={intl.formatMessage({
                  id: 'checkout.shippingAddressForm.label.state',
                })}
                inputProps={{
                  defaultValue: customerAddress?.region ?? '',
                  ...register('region'),
                }}
                error={errors.region}
                isRequired
              />
              <InputField
                label={intl.formatMessage({
                  id: 'checkout.shippingAddressForm.label.city',
                })}
                inputProps={{
                  defaultValue: customerAddress?.city ?? '',
                  ...register('city'),
                }}
                error={errors.city}
                isRequired
              />
            </Stack>

            <InputField
              label={intl.formatMessage({
                id: 'checkout.shippingAddressForm.label.phoneNumber',
              })}
              inputProps={{
                defaultValue: customerAddress?.phoneNumber ?? '',
                ...register('phoneNumber'),
              }}
              error={errors.phoneNumber}
            />

            {!isDefault && (
              <CheckboxField
                content={intl.formatMessage({
                  id: 'account.dashboard.addresses.defaultCheckbox',
                })}
                checkboxProps={{
                  ...register('isDefaultAddress'),
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
