import { Spacer, Stack, Text } from '@chakra-ui/react'
import { EditableContentCard } from './editable-content-card'
import { useIntl } from 'react-intl'

export const PaymentMethodDisplayOnly = () => {
  const intl = useIntl()

  const paymentMethodsMockData = [
    {
      title: 'VISA',
      name: 'Amanda Bach',
      number: '******************8888',
      expiryDate: '05-2022',
      address: {
        name: 'Amanda Bach',
        addressLine1: '1901 Thornridge Cir.',
        addressLine2: 'Shiloh, Hawaii 81063',
        phone: '(888) 888-8888 ',
      },
    },
    {
      title: 'Mastercard',
      name: 'Amanda Bach',
      number: '******************7777',
      expiryDate: '05-2024',
      address: {
        name: 'Amanda Bach',
        addressLine1: '4140 Parker Rd.',
        addressLine2: 'Allentown, New Mexico 31134',
        phone: '(888) 888-8888 ',
      },
    },
    {
      title: 'VISA 2',
      name: 'Amanda Bach',
      number: '******************9999',
      expiryDate: '07-2025',
      address: {
        name: 'Amanda Bach',
        addressLine1: '1901 Thornridge Cir.',
        addressLine2: 'Shiloh, Hawaii 81063',
        phone: '(888) 888-8888 ',
      },
    },
  ]

  return (
    <Stack spacing={2}>
      {paymentMethodsMockData.map((item, idx) => (
        <EditableContentCard
          key={item.title}
          size='Large'
          title={item.title}
          deleteFn={() => {}}
          showRadio
          radioText={intl.formatMessage({
            id: 'account.dashboard.paymentMethod.useAsDefaultPaymentCard',
          })}
          readOnly={
            <Stack textStyle={'blockquote-75'} spacing={0}>
              <Text>
                {intl.formatMessage({
                  id: 'account.dashboard.paymentMethod.name',
                })}
                : {item.name}
              </Text>
              <Text>
                {intl.formatMessage({
                  id: 'account.dashboard.paymentMethod.number',
                })}
                : {item.number}
              </Text>
              <Text>
                {intl.formatMessage({
                  id: 'account.dashboard.paymentMethod.expiryDate',
                })}
                : {item.expiryDate}
              </Text>
              <Spacer minH={5} />
              <Text>{item.address.name}</Text>
              <Text>{item.address.addressLine1}</Text>
              <Text>{item.address.addressLine2}</Text>
              <Text>{item.address.phone}</Text>
            </Stack>
          }
        />
      ))}
    </Stack>
  )
}
