import { IntlConfig } from '@oriuminc/base'
import enUSTranslations from './en-US.json'
import enCATranslations from './en-CA.json'
import frCATranslations from './fr-CA.json'
import esMXTranslations from './es-MX.json'

//TODO - pull translations from the CMS (contentul / Amplience)

export const intlConfig: IntlConfig[] = [
  {
    code: 'en-US',
    title: 'English (en-US)',
    keys: {
      ...enUSTranslations,
    },
    translationKey: 'locale.title.en-US',
    currency: 'USD',
  },
  {
    code: 'en-CA',
    title: 'English (en-CA)',
    keys: {
      ...enUSTranslations,
      ...enCATranslations,
    },
    translationKey: 'locale.title.en-CA',
    currency: 'CAD',
  },
  {
    code: 'fr-CA',
    title: 'French (fr-CA)',
    keys: {
      ...enUSTranslations,
      ...frCATranslations,
    },
    translationKey: 'locale.title.fr-CA',
    currency: 'CAD',
  },
  {
    code: 'es-MX',
    title: 'Spanish (es-MX)',
    keys: {
      ...enUSTranslations,
      ...esMXTranslations,
    },
    translationKey: 'locale.title.es-MX',
    currency: 'MXN',
  },
]
