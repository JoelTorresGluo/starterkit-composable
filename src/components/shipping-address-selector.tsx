import { Box, Divider, RadioGroup, Stack } from '@chakra-ui/react'
import { CheckboxField } from '@oriuminc/ui'
import { ComposableAddress } from '@oriuminc/commerce-generic'
import { useIntl } from 'react-intl'
import { ShippingAddressOption } from './shipping-address-option'
import { ShippingAddressForm } from './shipping-address-form'

import { deliveryOptionsMachine } from '../machines/sections/delivery-options-machine'
import { ActorRefFrom } from 'xstate'
import { ENABLE_STRIPE_ADDRESS_ELEMENT } from '../constants'
import { ShippingAddressFormStripe } from './shipping-address-form-stripe'
import { debounce } from '../utils'

interface ShippingAddressSelectorProps {
  list: ComposableAddress[]
  selected: ComposableAddress
  setSelected: (id: string) => void
  saveNewAddress: boolean
  send: (event: any) => void
  deliveryOptionsRef: ActorRefFrom<typeof deliveryOptionsMachine>
}

export const ShippingAddressSelector = ({
  list,
  selected,
  setSelected,
  saveNewAddress,
  send,
  deliveryOptionsRef,
}: ShippingAddressSelectorProps) => {
  const intl = useIntl()

  return (
    <RadioGroup
      name='shipping-address'
      defaultValue={selected.id ?? 'new'}
      value={selected.id ?? 'new'}
    >
      <Stack spacing='md' divider={<Divider />}>
        {list?.map((savedShippingAddress) => (
          <ShippingAddressOption
            deliveryOptionsRef={deliveryOptionsRef}
            address={savedShippingAddress}
            key={savedShippingAddress.id}
            onEdit={() => {
              selected.id !== savedShippingAddress.id &&
                setSelected(savedShippingAddress.id!)

              send({ type: 'edit.shippingAddress' })
            }}
            onSelect={() => {
              selected.id !== savedShippingAddress.id &&
                setSelected(savedShippingAddress.id!)
            }}
          />
        ))}
        <ShippingAddressOption
          isNewAddress={true}
          deliveryOptionsRef={deliveryOptionsRef}
          onSelect={() => {
            setSelected('new')
          }}
        />
      </Stack>

      {selected.id === 'new' && (
        <Box mt='5'>
          {ENABLE_STRIPE_ADDRESS_ELEMENT ? (
            <ShippingAddressFormStripe
              initialValues={selected ?? undefined}
              deliveryOptionsRef={deliveryOptionsRef}
              onChange={debounce(({ data, isValid }) => {
                send({
                  type: 'set.shippingAddress',
                  data: {
                    payload: {
                      ...data,
                      id: 'new',
                    },
                    isValid: isValid,
                  },
                })
              }, 350)}
            />
          ) : (
            <ShippingAddressForm
              initialValues={selected ?? undefined}
              deliveryOptionsRef={deliveryOptionsRef}
              onChange={debounce(({ data, isValid }) => {
                send({
                  type: 'set.shippingAddress',
                  data: {
                    payload: {
                      id: 'new',
                      ...data,
                    },
                    isValid: isValid,
                  },
                })
              }, 350)}
            />
          )}
          <Box mt='sm'>
            <CheckboxField
              content={intl.formatMessage({
                id: 'checkout.shippingForm.saveAddress',
              })}
              checkboxProps={{
                isChecked: saveNewAddress,
                onChange: () => {
                  send({
                    type: 'save.new.address',
                    data: !saveNewAddress,
                  })
                },
                name: 'save-address',
              }}
            />
          </Box>
        </Box>
      )}
      <Divider mt='md' />
    </RadioGroup>
  )
}
