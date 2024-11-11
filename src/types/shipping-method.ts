import { ComposableMoney } from './money'

export interface ComposableShippingMethod {
  id: string
  key?: string
  title: string
  description: string
  price?: ComposableMoney
}
