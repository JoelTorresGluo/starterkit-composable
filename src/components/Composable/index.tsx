import * as React from 'react'
import { AppProps } from 'next/app'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ChakraProvider } from '@chakra-ui/react'
import {
  ComposableSiteConfig,
  GetSiteConfigService,
  IntlConfig,
} from '../../types'
import { ComposableProvider } from '../ComposableProvider'
import { IntlProvider } from '../IntlProvider'

import 'focus-visible/dist/focus-visible' // Disabling border for non-keyboard interactions
import { Locale } from '../../utils'

export type ComposableProps = Partial<Pick<AppProps, 'pageProps'>> & {
  children: React.ReactElement | React.ReactElement[]
  theme: any
  locale?: Locale
  intl: IntlConfig[]
  getSiteConfig?: GetSiteConfigService // TODO: delete
  siteConfig?: ComposableSiteConfig | null
  appKey?: string
}

export const Composable = ({
  theme,
  intl,
  locale,
  children,
  getSiteConfig,
  siteConfig,
  appKey,
}: ComposableProps) => {
  return (
    <ComposableProvider
      intl={intl}
      locale={locale}
      siteConfig={siteConfig}
      getSiteConfig={getSiteConfig}
      appKey={appKey}
    >
      <IntlProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </IntlProvider>
    </ComposableProvider>
  )
}
