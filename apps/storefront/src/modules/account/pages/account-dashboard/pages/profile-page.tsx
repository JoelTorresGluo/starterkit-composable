'use client'

import { Stack } from '@chakra-ui/react'
import {
  DashboardContentLayout,
  PasswordForm,
  ProfileForm,
} from '@modules/account'
import { SubscriptionsForm } from '@modules/general'
import { useIntl } from 'react-intl'

export const ProfilePage = () => {
  const intl = useIntl()

  return (
    <DashboardContentLayout
      title={intl.formatMessage({
        id: 'account.dashboard.menu.profileAndPreferences',
      })}
    >
      <Stack spacing='2'>
        <ProfileForm />
        <PasswordForm />
        <SubscriptionsForm />
      </Stack>
    </DashboardContentLayout>
  )
}
