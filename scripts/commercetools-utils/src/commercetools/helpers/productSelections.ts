import { localize } from '../utils/transformations'
import {
  addProductToSelection,
  createProductSelection,
  getProductSelection,
  getProductSelections,
  getProductsInProductSelection,
} from '../service/productSelections'

export async function createProductSelections(stores: string[]) {
  return await Promise.all(
    stores.map(
      async (store: string) =>
        await createProductSelection(getProductSelectionPayload(store))
    )
  )
}

export const addProductToSelectionPayload = (
  version: number,
  productIds: string[]
) => {
  return {
    version: version,
    actions: productIds.map((id) => ({
      action: 'addProduct',
      product: {
        typeId: 'product',
        id: id,
      },
    })),
  }
}

export const getProductSelectionPayload = (selection: string) => ({
  key: `${selection}-selection`,
  name: localize(`${selection} selection`),
})

export const getAllProductsInProductSelection = async (
  productSelectionKey: string
) => {
  const maxLimit = 500
  const { results, total } = await getProductsInProductSelection(
    productSelectionKey,
    {
      offset: 0,
      limit: maxLimit,
    }
  )

  if (total > maxLimit) {
    const pages = Math.ceil(total / maxLimit)
    const allProducts = await Promise.all(
      Array(pages)
        .fill(0)
        .map(async (_, i) => {
          const { results } = await getProductsInProductSelection(
            productSelectionKey,
            {
              offset: i * maxLimit,
              limit: maxLimit,
            }
          )
          return results.map(({ product }: any) => product.obj)
        })
    )

    return allProducts.flat()
  }

  return results.map(({ product }: any) => product.obj)
}

export const getAllProductSelections = async () => {
  const maxLimit = 500
  const { results, total } = await getProductSelections({
    offset: 0,
    limit: maxLimit,
  })

  if (total > maxLimit) {
    const pages = Math.ceil(total / maxLimit)
    const allProducts = await Promise.all(
      Array(pages)
        .fill(0)
        .map(async (_, i) => {
          const { results } = await getProductSelections({
            offset: i * maxLimit,
            limit: maxLimit,
          })
          return results
        })
    )

    return allProducts.flat()
  }

  return results
}

export const addProductsToSelection = async (
  seller: string,
  productIds: string[]
) => {
  const selectionKey = `${seller.toUpperCase()}-selection`
  console.log({ selectionKey })
  const { id, version } = await getProductSelection(selectionKey, 'key')
  console.log({ id, version })
  const productToSelectionPayload = addProductToSelectionPayload(
    version,
    productIds
  )
  console.log({ productToSelectionPayload })
  return addProductToSelection(id, productToSelectionPayload)
}
