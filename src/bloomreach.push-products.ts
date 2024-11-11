import yargs from 'yargs/yargs'
import { confirm } from '@inquirer/prompts'

import {
  getAllProductsInProductSelection,
  getAllProductSelections,
} from './commercetools/helpers/productSelections'
import { login } from './commercetools/utils/auth'

import { BloomreachProduct, CategoryPath } from '@oriuminc/bloomreach'

import { CTProductInProductSelection, Locale } from './commercetools/types'
import {
  BLOOMREACH_HOST_PROD,
  BLOOMREACH_HOST_STAGING,
  BloomreachBrandConfig,
  LOCAL_CURRENCY,
  getBloomreachConfiguration,
} from './bloomreach/config'

const getBloomreachServices = (
  { accountId, apiKey }: BloomreachBrandConfig,
  isProduction: boolean
) => {
  // see https://documentation.bloomreach.com/discovery/reference/send-your-data-product for endpoint details

  const host = isProduction ? BLOOMREACH_HOST_PROD : BLOOMREACH_HOST_STAGING

  if (!host) {
    throw new Error(
      'Bloomreach host not defined. See BLOOMREACH_HOST_PROD and BLOOMREACH_HOST_STAGING'
    )
  }

  const getAccountCatalogUrl = (catalogName: string): string =>
    `${host}/accounts/${accountId}/catalogs/${catalogName}`

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
    indexCatalogService: async (catalogName: string) => {
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
    putProductsService: async (catalogName: string, products: any) => {
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

const pushProducts = async ({ isProduction }: { isProduction: boolean }) => {
  const brands = (await getAllProductSelections()).map(
    ({ key }: { key: string }) => key
  )

  if (!BLOOMREACH_HOST_PROD || !BLOOMREACH_HOST_STAGING) {
    console.log(
      '>>> Bloomreach host not defined. Set environment variables BLOOMREACH_HOST_PROD and BLOOMREACH_HOST_STAGING.'
    )
    return
  }

  for (const brand of brands) {
    const brandName = brand.replace('-selection', '')

    console.log(`>>> Begining Brand: ${brandName}`)

    const bloomreachConfiguration = getBloomreachConfiguration()[brandName]

    if (
      !(
        bloomreachConfiguration &&
        bloomreachConfiguration.accountId &&
        bloomreachConfiguration.apiKey &&
        bloomreachConfiguration.baseCatalogName
      )
    ) {
      console.log(
        `>>> Bloomreach configuration for '${brandName}' store was not found. No products will be pushed for this brand.`
      )
      continue
    }

    const ctProducts: CTProductInProductSelection[] =
      await getAllProductsInProductSelection(brand)

    const { putProductsService, indexCatalogService } = getBloomreachServices(
      bloomreachConfiguration,
      isProduction
    )

    for (const locale of Object.keys(LOCAL_CURRENCY)) {
      const currency = LOCAL_CURRENCY[locale]

      const bloomreachProducts = ctProducts.map((product) =>
        transformToBloomreachFormat({
          product,
          locale,
          currency,
        })
      )

      const catalogNameLocale = locale.replace('-', '_').toLowerCase() // ex. en-US -> en_us
      const catalogName = `${bloomreachConfiguration.baseCatalogName}_${catalogNameLocale}`

      // uncomment to use for setting the confusing "base" catalog (the one with no locale postfix). without this, it seems the
      // dynamic facets are not working properly, and the categories are not set correctly either.
      // const catalogName = `${bloomreachConfiguration.baseCatalogName}`

      console.log(
        `\n\n >>> Starting the load of ${bloomreachProducts.length} products from '${brandName}' store to catalog '${catalogName}'.`
      )

      await putProductsService(catalogName, bloomreachProducts)
      console.log(`Push to catalog '${catalogName}' requested.`)

      try {
        await indexCatalogService(catalogName)
        console.log(
          `Index job for '${catalogName}' catalog has been requested.`
        )
      } catch (error) {
        console.log(
          `Request of index job for '${catalogName}' catalog failed, try again through the API.`
        )
      }
    }
  }
}

export const transformToBloomreachFormat = ({
  product,
  locale,
  currency,
}: {
  product: CTProductInProductSelection
  locale: string
  currency: string
}): BloomreachProduct => {
  const { current } = product.masterData

  const name = current.name[locale]
  const description = current.description[locale]
  const slug = current.slug[locale]

  const { masterVariant } = current

  const productPrice = masterVariant.prices.find(
    (price) => price.value.currencyCode === currency
  )

  const categories: CategoryPath[] = []
  current.categories.map(({ obj: category }) => {
    categories.push({
      id: category.name[locale],
      name: category.name[locale],
    })
  })
  const categoryPaths = []
  categoryPaths.push(categories)

  let attributes = {}
  for (const attribute of current.masterVariant.attributes) {
    attributes = {
      ...attributes,
      [attribute.name]: `${attribute.value}`,
    }
  }

  return {
    op: 'add',
    path: `/products/${product.id}`,
    value: {
      attributes: {
        title: name,
        description: description,
        price: productPrice?.value.centAmount ?? 0,
        fractionDigits: productPrice?.value.fractionDigits ?? 0,
        currency: currency,
        url: slug,
        thumb_image: masterVariant.images[0]?.url ?? '',
        category_paths: categoryPaths,
        availability: true,
        ...attributes,
      },
    },
  }
}
;(async () => {
  const argv = yargs(process.argv.slice(2))
    .options({
      prodcatalog: { type: 'boolean', default: false },
    })
    .parseSync()

  await login()

  if (argv.prodcatalog) {
    console.log('Will overwrite production catalog')
    const answer = await confirm({
      message: 'Confirm overwriting Production catalog',
    })

    if (answer === true) {
      await pushProducts({ isProduction: true })
    }
  } else {
    console.log('Using Staging catalog')
    await pushProducts({ isProduction: false })
  }
})()
