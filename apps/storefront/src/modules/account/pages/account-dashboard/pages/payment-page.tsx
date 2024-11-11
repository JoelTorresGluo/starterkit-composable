'use client'

import { useDisclosure } from '@chakra-ui/react'
import { DashboardContentLayout } from '@modules/account'
import { useIntl } from 'react-intl'

import { PaymentMethodForm } from '@oriuminc/templates/general'
export const PaymentPage = () => {
  const { isOpen, onToggle } = useDisclosure()
  const intl = useIntl()

  return (
    <DashboardContentLayout
      title={intl.formatMessage({
        id: 'account.dashboard.menu.paymentMethod',
      })}
      actionButtonText={intl.formatMessage({
        id: 'account.dashboard.paymentMethod.addPaymentCard',
      })}
      actionButtonProps={{
        'aria-expanded': isOpen,
        onClick: onToggle,
      }}
    >
      <PaymentMethodForm
        isOpen={isOpen}
        onToggle={onToggle}
        isEditOpen={true}
      />
    </DashboardContentLayout>
  )
}
