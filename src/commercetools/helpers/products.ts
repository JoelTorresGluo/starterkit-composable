import { localize } from '../utils/transformations'
import { getCategoryPayload } from './categories'
import {
  CTProductActionPayload,
  CTProductPayload,
  GetProductTemplate,
  RawProduct,
} from '../types'
import { KEY_TAX_CATEGORY_STANDARD } from './taxCategories'
import { getSlug } from '../utils/products'
import { getProductById, publishProduct } from '../service/products'
import Bottleneck from 'bottleneck'

const getSameForAllAttributes = (productTypeSchema: string[]) => {
  return productTypeSchema.filter(
    (x) =>
      x !== 'name' &&
      x !== 'sku' &&
      x !== 'price' &&
      x !== 'images' &&
      x !== 'description' &&
      x !== 'variants'
  )
}

const getAttributeTypeName = (attribute: string) => {
  if (attribute === 'rating') return 'number'

  return 'text'
}

export const getGenericAttributes = (productTypeSchema: string[]) => {
  const sameForAllAttributes = getSameForAllAttributes(productTypeSchema)

  return sameForAllAttributes.map((attribute) => ({
    type: {
      name: getAttributeTypeName(attribute),
    },
    isSearchable: true,
    inputHint: 'SingleLine',
    name: attribute,
    label: localize(attribute),
    isRequired: false,
    attributeConstraint: 'SameForAll',
  }))
}

const getAttributeValue = (attribute: string, product: RawProduct) => {
  if (Array.isArray(product[attribute])) {
    return product[attribute].join(',')
  }

  return product[attribute]
}

const getVariants = (product: any, attributes: any) => {
  const productVariants = product.variants

  const allAttributes = attributes.map((attribute: string) => ({
    name: attribute,
    value: getAttributeValue(attribute, product),
  }))

  return productVariants?.map(
    ({
      sku,
      price,
      images,
    }: {
      sku: string
      price: string
      images: string
    }) => {
      return {
        sku,
        attributes: allAttributes,
        prices: [
          {
            value: {
              type: 'centPrecision',
              currencyCode: 'USD',
              centAmount: Math.round(+price * 100 * 100 + Number.EPSILON) / 100,
              fractionDigits: 2,
            },
          },
          {
            value: {
              type: 'centPrecision',
              currencyCode: 'CAD',
              centAmount:
                Math.round(
                  Math.round(product.price * 0.77) * 100 * 100 + Number.EPSILON
                ) / 100,
              fractionDigits: 2,
            },
          },
          {
            value: {
              type: 'centPrecision',
              currencyCode: 'MXN',
              centAmount:
                Math.round(
                  Math.round(product.price * 19) * 100 * 100 + Number.EPSILON
                ) / 100,
              fractionDigits: 2,
            },
          },
        ],
      }
    }
  )
}

const getProductTemplate = ({
  productTypeId,
  categories,
  product,
}: GetProductTemplate): CTProductPayload => {
  const attributes = getSameForAllAttributes(Object.keys(product))
  const variants = getVariants(product, attributes)
  return {
    version: 1,
    productType: {
      id: productTypeId,
      typeId: 'product-type',
    },
    name: localize(product.name),
    description: localize(product.description),
    key: getSlug(product.name),
    slug: localize(getSlug(product.name)),
    categories: categories.map(getCategoryPayload),
    taxCategory: {
      typeId: 'tax-category',
      key: KEY_TAX_CATEGORY_STANDARD,
    },
    masterVariant: {
      sku: product.sku ? product.sku : getSlug(product.name),
      attributes: attributes.map((attribute: string) => ({
        name: attribute,
        value: getAttributeValue(attribute, product),
      })),
      prices: [
        {
          value: {
            type: 'centPrecision',
            currencyCode: 'USD',
            centAmount:
              Math.round(product.price * 100 * 100 + Number.EPSILON) / 100,
            fractionDigits: 2,
          },
        },
        {
          value: {
            type: 'centPrecision',
            currencyCode: 'CAD',
            centAmount:
              Math.round(
                Math.round(product.price * 0.77) * 100 * 100 + Number.EPSILON
              ) / 100,
            fractionDigits: 2,
          },
        },
        {
          value: {
            type: 'centPrecision',
            currencyCode: 'MXN',
            centAmount:
              Math.round(
                Math.round(product.price * 19) * 100 * 100 + Number.EPSILON
              ) / 100,
            fractionDigits: 2,
          },
        },
      ],
    },
    variants,
  }
}

export const createProductPayload = (
  productTypeId: string,
  categories: string[],
  product: RawProduct
): CTProductPayload =>
  getProductTemplate({
    productTypeId,
    categories,
    product,
  })

export const getPublishProductPayload = (
  version: number
): CTProductActionPayload => ({
  version,
  actions: [
    {
      action: 'publish',
    },
  ],
})

export const publishProducts = async (productIds: string[]) => {
  const limiter = new Bottleneck({
    maxConcurrent: 20,
    minTime: 300,
  })

  Promise.all(
    productIds.map(
      limiter.wrap(async (productId: string) => {
        const { version } = await getProductById(productId)
        const publishProductPayload = getPublishProductPayload(version)

        return publishProduct(productId, publishProductPayload)
      })
    )
  )
}
