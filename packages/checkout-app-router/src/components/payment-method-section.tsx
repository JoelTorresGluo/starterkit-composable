import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Text,
  UseAccordionProps,
  useToken,
} from '@chakra-ui/react'
import { Section } from '@oriuminc/ui'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { IconType } from 'react-icons'
import { FiPlus } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { useIntl } from 'react-intl'

import { BillingAddressForm } from './billing-address-form'
import { ENABLE_STRIPE_ADDRESS_ELEMENT } from '../constants'
import { BillingAddressFormStripe } from './billing-address-form-stripe'
import { ComposableAddress } from '@oriuminc/commerce-generic'

interface PaymentMethodSectionProps {
  paymentMethods: {
    key: string
    Component: ReactNode
    titleTranslationKey: string
    icon: IconType
    disabled?: boolean
  }[]
  onPaymentMethodSelect: (paymentMethodKey: string) => void
  onPaymentMethodClearSelection: () => void
  initialSelectedPaymentMethodKey?: string
  initialBillingAddress?: ComposableAddress
  onBillingAddressUpdate: (params: {
    payload: ComposableAddress
    isValid: boolean
  }) => void
  billingIsShipping: boolean
  onBillingIsShippingUpdate: (value: boolean) => void
  shippingAddress: ComposableAddress
  showAddGiftCardButton?: boolean
}

export const PaymentMethodSection = (props: PaymentMethodSectionProps) => {
  const {
    onPaymentMethodSelect,
    onPaymentMethodClearSelection,
    initialSelectedPaymentMethodKey,
    initialBillingAddress,
    onBillingAddressUpdate,
    billingIsShipping,
    onBillingIsShippingUpdate,
    shippingAddress,
    paymentMethods,
    showAddGiftCardButton = true,
  } = props
  const intl = useIntl()
  const defaultPanelIndex = paymentMethods.findIndex(
    (pmtMethod) => pmtMethod.key === initialSelectedPaymentMethodKey
  )
  const [expandedIndex, setExpandedIndex] =
    useState<UseAccordionProps['index']>(defaultPanelIndex)

  const handleSelectPaymentMethod = (isSelected: boolean, key: string) => {
    isSelected ? onPaymentMethodSelect(key) : onPaymentMethodClearSelection()
  }

  const [sizePx] = useToken('sizes', ['sizes.px'])

  return (
    <Box>
      <Accordion
        allowToggle
        index={expandedIndex}
        onChange={setExpandedIndex}
        // This is so the stripe autocomplete component doesnt get clipped.
        sx={{
          '.chakra-collapse:has(iframe)': { overflow: 'visible !important' },
        }}
      >
        {paymentMethods.map((pmtMethod, index) => (
          <AccordionItem
            key={index}
            borderTop='none'
            borderBottomWidth={
              index < paymentMethods.length - 1 ? sizePx : '0 !important'
            }
            isDisabled={pmtMethod.disabled}
          >
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionButton
                    fontSize='base'
                    onClick={() =>
                      handleSelectPaymentMethod(!isExpanded, pmtMethod.key)
                    }
                    px='none'
                    py='sm'
                    gap='2'
                    _hover={{ bg: 'none' }}
                  >
                    {pmtMethod.icon && (
                      <Icon aria-hidden='true' as={pmtMethod.icon} />
                    )}
                    <Box flex='1' textAlign='left'>
                      {intl.formatMessage({
                        id: pmtMethod.titleTranslationKey,
                      })}
                    </Box>
                    {isExpanded ? (
                      <Icon aria-hidden='true' as={IoClose} />
                    ) : (
                      <Icon aria-hidden='true' as={FiPlus} />
                    )}
                  </AccordionButton>
                  <AccordionPanel px='none' pb='none' transitionDuration='0'>
                    <Box bg='shading.100' p='sm'>
                      {/* 
                        only render if expanded, to avoid running specific 
                        pm functions before they are selected.
                      */}
                      {isExpanded && (
                        <>
                          {pmtMethod.Component}
                          <BillingAddressSubsection
                            initialBillingAddress={initialBillingAddress}
                            onBillingAddressUpdate={onBillingAddressUpdate}
                            billingIsShipping={billingIsShipping}
                            onBillingIsShippingUpdate={
                              onBillingIsShippingUpdate
                            }
                            shippingAddress={shippingAddress}
                          />
                        </>
                      )}
                    </Box>
                  </AccordionPanel>
                </>
              )
            }}
          </AccordionItem>
        ))}
      </Accordion>
      {showAddGiftCardButton && (
        <Flex mt='5' gap='2' alignItems='center' cursor='pointer'>
          <Icon aria-hidden='true' as={FiPlus} />
          <Text as='span'>
            {intl.formatMessage({ id: 'checkout.paymentSection.addGiftCard' })}
          </Text>
        </Flex>
      )}
    </Box>
  )
}

const BillingAddressSubsection = (
  props: Pick<
    PaymentMethodSectionProps,
    | 'initialBillingAddress'
    | 'onBillingAddressUpdate'
    | 'billingIsShipping'
    | 'onBillingIsShippingUpdate'
    | 'shippingAddress'
  >
) => {
  const {
    initialBillingAddress,
    onBillingAddressUpdate,
    billingIsShipping,
    onBillingIsShippingUpdate,
    shippingAddress,
  } = props
  const intl = useIntl()
  return (
    <Section
      headerProps={{
        title: intl.formatMessage({
          id: 'checkout.billingSection.title',
        }),
        hasRequiredFields: !billingIsShipping,
        textProps: { fontSize: { base: 'lg', md: '3xl' } },
        boxProps: { mb: { base: 4, md: 5 } },
      }}
    >
      {ENABLE_STRIPE_ADDRESS_ELEMENT ? (
        <BillingAddressFormStripe
          initialValues={initialBillingAddress}
          onChange={({ data, isValid }) =>
            onBillingAddressUpdate({ payload: data, isValid })
          }
          billingIsShipping={billingIsShipping}
          onChangeBillingIsShipping={onBillingIsShippingUpdate}
          shippingAddress={shippingAddress ?? {}}
        />
      ) : (
        <BillingAddressForm
          initialValues={initialBillingAddress}
          onChange={({ data, isValid }) =>
            onBillingAddressUpdate({ payload: data, isValid })
          }
          billingIsShipping={billingIsShipping}
          onChangeBillingIsShipping={onBillingIsShippingUpdate}
          shippingAddress={shippingAddress ?? {}}
        />
      )}
    </Section>
  )
}
