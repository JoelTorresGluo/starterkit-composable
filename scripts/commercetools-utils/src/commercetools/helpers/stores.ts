import { localize } from '../utils/transformations'
import { createStore, CreateStorePayload } from '../service/stores'

export const getStorePayload = (storeName: string): CreateStorePayload => ({
  key: `${storeName}-store`,
  name: localize(`${storeName} store`),
  productSelections: [
    {
      active: true,
      productSelection: {
        typeId: 'product-selection',
        key: `${storeName}-selection`,
      },
    },
  ],
  distributionChannels: [
    {
      typeId: 'channel',
      key: `${storeName}-channel`,
    },
  ],
  supplyChannels: [
    {
      typeId: 'channel',
      key: `${storeName}-channel`,
    },
  ],
})

export async function createStores(stores: string[]) {
  return await Promise.all(
    stores.map(
      async (store: string) => await createStore(getStorePayload(store))
    )
  )
}
