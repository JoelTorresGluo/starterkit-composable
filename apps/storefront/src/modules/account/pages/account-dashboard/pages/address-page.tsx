'use client'

import { useDisclosure } from '@chakra-ui/react'
import { DashboardContentLayout } from '@modules/account'
import { useUser } from '@modules/commerce'
import { ENABLE_STRIPE_ADDRESS_ELEMENT } from '@modules/stripe'
import { EmptyPage } from '@oriuminc/templates/general'
import { CartLoadingState } from '@oriuminc/ui'
import { useEffect, useRef } from 'react'
import { useIntl } from 'react-intl'
import { AddressForm } from '../components'
import { AddressFormStripe } from '../components/address-form-stripe'

export const AddressPage = () => {
  const { isOpen, onToggle } = useDisclosure()
  const { customer, isLoading } = useUser()
  const actionButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const intl = useIntl()
  useEffect(() => {
    if (!isOpen) {
      actionButtonRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (customer?.addresses?.length) {
      containerRef.current?.focus()
    }
  }, [customer?.addresses?.length])

  if (isLoading) {
    // TODO: add loading screen to EditableContentCard
    return <CartLoadingState />
  }

  const title = intl.formatMessage({ id: 'account.dashboard.addresses.title' })

  return (
    <>
      <DashboardContentLayout
        containerProps={{
          ref: containerRef,
          tabIndex: -1,
        }}
        title={title}
        actionButtonText={intl.formatMessage({
          id: 'account.dashboard.addresses.addAddress',
        })}
        actionButtonProps={{
          ref: actionButtonRef,
          'aria-expanded': isOpen,
          onClick: onToggle,
        }}
      >
        {isOpen &&
          (ENABLE_STRIPE_ADDRESS_ELEMENT ? (
            <AddressFormStripe
              typeForm='add'
              updateButtonLabel={intl.formatMessage({
                id: 'account.dashboard.addresses.addAddress',
              })}
              isEditOpen={true}
              onCancel={onToggle}
            />
          ) : (
            <AddressForm
              typeForm='add'
              updateButtonLabel={intl.formatMessage({
                id: 'account.dashboard.addresses.addAddress',
              })}
              isEditOpen={true}
              onCancel={onToggle}
            />
          ))}
        {customer?.addresses && customer.addresses.length < 1 && !isOpen && (
          <EmptyPage
            title={intl.formatMessage({
              id: 'account.dashboard.addresses.emptyPage.title',
            })}
            description={intl.formatMessage({
              id: 'account.dashboard.addresses.emptyPage.description',
            })}
            buttonLabel={intl.formatMessage({
              id: 'account.dashboard.addresses.addAddress',
            })}
            buttonHref='#'
            buttonOnClick={onToggle}
          />
        )}
        {customer?.addresses?.map((address) =>
          ENABLE_STRIPE_ADDRESS_ELEMENT ? (
            <AddressFormStripe
              key={address.id}
              customer={customer}
              customerAddress={address}
            />
          ) : (
            <AddressForm
              key={address.id}
              customer={customer}
              customerAddress={address}
            />
          )
        )}
      </DashboardContentLayout>
    </>
  )
}
