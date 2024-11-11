'use client'

import { IntlProvider, MessageFormatElement } from 'react-intl'
import i18nConfig from '../../../i18nConfig'

export function ServerIntlProvider({
  messages,
  locale,
  children,
}: {
  messages: Record<string, MessageFormatElement[]> | Record<string, string>
  locale: string
  children: React.ReactNode
}) {
  return (
    <IntlProvider
      messages={messages}
      locale={locale}
      defaultLocale={i18nConfig.defaultLocale}
    >
      {children}
    </IntlProvider>
  )
}
