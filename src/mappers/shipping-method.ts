import { ShippingMethod as CommercetoolsShippingMethod } from '@commercetools/platform-sdk'
import { ComposableShippingMethod } from '@oriuminc/commerce-generic'
import { commercetoolsTypedMoneyToComposableMoney } from './utils'
import { LocaleAndCurrency } from '@oriuminc/base'

export const commercetoolsShippingMethodToComposableShippingMethod = ({
  shippingMethod,
  locale,
  currency,
}: {
  shippingMethod: CommercetoolsShippingMethod
} & LocaleAndCurrency): ComposableShippingMethod => {
  const shippingPriceForCurrency = shippingMethod.zoneRates.reduce<
    number | undefined
  >((acc, zoneRate) => {
    const priceForCurrency = zoneRate.shippingRates.find(
      (rate) => rate.price.currencyCode === currency
    )?.price
    return priceForCurrency
      ? commercetoolsTypedMoneyToComposableMoney(priceForCurrency).amount
      : acc
  }, undefined)
  return {
    id: shippingMethod.id,
    key: shippingMethod.key,
    title: shippingMethod.localizedName?.[locale] || shippingMethod.name || '',
    description: shippingMethod.localizedDescription?.[locale] ?? '',
    price:
      shippingPriceForCurrency !== undefined
        ? {
            amount: shippingPriceForCurrency,
            currencyCode: currency,
          }
        : undefined,
  }
}
