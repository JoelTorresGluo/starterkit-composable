'server-only'

import { createIntl } from '@formatjs/intl'
import { getSupportedLocale } from './utils'

export const getServerIntl = async (locale: string) => {
  const parsedLocale = getSupportedLocale(locale)
  return createIntl({
    locale: locale,
    messages: (
      await import(`@oriuminc/templates/general/intl/${parsedLocale}.json`)
    ).default,
  })
}
