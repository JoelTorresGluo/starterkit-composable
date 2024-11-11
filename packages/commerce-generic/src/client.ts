import {
  ChangePassword,
  CreateCart,
  CreateCustomer,
  CreateOrderFromCart,
  ForgotPassword,
  GetAccessToken,
  GetCartById,
  GetCategories,
  GetCategoryBySlug,
  GetCustomer,
  GetCustomerOrders,
  GetLastCart,
  GetOcapiSessinBridgeClient,
  GetOrderById,
  GetProductBySlug,
  GetProducts,
  GetShippingMethods,
  ReplicateCart,
  ResetPassword,
  UpdateCart,
  UpdateCustomer,
  UpdateOrder,
} from './procedures'

export interface CommerceClient {
  getProducts: GetProducts
  getProductBySlug: GetProductBySlug
  getCustomer: GetCustomer
  createCustomer: CreateCustomer
  updateCustomer: UpdateCustomer
  changePassword: ChangePassword
  forgotPassword: ForgotPassword
  resetPassword: ResetPassword
  createCart: CreateCart
  getLastCart: GetLastCart
  getCartById: GetCartById
  updateCart: UpdateCart
  replicateCart: ReplicateCart
  getShippingMethods: GetShippingMethods
  createOrderFromCart: CreateOrderFromCart
  getOrderById: GetOrderById
  getCustomerOrders: GetCustomerOrders
  updateOrder: UpdateOrder
  getCategories: GetCategories
  getCategoryBySlug: GetCategoryBySlug

  /**
   * This is only used to forward the session to Bold checkout - remove if possible
   */
  getAccessToken?: GetAccessToken
  getOcapiSessionBridgeClient?: GetOcapiSessinBridgeClient
}
