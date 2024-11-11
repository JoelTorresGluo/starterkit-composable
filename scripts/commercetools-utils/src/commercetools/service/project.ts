import axios from 'axios'

import { CT_BASE_URLS, CT_CLIENT_CREDENTIALS } from '../config'
import { ShippingSettings } from '../types'
const { PROJECT_KEY } = CT_CLIENT_CREDENTIALS
const { CT_HOST } = CT_BASE_URLS

export interface UpdateProjectAction<T extends string = string> {
  action: T
  [key: string]: any
}

interface UpdateProjectSettingsProps {
  version: number
  actions: UpdateProjectAction[]
}

export const updateProjectSettings = async (
  payload: UpdateProjectSettingsProps
) => {
  const res = await axios.post(`${CT_HOST}/${PROJECT_KEY}`, payload)
  return res.data
}

export const getProjectSettings = async () => {
  const res = await axios.get<{ version: number }>(`${CT_HOST}/${PROJECT_KEY}`)
  return res.data
}

interface CreateZoneProps {
  name: string
  countries: string[]
}

export const createZone = async ({ name, countries }: CreateZoneProps) => {
  const res = await axios.post<{ id: string }>(
    `${CT_HOST}/${PROJECT_KEY}/zones`,
    {
      name,
      locations: countries.map((country) => ({ country })),
    }
  )
  return res.data
}

interface CreateShippingMethodProps {
  name: string
  localizedDescription?: {
    [locale: string]: string
  }
  rates: {
    [currency: string]: number
  }
  taxCategoryId: string
  zoneId: string
  isDefault?: boolean
}

export const createShippingMethod = async ({
  name,
  localizedDescription,
  rates,
  taxCategoryId,
  zoneId,
  isDefault = false,
}: CreateShippingMethodProps) => {
  const payload = {
    name,
    localizedDescription,
    taxCategory: {
      typeId: 'tax-category',
      id: taxCategoryId,
    },
    zoneRates: [
      {
        zone: {
          typeId: 'zone',
          id: zoneId,
        },
        shippingRates: Object.entries(rates).map(([currency, rate]) => ({
          price: {
            currencyCode: currency,
            centAmount: rate,
          },
        })),
      },
    ],
    isDefault,
  }
  const res = await axios.post<{ id: string }>(
    `${CT_HOST}/${PROJECT_KEY}/shipping-methods`,
    payload
  )
  return res.data
}
