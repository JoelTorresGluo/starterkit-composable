import { LocaleSchema } from '@oriuminc/base'

export const getSupportedLocale = (rawLocale: string) => {
  return LocaleSchema.catch('en-US').parse(rawLocale)
}
