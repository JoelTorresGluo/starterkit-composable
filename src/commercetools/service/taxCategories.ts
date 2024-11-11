import axios from 'axios'

import { CT_BASE_URLS, CT_CLIENT_CREDENTIALS } from '../config'
const { PROJECT_KEY } = CT_CLIENT_CREDENTIALS
const { CT_HOST } = CT_BASE_URLS

export interface SubRate {
  name: string
  amount: number
}

export interface Rate {
  name: string
  country: string
  includedInPrice: boolean
  subRates?: SubRate[]
  amount?: number
  state?: string
}

export interface CreateTaxCategoryPayload {
  name: string
  key?: string
  description?: string
  rates?: Rate[]
}

export const createTaxCategory = async (payload: CreateTaxCategoryPayload) => {
  const res = await axios.post<{ id: string }>(
    `${CT_HOST}/${PROJECT_KEY}/tax-categories`,
    payload
  )

  return res.data
}
