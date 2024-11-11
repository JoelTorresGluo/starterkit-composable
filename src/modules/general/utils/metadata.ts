import { getSiteUrl } from '@oriuminc/base'
import { Metadata } from 'next'
import i18nConfig from '../../../../i18nConfig'

export const getMetadataAlternateLanguages = (
  pathname?: string
): Metadata['alternates'] => {
  const alternateLanguages = Object.fromEntries(
    i18nConfig.locales.map((locale) => [
      locale,
      [{ url: `${getSiteUrl()}/${locale}${pathname ?? ''}` }],
    ])
  )

  return {
    languages: {
      ...alternateLanguages,
      'x-default': [{ url: `${getSiteUrl()}${pathname ?? ''}` }],
    },
  }
}
