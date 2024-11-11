import { RadioGroup, Skeleton, Stack } from '@chakra-ui/react'
import { getCurrency } from '@oriuminc/base'
import { ComposableShippingMethod } from '@oriuminc/commerce-generic'
import { ShippingOption } from '@oriuminc/templates/checkout'
import { FormatNumberOptions, useIntl } from 'react-intl'

interface ShippingOptionsProps {
  selected?: string
  list?: ComposableShippingMethod[]
  setSelected: (id: string) => void
  isLoading?: boolean
}

export const ShippingOptions = ({
  selected,
  list,
  setSelected,
  isLoading,
}: ShippingOptionsProps) => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  if (isLoading && !list?.length) {
    return <Skeleton h='12xl' />
  }

  return (
    <RadioGroup name='shipping-option' value={selected}>
      <Stack spacing='2'>
        {list?.map((shippingOption: any, index: number) => {
          if (!shippingOption.price) return null
          const formattedRate =
            shippingOption.price.amount === 0
              ? intl.formatMessage({ id: 'cart.summary.shipping.free' })
              : intl.formatNumber(
                  shippingOption.price.amount / 100,
                  formatNumberOptions
                )
          return (
            <Skeleton key={index} isLoaded={!isLoading}>
              <ShippingOption
                id={shippingOption.id}
                rate={formattedRate}
                name={shippingOption.name}
                description={shippingOption.description}
                onSelect={() => setSelected(shippingOption.id)}
                selected={selected === shippingOption.id}
              />
            </Skeleton>
          )
        })}
      </Stack>
    </RadioGroup>
  )
}
