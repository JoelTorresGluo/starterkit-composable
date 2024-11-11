import { Divider, Stack } from '@chakra-ui/react'
import { CheckoutDetailItem } from '@oriuminc/templates/checkout'
import { useIntl } from 'react-intl'
import {
  ComposableShippingMethod,
  ComposableAddress,
  getAddressLabels,
} from '@oriuminc/commerce-generic'

interface DeliveryOptionsDetailsProps {
  customerEmail: string
  shippingAddress: ComposableAddress
  shippingOption?: ComposableShippingMethod
  onClickEdit: () => void
}

export const DeliveryOptionsDetails = ({
  customerEmail,
  shippingAddress,
  shippingOption,
  onClickEdit,
}: DeliveryOptionsDetailsProps) => {
  const intl = useIntl()

  const addressLabels = getAddressLabels(shippingAddress)

  return (
    <Stack spacing='4' divider={<Divider />}>
      {customerEmail && (
        <CheckoutDetailItem
          title={intl.formatMessage({
            id: 'checkout.guestSection.title',
          })}
          details={[customerEmail]}
          onClickEdit={onClickEdit}
        />
      )}
      {shippingAddress && addressLabels && (
        <CheckoutDetailItem
          title={intl.formatMessage({
            id: 'checkout.shippingForm.title',
          })}
          details={[
            addressLabels.name,
            addressLabels.address,
            addressLabels.cityRegionPostalCode,
          ]}
          onClickEdit={onClickEdit}
        />
      )}
      {shippingOption && (
        <CheckoutDetailItem
          title={intl.formatMessage({
            id: 'checkout.shippingForm.shippingAndGiftOptions.title',
          })}
          details={[
            shippingOption.description ?? '',
            `(${shippingOption.title})`,
          ]}
          onClickEdit={onClickEdit}
        />
      )}
    </Stack>
  )
}
