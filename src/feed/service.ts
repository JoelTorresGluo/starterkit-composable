export interface BloomreachUtils {
  host: string
  accountId: string
  apiKey: string
}
export const getBloomreachUtils = ({
  host,
  accountId,
  apiKey,
}: BloomreachUtils): any => {
  const getAccountCatalogUrl = (catalogName: string): string =>
    `${host}/dataconnect/api/v1/accounts/${accountId}/catalogs/${catalogName}`

  const headers = {
    addProduct: {
      'Content-Type': 'application/json-patch+json',
      Authorization: apiKey,
    },
    indexCatalog: {
      Authorization: apiKey,
    },
  }

  const handleResponse = (response: Response) => {
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`)
    }
    return response.json()
  }

  return {
    indexCatalog: async (catalogName: string) => {
      return fetch(`${getAccountCatalogUrl(catalogName)}/indexes`, {
        method: 'POST',
        headers: headers.indexCatalog,
      })
        .then(handleResponse)
        .catch((error) => {
          console.error(`Failed to index catalog ${catalogName}:`, error)
          throw error
        })
    },
    putProducts: async (catalogName: string, products: any) => {
      return fetch(`${getAccountCatalogUrl(catalogName)}/products`, {
        method: 'PUT',
        headers: headers.addProduct,
        body: JSON.stringify(products),
      })
        .then(handleResponse)
        .catch((error) => {
          console.error('Failed to add product:', error)
          throw error
        })
    },
  }
}
