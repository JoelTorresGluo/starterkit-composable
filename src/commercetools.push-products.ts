import { login } from './commercetools/utils/auth'
import {
  createProductPayload,
  publishProducts,
} from './commercetools/helpers/products'
import {
  createProduct,
  createProductType,
} from './commercetools/service/products'
import { createCategoryPayload } from './commercetools/helpers/categories'
import { createCategory } from './commercetools/service/categories'
import {
  addProductsToSelection,
  createProductSelections,
} from './commercetools/helpers/productSelections'
import { addImagesToProduct } from './commercetools/helpers/files'
import { getDemoProducts } from './commercetools/utils/files'
import { createChannels } from './commercetools/helpers/channels'
import { createStores } from './commercetools/helpers/stores'

export const pushProducts = async () => {
  console.log('Pushing products to commercetools...')
  const idProducts = []
  const { stores, transformedProducts } = getDemoProducts()

  // Create product selections
  await createProductSelections(stores)

  // Create Channels
  await createChannels(stores)

  // Create Stores
  await createStores(stores)

  const selectionProductsMap: Record<string, string[]> = {}

  for (const rawDemoProductCollection of transformedProducts) {
    const { productType, mainCategory, products } = rawDemoProductCollection

    // Create Product Types
    const productTypeResponse = await createProductType(productType)

    // Create Categories
    const mainCategoryPayload = createCategoryPayload(mainCategory)
    const { id: mainCategoryId } = await createCategory(mainCategoryPayload)

    // Create Unpublished Products
    for (const product of products) {
      const payload = createProductPayload(
        productTypeResponse.id,
        [mainCategoryId],
        product
      )

      // Create product with Category and ProductType
      const { id: productId } = await createProduct(payload)

      // Add images to product
      await addImagesToProduct(product, productId)

      // Add the product to the product selections
      const sellers = product.seller

      for (const seller of sellers) {
        const prevState = selectionProductsMap[seller] || []
        selectionProductsMap[seller] = [...prevState, productId]
      }
      idProducts.push(productId)
    }
  }

  // Add products to selections
  for (const [seller, productIds] of Object.entries(selectionProductsMap)) {
    await addProductsToSelection(seller, productIds)
  }

  return idProducts
}
;(async () => {
  await login()
  const productIds = await pushProducts()
  await publishProducts(productIds)
})()
