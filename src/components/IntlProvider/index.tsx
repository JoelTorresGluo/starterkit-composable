import * as React from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { useComposable } from '../ComposableProvider'

interface Props {
  children: React.ReactElement | React.ReactElement[]
}

export const IntlProvider = ({ children }: Props) => {
  const { locale, intl } = useComposable()
  const messages = intl.find((el) => el.code === locale)

  return (
    <ReactIntlProvider locale={locale} messages={messages?.keys ?? {}}>
      {children}
    </ReactIntlProvider>
  )
}
