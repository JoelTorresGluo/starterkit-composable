import { z } from 'zod'
import { IntlConfig } from '../../types'

interface GetActiveLocaleCurrency {
  activeLocale: string
  intlConfig: IntlConfig[]
}

export const getActiveLocaleCurrency = ({
  activeLocale,
  intlConfig,
}: GetActiveLocaleCurrency) => {
  return intlConfig.find((element) => element.code === activeLocale)?.currency
}

export const LocaleSchema = z.enum(['en-US', 'en-CA', 'fr-CA', 'es-MX'])
export type Locale = z.infer<typeof LocaleSchema>

export const CurrencySchema = z.enum(['USD', 'CAD', 'MXN'])
export type Currency = z.infer<typeof CurrencySchema>

export type LocaleAndCurrency = { locale: Locale; currency: Currency }

export const FALLBACK_LOCALE = 'en-US'
export const FALLBACK_CURRENCY = 'USD'

export const INTL_CONFIG: Omit<IntlConfig, 'keys'>[] = [
  {
    code: 'en-US',
    title: 'English (en-US)',
    translationKey: 'locale.title.en-US',
    currency: 'USD',
  },
  {
    code: 'en-CA',
    title: 'English (en-CA)',
    translationKey: 'locale.title.en-CA',
    currency: 'CAD',
  },
  {
    code: 'fr-CA',
    title: 'French (fr-CA)',
    translationKey: 'locale.title.fr-CA',
    currency: 'CAD',
  },
  {
    code: 'es-MX',
    title: 'Spanish (es-MX)',
    translationKey: 'locale.title.es-MX',
    currency: 'MXN',
  },
]

export const getCurrency = (locale: string) =>
  (INTL_CONFIG.find((intl) => intl.code === locale)?.currency ??
    FALLBACK_CURRENCY) as Currency
