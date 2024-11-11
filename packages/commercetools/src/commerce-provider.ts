import {
  GetAppRouterCommerceContext,
  GetCommerceContext,
} from '@oriuminc/commerce-generic'
import { NextAuthOptions } from 'next-auth'
import { authOptions, getCommercetoolsCommerceContext } from './utils'
import { getAppRouterCommercetoolsCommerceContext } from './utils/server/get-app-router-commercetools-context'

export interface CommerceProviderProperties {
  getContext?: GetCommerceContext
  getAppRouterContext: GetAppRouterCommerceContext
  authOptions?: NextAuthOptions
}

export const commercetoolsProvider: CommerceProviderProperties = {
  getContext: getCommercetoolsCommerceContext,
  getAppRouterContext: getAppRouterCommercetoolsCommerceContext,
  authOptions: authOptions,
}
