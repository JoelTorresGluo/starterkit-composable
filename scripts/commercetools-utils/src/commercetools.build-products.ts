import * as _ from 'lodash'
import { getGenericAttributes } from './commercetools/helpers/products'
import { RawProduct, UnprocessedRawProduct } from './commercetools/types'
import { PROCESSED_PRODUCTS_FILEPATH } from './commercetools/config'
import { getRawDemoProducts, saveJsonFile } from './commercetools/utils/files'
import { getSlug } from './commercetools/utils/products'

const getProductsGroupBy = (allProducts: RawProduct[], attribute: string) =>
  _.groupBy(allProducts, attribute)

//function changed to addapt products
const getAllStores = (products: RawProduct[]) =>
  products.reduce((acc: string[], product) => {
    const store = product?.seller?.toUpperCase()
    return _.uniq([...acc, store])
  }, [])

const buildProductsFile = () => {
  const rawDemoProducts = getRawDemoProducts()
  const products = rawDemoProducts.map(addSkuAndRating)

  const productsGroupedByType = getProductsGroupBy(products, 'type')
  const productTypes = Object.keys(productsGroupedByType)

  const stores = getAllStores(products)

  const transformedProducts = productTypes.map((type) => {
    const products = productsGroupedByType[type]

    return {
      productType: {
        name: type,
        description: type + ' description',
        attributes: getGenericAttributes(
          Object.keys(productsGroupedByType[type][0])
        ),
      },
      mainCategory: type,
      products,
    }
  })

  saveJsonFile(PROCESSED_PRODUCTS_FILEPATH, { stores, transformedProducts })
}

const addSkuAndRating: (product: UnprocessedRawProduct) => RawProduct = (
  product
) => ({
  ...product,
  // Add dynamic custom fields here
  sku: product.sku || getSlug(product.name),
  rating: parseFloat((Math.random() * (5 - 1) + 1).toFixed(1)),
})

buildProductsFile()
