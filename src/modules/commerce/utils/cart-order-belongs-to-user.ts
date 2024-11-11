import { ComposableCart, ComposableOrder } from '@oriuminc/commerce-generic'

export function belongsToUser({
  cart,
  order,
  anonymousId,
  customerId,
}: {
  cart?: ComposableCart
  order?: ComposableOrder
  customerId?: string
  anonymousId?: string
}) {
  const obj = order ?? cart
  if (!obj) throw new Error('belongsToUser needs cart or order')
  if (customerId) return obj.customerId === customerId

  return obj.anonymousId === anonymousId
}
