'use client'

import * as React from 'react'
import { UseDisclosureReturn, useDisclosure } from '@chakra-ui/react'
import { FALLBACK_LOCALE, Locale } from '@oriuminc/base'
import { useIntl } from 'react-intl'

export interface QueryParams {
  [key: string]: string | number | boolean
}

export interface ComposableContextInterface {
  locale: Locale
  cartDrawer: UseDisclosureReturn
  megaDrawer: UseDisclosureReturn
  accountDrawer: UseDisclosureReturn
  path: {
    getAccountDashboard: (params?: { page?: string }) => string
    getManagementDashboard: (params?: { page?: string }) => string
    getAccountForgot: () => string
    getAccountLogin: (queryParams?: QueryParams) => string
    getAccountRegister: () => string
    getAccountReset: () => string
    getCart: () => string
    getCheckout: () => string
    getCheckoutSuccess: (params: { order?: string }) => string
    getConstructorIo: () => string
    getHome: () => string
    getPDP: (params: {
      slug: string
      search?: { queryID: string; filters?: string[] }
    }) => string
    getPLP: (params: { slug: string }) => string
    getSearch: (params: { query: string }) => string
    getConstructorIoSearch: (params: { query: string }) => string
    getBloomreach: () => string
    getBloomreachSearch: (params: { query: string }) => string
  }
}

const ComposableContext = React.createContext<
  ComposableContextInterface | undefined
>(undefined)

export type ComposableProviderProps = Partial<ComposableContextInterface> & {
  children: React.ReactElement
}

export const queryParamsToString = (params?: QueryParams) => {
  if (!params) return ''

  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')
}

export const ComposableProvider = ({ children }: ComposableProviderProps) => {
  const intl = useIntl()
  const currentLocale = (intl.locale || FALLBACK_LOCALE) as Locale
  const cartDrawer = useDisclosure()
  const megaDrawer = useDisclosure()
  const accountDrawer = useDisclosure()

  const path = React.useRef<ComposableContextInterface['path']>({
    getAccountDashboard: (params?) =>
      `/account/dashboard/${params?.page ? params.page : ''}`,
    getManagementDashboard: (params?) =>
      `/dashboard/${params?.page ? params.page : ''}`,
    getAccountForgot: () => '/account/forgot',
    getAccountReset: () => '/account/reset',
    getAccountLogin: (params?) =>
      `/account/login${params ? '?' + queryParamsToString(params) : ''}`,
    getAccountRegister: () => '/account/register',
    getCart: () => '/cart',
    getCheckout: () => '/checkout',
    getCheckoutSuccess: (params) => `/checkout/success?order=${params.order}`,
    getConstructorIo: () => '/constructorio',
    getHome: () => '/',
    getPDP: (params) =>
      `/product/${params.slug}${
        params.search
          ? `?queryID=${params.search.queryID}${
              params.search.filters
                ? `&filters=${params.search.filters ?? []}`
                : ''
            }`
          : ''
      }`,
    getPLP: (params) => `/category/${params.slug}`,
    getSearch: (params) => `/search?query=${params.query}`,
    getConstructorIoSearch: (params) =>
      `/constructorio/search?query=${params.query}`,
    getBloomreachSearch: (params) => `/bloomreach/search?query=${params.query}`,
    getBloomreach: () => `/bloomreach`,
  })

  return (
    <ComposableContext.Provider
      value={{
        path: path.current,
        locale: currentLocale,
        cartDrawer,
        megaDrawer,
        accountDrawer,
      }}
    >
      {children}
    </ComposableContext.Provider>
  )
}

export const useComposable = () => {
  const context = React.useContext(ComposableContext)
  if (context === undefined) {
    throw new Error('useComposable must be used within a ComposableProvider')
  }
  return context
}
