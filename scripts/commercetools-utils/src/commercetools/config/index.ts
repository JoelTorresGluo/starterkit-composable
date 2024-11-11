import env from 'dotenv'
import { ProjectSettings, ShippingSettings } from '../types'

env.config()
export const RAW_PRODUCTS_FILEPATH = 'src/products/products.raw.json'
export const PROCESSED_PRODUCTS_FILEPATH = 'src/products/products.json'
export const CSV_RAW_PRODUCTS_FILEPATH =
  'src/products/csvDataFile/SampleData.csv'

export const CT_CLIENT_CREDENTIALS = {
  CLIENT_ID: process.env.COMMERCETOOLS_CLIENT_ID || '',
  CLIENT_SECRET: process.env.COMMERCETOOLS_CLIENT_SECRET || '',
  PROJECT_KEY: process.env.COMMERCETOOLS_PROJECT_KEY || '',
}

export const CT_BASE_URLS = {
  CT_HOST: process.env.COMMERCETOOLS_HOST || '',
  AUTH_URL: process.env.COMMERCETOOLS_AUTH_URL || '',
}

export const PROJECT_SETTINGS: ProjectSettings = {
  currencies: ['USD', 'CAD', 'MXN'],
  languages: ['en-US', 'en-CA', 'fr-CA', 'es-MX'],
  countries: ['US', 'CA', 'MX'],
  storefrontSearch: true,
  ordersSearch: true,
  countryTaxRateFallback: true,
}

export const SHIPPING: ShippingSettings = {
  zones: [
    {
      name: 'Zone1',
      countries: PROJECT_SETTINGS.countries || [],
    },
  ],
  shippingMethods: [
    {
      isDefault: true,
      name: 'Standard Shipping',
      localizedDescription: {
        'en-CA': 'Ships within 5-7 business days',
        'en-US': 'Ships within 5-7 business days',
        'fr-CA': 'Expédié sous 5 à 7 jours ouvrables',
        'es-MX': 'Envíos en 5-7 días laborales',
      },
      rates: {
        USD: 0,
        CAD: 0,
        MXN: 0,
      },
    },
    {
      name: 'Premium Shipping',
      localizedDescription: {
        'en-CA': 'Ships within 2-3 business days',
        'en-US': 'Ships within 2-3 business days',
        'fr-CA': 'Expédié sous 2-3 jours ouvrables',
        'es-MX': 'Envíos en 2-3 días laborales',
      },
      rates: {
        USD: 1000,
        CAD: 1400,
        MXN: 70,
      },
    },
    {
      name: 'Expedited Shipping',
      localizedDescription: {
        'en-CA': 'Ships within 24 hours',
        'en-US': 'Ships within 24 hours',
        'fr-CA': 'Expédié sous 24 heures',
        'es-MX': 'Envío en 24 horas',
      },
      rates: {
        USD: 1695,
        CAD: 2335,
        MXN: 150,
      },
    },
  ],
}
