'use client'

import { UseDisclosureReturn, useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/compat/router'
import * as React from 'react'
import {
  ComposableSiteConfig,
  GetSiteConfigService,
  IntlConfig,
} from '../../types'
import {
  Currency,
  FALLBACK_CURRENCY,
  FALLBACK_LOCALE,
  Locale,
  getActiveLocaleCurrency,
} from '../../utils'

export interface QueryParams {
  [key: string]: string | number | boolean
}

export interface ComposableContextInterface {
  locale: Locale
  currency: Currency
  intl: IntlConfig[]
  setLocale: (locale: string) => void
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
    getPDP: (params: { slug: string }) => string
    getPLP: (params: { slug: string }) => string
    getSearch: (params: { query: string }) => string
    getConstructorIoSearch: (params: { query: string }) => string
    getBloomreach: () => string
    getBloomreachSearch: (params: { query: string }) => string
  }
  siteConfig?: ComposableSiteConfig | null
  appKey: string
}

const ComposableContext = React.createContext<
  ComposableContextInterface | undefined
>(undefined)

export type ComposableProviderProps = Partial<ComposableContextInterface> & {
  intl: ComposableContextInterface['intl']
  getSiteConfig?: GetSiteConfigService
  children: React.ReactElement
}

export const queryParamsToString = (params?: QueryParams) => {
  if (!params) return ''

  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')
}

export const getSiteConfigKey = (locale: string) => ['siteConfig', locale]

export const IS_FRESH = process.env.NEXT_PUBLIC_IS_FRESH || ''

export const ComposableProvider = ({
  children,
  intl,
  getSiteConfig,
  siteConfig,
  appKey,
}: ComposableProviderProps) => {
  const router = useRouter()
  const currentLocale = (router?.locale ||
    router?.defaultLocale ||
    FALLBACK_LOCALE) as Locale
  const cartDrawer = useDisclosure()
  const megaDrawer = useDisclosure()
  const accountDrawer = useDisclosure()
  const siteConfigKey = getSiteConfigKey(currentLocale)

  const { data: _siteConfig } = useQuery(
    siteConfigKey,
    () =>
      getSiteConfig?.({
        locale: currentLocale,
        key: appKey,
        isFresh: IS_FRESH,
      }),
    {
      enabled: !Boolean(siteConfig) && Boolean(getSiteConfig),
    }
  )

  const currency = (getActiveLocaleCurrency({
    activeLocale: currentLocale,
    intlConfig: intl,
  }) || FALLBACK_CURRENCY) as Currency

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
    getPDP: (params) => `/product/${params.slug}`,
    getPLP: (params) => `/category/${params.slug}`,
    getSearch: (params) => `/search?query=${params.query}`,
    getConstructorIoSearch: (params) =>
      `/constructorio/search?query=${params.query}`,
    getBloomreachSearch: (params) => `/bloomreach/search?query=${params.query}`,
    getBloomreach: () => `/bloomreach`,
  })

  const setLocaleHandler = React.useCallback(
    (locale: string) => {
      router?.push(
        { pathname: router?.pathname, query: router?.query },
        router?.asPath,
        { locale }
      )
    },
    [router]
  )

  return (
    <ComposableContext.Provider
      value={{
        path: path.current,
        locale: currentLocale,
        cartDrawer,
        megaDrawer,
        accountDrawer,
        intl,
        setLocale: setLocaleHandler,
        currency,
        siteConfig: siteConfig ?? _siteConfig ?? undefined,
        appKey: appKey || '',
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
