export interface ComposableMoney {
  /**
   * amount in cents
   */
  amount: number
  currencyCode: string
}

export interface ComposablePrice {
  /** The current price of the product. This is what the customer would currently pay. Normally its the original price with discounts applied.  */
  current: ComposableMoney
  /** The original price of the product.  */
  original: ComposableMoney
}
