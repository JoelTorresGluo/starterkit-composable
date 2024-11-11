import { FormatNumberOptions } from 'react-intl'
import { GeolocatedConfig } from 'react-geolocated'

export const API_KEY = `${process.env.NEXT_PUBLIC_STORE_LOCATOR_GOOGLE_MAPS_API_KEY}`
export const DEV_MODE =
  process.env.NODE_ENV === 'development' ||
  `${process.env.NEXT_PUBLIC_STORE_LOCATOR_DEV_MODE}` === '1'

export const TIMEZONE_DEFAULT = 'America/New_York'

export const REACT_INTL_KILOMETER_FORMAT: FormatNumberOptions = {
  style: 'unit',
  unit: 'kilometer',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
} as const

export const IMAGE_PLACEHOLDER_URL = '/img/image-placeholder.svg' as const

export const USE_GEOLOCATED_DEFAULT_CONFIG: GeolocatedConfig = {
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 10000,
}
