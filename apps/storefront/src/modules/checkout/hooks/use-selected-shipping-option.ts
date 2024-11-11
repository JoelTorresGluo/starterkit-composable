import { getCurrency } from '@oriuminc/base'
import { api } from '@modules/trpc/react'
import { Locale } from '@oriuminc/base'
import { checkoutSelectedShippingOptionIdKey } from '@oriuminc/checkout-app-router'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

const selectedShippingOptionIdAtom = atomWithStorage<string | null>(
  checkoutSelectedShippingOptionIdKey,
  null
)

export function useSelectedShippingOption() {
  const { locale } = useIntl()
  const currency = getCurrency(locale)
  const [selectedShippingOptionId, setSelectedShippingOptionId] = useAtom(
    selectedShippingOptionIdAtom
  )
  const { data: shippingMethods } = api.commerce.getShippingMethods.useQuery({
    locale: locale as Locale,
    currency,
  })

  const selectedShippingOption = useMemo(() => {
    if (!selectedShippingOptionId || !shippingMethods?.results) return null
    const shippingOption = shippingMethods.results.find(
      (shippingMethod) => shippingMethod.id === selectedShippingOptionId
    )
    return shippingOption ?? null
  }, [shippingMethods?.results, selectedShippingOptionId, currency])

  return {
    selectedShippingOption,
    selectedShippingOptionId,
    setSelectedShippingOptionId,
  }
}
