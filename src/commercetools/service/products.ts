import axios from 'axios'

import { CT_BASE_URLS, CT_CLIENT_CREDENTIALS } from '../config'
import { defaultLang } from '../utils/settings'
import { ProductProjection as CtProductProjection } from '@oriuminc/commercetools'
import * as Stream from 'stream'
import { CTProductActionPayload, CTProductPayload, ProductType } from '../types'
const { PROJECT_KEY } = CT_CLIENT_CREDENTIALS
const { CT_HOST } = CT_BASE_URLS

export const createProductType = async (productType: ProductType) => {
  console.log(`Creating product type ${productType.name}`)

  const res = await axios.post(
    `${CT_HOST}/${PROJECT_KEY}/product-types`,
    productType
  )

  return res.data
}

export const createProduct = async (product: CTProductPayload) => {
  console.log(`Creating product ${product.name[defaultLang]}`)

  const res = await axios.post(`${CT_HOST}/${PROJECT_KEY}/products`, product)

  return res.data
}

export const publishProduct = async (
  productId: string,
  payload: CTProductActionPayload
) => {
  console.log(`Publishing product ${productId}`)

  const res = await axios.post(
    `${CT_HOST}/${PROJECT_KEY}/products/${productId}`,
    payload
  )

  return res.data as CtProductProjection
}

export const addImageToProduct = async (
  productId: string,
  image: Stream.Readable,
  extension: string,
  filename: string
) => {
  console.log(`Adding image to product ${productId}`)

  const res = await axios.post(
    `${CT_HOST}/${PROJECT_KEY}/products/${productId}/images`,
    image,
    {
      headers: {
        'Content-Type': `image/${extension}`,
      },
      params: {
        filename,
      },
    }
  )

  return res.data
}

export const getProductById = async (productId: string) => {
  console.log(`Getting product ${productId}`)
  const res = await axios.get(`${CT_HOST}/${PROJECT_KEY}/products/${productId}`)

  return res.data as CtProductProjection
}
