'use client'

import { Text, Stack, RadioGroup, Box } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useState } from 'react'

import {
  DetailedRichList,
  EditableContentCard,
  FeatureNotImplementedAlert,
  FormStatus,
} from '@oriuminc/templates/general'

import { useUser } from '@modules/commerce'

export const SubscriptionsForm = () => {
  // Mocked Component
  const intl = useIntl()
  const { customer } = useUser()
  const [status, setStatus] = useState<FormStatus>()

  if (!customer) return <></>

  const subscriptionsOptions = [
    {
      value: 'week',
      label: intl.formatMessage({
        id: 'account.dashboard.subscriptions.option1.label',
      }),
      radioLabel: intl.formatMessage({
        id: 'account.dashboard.subscriptions.option1.radioLabel',
      }),
      description: intl.formatMessage({
        id: 'account.dashboard.subscriptions.option1.description',
      }),
    },
    {
      value: 'month',
      label: intl.formatMessage({
        id: 'account.dashboard.subscriptions.option2.label',
      }),
      radioLabel: intl.formatMessage({
        id: 'account.dashboard.subscriptions.option2.radioLabel',
      }),
      description: intl.formatMessage({
        id: 'account.dashboard.subscriptions.option2.description',
      }),
    },
    {
      value: 'none',
      label: intl.formatMessage({
        id: 'account.dashboard.subscriptions.option3.label',
      }),
      radioLabel: intl.formatMessage({
        id: 'account.dashboard.subscriptions.option3.radioLabel',
      }),
      description: intl.formatMessage({
        id: 'account.dashboard.subscriptions.option3.description',
      }),
    },
  ]

  return (
    <EditableContentCard
      size='Large'
      title={intl.formatMessage({
        id: 'account.dashboard.subscriptions.title',
      })}
      readOnly={<Text>{subscriptionsOptions[0].label}</Text>}
      updateButtonLabel={intl.formatMessage({
        id: 'action.updateSubscription',
      })}
      status={status}
      onSubmit={() => {
        setStatus('success')
        setTimeout(() => {
          setStatus(undefined)
        }, 2000)
      }}
      edit={
        <Stack>
          <fieldset>
            <Text as='legend' mb='8'>
              {intl.formatMessage({
                id: 'account.dashboard.subscriptions.subTitle',
              })}
            </Text>
            <RadioGroup defaultValue={subscriptionsOptions[0].value}>
              <Stack spacing='5' direction='column'>
                {subscriptionsOptions.map((item) => (
                  <DetailedRichList
                    shouldFocus={item.value === subscriptionsOptions[0].value}
                    key={item.value}
                    description={item.description}
                    label={item.label}
                    radioValue={item.value}
                    type='Radio'
                  />
                ))}
              </Stack>
            </RadioGroup>
          </fieldset>
          <Box py='4'>
            <FeatureNotImplementedAlert />
          </Box>
        </Stack>
      }
    />
  )
}
