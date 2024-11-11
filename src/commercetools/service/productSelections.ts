import axios from 'axios'

import { CT_BASE_URLS, CT_CLIENT_CREDENTIALS } from '../config'
const { PROJECT_KEY } = CT_CLIENT_CREDENTIALS
const { CT_HOST } = CT_BASE_URLS

export interface SearchQueryParams {
  limit?: number
  offset?: number
  withTotal?: boolean
  expand?: string
  where?: string
  sort?: string
}

export const addProductToSelection = async (
  productSelectionId: string,
  payload: any
) => {
  const res = await axios.post(
    `${CT_HOST}/${PROJECT_KEY}/product-selections/${productSelectionId}`,
    payload
  )

  return res.data
}

export const createProductSelection = async (payload: any) => {
  const res = await axios.post(
    `${CT_HOST}/${PROJECT_KEY}/product-selections`,
    payload
  )

  return res.data
}

export const getProductSelections = async (params: SearchQueryParams) => {
  const res = await axios.get(`${CT_HOST}/${PROJECT_KEY}/product-selections`, {
    params: {
      limit: params.limit,
      offset: params.offset,
      withTotal: true,
    },
  })

  return res.data
}

export const getProductSelection = async (
  productSelection: string,
  by: 'id' | 'key' = 'id'
) => {
  const productSelectionPrefix = by === 'key' ? 'key=' : ''
  const res = await axios.get(
    `${CT_HOST}/${PROJECT_KEY}/product-selections/${productSelectionPrefix}${productSelection}`
  )

  return res.data
}

export const getProductsInProductSelection = async (
  productSelectionKey: string,
  params: SearchQueryParams
) => {
  const res = await axios.get(
    `${CT_HOST}/${PROJECT_KEY}/product-selections/key=${productSelectionKey}/products?expand=products&expand=product.masterData.current.categories[*]`,
    {
      params: {
        limit: params.limit,
        offset: params.offset,
        withTotal: true,
      },
    }
  )

  return res.data
}
