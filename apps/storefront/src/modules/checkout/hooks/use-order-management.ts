import { ComposableCheckoutOrderManagement } from '@oriuminc/checkout-app-router'
import { useOrderId } from './use-order-id'

/**
 * A small utility hook is used to track the orderId in the checkout experience.
 * On the Order Summary page, the orderId is used to retrieve the order details from the commerce engine.
 * @returns setOrderId: a function to set the orderId after a successful payment.
 */
export const useOrderManagement = (): ComposableCheckoutOrderManagement => {
  const { setOrderId } = useOrderId()

  return {
    setOrderId,
  }
}
