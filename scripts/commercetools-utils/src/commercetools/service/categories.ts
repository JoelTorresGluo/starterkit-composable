import axios from 'axios'
import { CT_BASE_URLS, CT_CLIENT_CREDENTIALS } from '../config'
import { CTCreateCategoryPayload } from '../types'

const { PROJECT_KEY } = CT_CLIENT_CREDENTIALS
const { CT_HOST } = CT_BASE_URLS

export const createCategory = async (payload: CTCreateCategoryPayload) => {
  const res = await axios.post(`${CT_HOST}/${PROJECT_KEY}/categories`, payload)

  return res.data
}
