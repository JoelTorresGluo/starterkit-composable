import {
  ChangePassword,
  CommerceClient,
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
  GetOrderById,
  GetProductBySlug,
  GetProducts,
  GetShippingMethods,
  ReplicateCart,
  ResetPassword,
  UpdateCart,
  UpdateCustomer,
  UpdateOrder,
} from '@oriuminc/commerce-generic'
import axios from 'axios'
import {
  commercetoolsCartToComposableCart,
  commercetoolsCategoryToComposableCategory,
  commercetoolsCustomerToComposableCustomer,
  commercetoolsCustomerTokenToComposableForgotPasswordToken,
  commercetoolsOrderToComposableOrder,
  commercetoolsProductProjectionToComposableProduct,
  commercetoolsShippingMethodToComposableShippingMethod,
} from './mappers'
import {
  createCart,
  createCustomer,
  createOrderFromCart,
  forgotCustomerPassword,
  getCartById,
  getCategories,
  getCategoryBySlug,
  getChannelByKey,
  getCustomerById,
  getCustomerOrders,
  getLastCartForUser,
  getOrderById,
  getProductBySlug,
  getProducts,
  getShippingMethods,
  refreshAccessTokenService,
  replicateCart,
  resetCustomerPassword,
  updateCart,
  updateCustomer,
  updateCustomerPassword,
  updateOrder,
} from './services'
import { SdkClient } from './types'
import { createSdkClient } from './utils'
import {
  COMMERCETOOLS_HOST,
  COMMERCETOOLS_PROJECT_KEY,
  COMMERCETOOLS_USER_SCOPED_CLIENT_ID,
  COMMERCETOOLS_USER_SCOPED_CLIENT_SECRET,
} from './constants'

export class CommercetoolsCommerceClient implements CommerceClient {
  private static instance: CommercetoolsCommerceClient
  private client: SdkClient

  private constructor() {
    this.client = createSdkClient()
  }

  public static getInstance(): CommercetoolsCommerceClient {
    if (!CommercetoolsCommerceClient.instance) {
      CommercetoolsCommerceClient.instance = new CommercetoolsCommerceClient()
    }
    return CommercetoolsCommerceClient.instance
  }

  getProducts: GetProducts = async ({
    query,
    limit,
    offset,
    locale,
    currency,
  }) => {
    const commercetoolsProductsResponse = await getProducts({
      client: this.client,
      query,
      limit,
      offset,
      locale,
      currency,
    })
    return {
      results: commercetoolsProductsResponse.results.map(
        (commercetoolsProduct) =>
          commercetoolsProductProjectionToComposableProduct({
            productProjection: commercetoolsProduct,
            locale,
            currency,
          })
      ),
      paging: {
        total: commercetoolsProductsResponse.total,
        limit: commercetoolsProductsResponse.limit,
        offset: commercetoolsProductsResponse.offset,
      },
    }
  }

  getProductBySlug: GetProductBySlug = async ({
    slug,
    customerGroup,
    stockChannel,
    locale,
    currency,
  }) => {
    const commercetoolsProduct = await getProductBySlug({
      client: this.client,
      customerGroupId: customerGroup,
      slug,
      locale,
      currency,
    })
    const stockChannelId = stockChannel
      ? (
          await getChannelByKey({
            client: this.client,
            channelKey: stockChannel,
          })
        )?.id
      : undefined
    return commercetoolsProduct
      ? commercetoolsProductProjectionToComposableProduct({
          productProjection: commercetoolsProduct,
          stockChannelId,
          locale,
          currency,
        })
      : null
  }

  getCustomer: GetCustomer = async ({ customerId }) => {
    const commercetoolsCustomer = await getCustomerById({
      client: this.client,
      customerId,
    })
    return commercetoolsCustomer
      ? commercetoolsCustomerToComposableCustomer(commercetoolsCustomer)
      : null
  }

  createCustomer: CreateCustomer = async (params) => {
    const commercetoolsCustomer = (
      await createCustomer({ client: this.client, ...params })
    ).customer
    return commercetoolsCustomerToComposableCustomer(commercetoolsCustomer)
  }

  updateCustomer: UpdateCustomer = async ({ customerId, actions }) => {
    const commercetoolsCustomer = await updateCustomer({
      client: this.client,
      customerId,
      actions,
    })
    return commercetoolsCustomerToComposableCustomer(commercetoolsCustomer)
  }

  changePassword: ChangePassword = async ({
    customerId,
    currentPassword,
    newPassword,
  }) => {
    const commercetoolsCustomer = await updateCustomerPassword({
      client: this.client,
      customerId,
      currentPassword,
      newPassword,
    })
    return commercetoolsCustomerToComposableCustomer(commercetoolsCustomer)
  }

  forgotPassword: ForgotPassword = async ({ email }) => {
    const commercetoolsToken = await forgotCustomerPassword({
      client: this.client,
      email,
    })
    return commercetoolsCustomerTokenToComposableForgotPasswordToken(
      commercetoolsToken
    )
  }

  resetPassword: ResetPassword = async ({ newPassword, token }) => {
    const commercetoolsCustomer = await resetCustomerPassword({
      client: this.client,
      newPassword,
      token,
    })
    return commercetoolsCustomerToComposableCustomer(commercetoolsCustomer)
  }

  createCart: CreateCart = async (params) => {
    const commercetoolsCart = await createCart({
      client: this.client,
      ...params,
    })
    return commercetoolsCartToComposableCart({
      cart: commercetoolsCart,
      locale: params.locale,
      currency: params.currency,
    })
  }

  getLastCart: GetLastCart = async (params) => {
    const commercetoolsCart = await getLastCartForUser({
      client: this.client,
      ...params,
    })
    return commercetoolsCart
      ? commercetoolsCartToComposableCart({
          cart: commercetoolsCart,
          locale: params.locale,
          currency: params.currency,
        })
      : null
  }

  getCartById: GetCartById = async (params) => {
    const commercetoolsCart = await getCartById({
      client: this.client,
      id: params.cartId,
    })
    return commercetoolsCart
      ? commercetoolsCartToComposableCart({
          cart: commercetoolsCart,
          locale: params.locale,
          currency: params.currency,
        })
      : null
  }

  updateCart: UpdateCart = async (params) => {
    const commercetoolsCart = await updateCart({
      client: this.client,
      id: params.id,
      actions: params.actions,
    })
    return commercetoolsCartToComposableCart({
      cart: commercetoolsCart,
      locale: params.locale,
      currency: params.currency,
    })
  }

  replicateCart: ReplicateCart = async ({ cartId, currency, locale }) => {
    const commercetoolsCart = await replicateCart({
      client: this.client,
      cartId,
    })
    return commercetoolsCartToComposableCart({
      cart: commercetoolsCart,
      locale,
      currency,
    })
  }

  getShippingMethods: GetShippingMethods = async ({
    limit,
    offset,
    locale,
    currency,
  }) => {
    const commercetoolsShippingMethods = await getShippingMethods({
      client: this.client,
      limit,
      offset,
    })
    return {
      results: commercetoolsShippingMethods.results.map((shippingMethod) =>
        commercetoolsShippingMethodToComposableShippingMethod({
          shippingMethod,
          locale,
          currency,
        })
      ),
      paging: {
        total: commercetoolsShippingMethods.total,
        limit: commercetoolsShippingMethods.limit,
        offset: commercetoolsShippingMethods.offset,
      },
    }
  }

  createOrderFromCart: CreateOrderFromCart = async ({
    cartId,
    locale,
    currency,
    payments,
  }) => {
    const commercetoolsOrder = await createOrderFromCart({
      client: this.client,
      cartId,
      locale,
      payments,
    })
    return commercetoolsOrderToComposableOrder({
      order: commercetoolsOrder,
      locale,
      currency,
    })
  }

  getOrderById: GetOrderById = async ({ orderId, locale, currency }) => {
    const commercetoolsOrder = await getOrderById({
      client: this.client,
      orderId,
    })
    return commercetoolsOrder
      ? commercetoolsOrderToComposableOrder({
          order: commercetoolsOrder,
          locale,
          currency,
        })
      : null
  }

  getCustomerOrders: GetCustomerOrders = async ({
    customerId,
    locale,
    currency,
    sort,
    limit,
    offset,
  }) => {
    const commercetoolsOrdersResponse = await getCustomerOrders({
      client: this.client,
      customerId,
      sort,
      limit,
      offset,
    })
    return {
      results: commercetoolsOrdersResponse.results.map((commercetoolsOrder) =>
        commercetoolsOrderToComposableOrder({
          order: commercetoolsOrder,
          locale,
          currency,
        })
      ),
      paging: {
        total: commercetoolsOrdersResponse.total,
        limit: commercetoolsOrdersResponse.limit,
        offset: commercetoolsOrdersResponse.offset,
      },
    }
  }

  updateOrder: UpdateOrder = async ({ orderId, actions, locale, currency }) => {
    const commercetoolsOrder = await updateOrder({
      client: this.client,
      orderId,
      actions,
    })
    return commercetoolsOrderToComposableOrder({
      order: commercetoolsOrder,
      locale,
      currency,
    })
  }

  getCategories: GetCategories = async ({ limit, offset, locale }) => {
    const commercetoolsCategoriesResponse = await getCategories({
      client: this.client,
      limit,
      offset,
    })
    return {
      results: commercetoolsCategoriesResponse.results.map(
        (commercetoolsCategory) =>
          commercetoolsCategoryToComposableCategory({
            category: commercetoolsCategory,
            locale,
          })
      ),
      paging: {
        total: commercetoolsCategoriesResponse.total,
        limit: commercetoolsCategoriesResponse.limit,
        offset: commercetoolsCategoriesResponse.offset,
      },
    }
  }

  getCategoryBySlug: GetCategoryBySlug = async ({ slug, locale }) => {
    const commercetoolsCategory = await getCategoryBySlug({
      client: this.client,
      slug,
      locale,
    })
    return commercetoolsCategory
      ? commercetoolsCategoryToComposableCategory({
          category: commercetoolsCategory,
          locale,
        })
      : null
  }

  /**
   * This is only used to forward the session to Bold checkout - remove if possible
   */
  getAccessToken?: GetAccessToken = async ({ anonymousUser, customer }) => {
    const currentAccessToken =
      customer?.session?.refreshToken || anonymousUser?.session?.refreshToken
    if (!currentAccessToken) throw new Error('no user session found')
    // refresh the token to ensure the session is valid
    const token = await refreshAccessTokenService({
      httpClient: axios.create(),
      params: {
        projectKey: COMMERCETOOLS_PROJECT_KEY,
        clientId: COMMERCETOOLS_USER_SCOPED_CLIENT_ID,
        clientSecret: COMMERCETOOLS_USER_SCOPED_CLIENT_SECRET,
        host: COMMERCETOOLS_HOST,
        refreshToken: currentAccessToken,
      },
    })
    return { token: token.access_token }
  }
}
