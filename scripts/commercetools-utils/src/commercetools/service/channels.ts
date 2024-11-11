import axios from 'axios'

import { CT_BASE_URLS, CT_CLIENT_CREDENTIALS } from '../config'
const { PROJECT_KEY } = CT_CLIENT_CREDENTIALS
const { CT_HOST } = CT_BASE_URLS

export interface CreateChannelPayload {
  key: string
  roles?: string[]
  name?: {
    [locale: string]: string
  }
  description?: {
    [locale: string]: string
  }
  address?: any
  geoLocation?: any
  custom?: any
}

export const createChannel = async (payload: CreateChannelPayload) => {
  const res = await axios.post(`${CT_HOST}/${PROJECT_KEY}/channels`, payload)

  return res.data
}
