import axios from 'axios'

import { CT_BASE_URLS, CT_CLIENT_CREDENTIALS } from '../config'
import { ResourceRef } from '../types'
const { PROJECT_KEY } = CT_CLIENT_CREDENTIALS
const { CT_HOST } = CT_BASE_URLS

export interface CreateStorePayload {
  key: string
  name: {
    [locale: string]: string
  }
  productSelections?: ProductSelections[]
  distributionChannels?: ResourceRef<'channel'>[]
  supplyChannels?: ResourceRef<'channel'>[]
}

export interface ProductSelections {
  active: boolean
  productSelection: ResourceRef<'product-selection'>
}

export const createStore = async (payload: CreateStorePayload) => {
  const res = await axios.post(`${CT_HOST}/${PROJECT_KEY}/stores`, payload)

  return res.data
}
