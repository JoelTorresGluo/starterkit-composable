import {
  getAllProductsInProductSelection,
  getAllProductSelections,
} from './commercetools/helpers/productSelections'
import { login } from './commercetools/utils/auth'

import { AlgoliaProduct, getAlgoliaUtils } from '@oriuminc/algolia'
import {
  LOCALES,
  DEFAULT_RANKING_OPTIONS,
  PRIMARY_INDEX_SETTINGS,
  REPLICAS,
} from '@oriuminc/algolia'

import { CTProductInProductSelection, Locale } from './commercetools/types'
import {
  ALGOLIA_APP_ID,
  ALGOLIA_BASE_INDEX,
  ALGOLIA_WRITE_API_KEY,
  EXTENDED_ATTRIBUTES_TARGET,
} from './algolia/config'

const pushProducts = async () => {
  const { getIndexName, saveProducts } = getAlgoliaUtils({
    appId: ALGOLIA_APP_ID,
    baseIndex: ALGOLIA_BASE_INDEX,
    writeApiKey: ALGOLIA_WRITE_API_KEY,
    config: {
      replicas: REPLICAS,
      primaryIndexSettings: PRIMARY_INDEX_SETTINGS,
      defaultRankingOptions: DEFAULT_RANKING_OPTIONS,
    },
  })

  const brands = (await getAllProductSelections()).map(
    ({ key }: { key: string }) => key
  )

  for (const brand of brands) {
    const ctProducts: CTProductInProductSelection[] =
      await getAllProductsInProductSelection(brand)

    for (const locale of LOCALES) {
      const algoliaProducts = ctProducts.map((product) =>
        transformToAlgoliaFormat({
          product,
          locale,
        })
      )

      const brandIndex = brand.replace('-selection', '')
      const indexName = getIndexName(
        `${brandIndex}_${locale.countryLanguageCode}`
      )
      await saveProducts(indexName, algoliaProducts)

      console.log(`Push to ${indexName} complete`)
    }
  }
}

export const transformToAlgoliaFormat = ({
  product,
  locale,
}: {
  product: CTProductInProductSelection
  locale: Locale
}): AlgoliaProduct => {
  const localeLang = locale.countryLanguageCode
  const localeCurrency = locale.currency

  const { current } = product.masterData

  const name = current.name[localeLang]
  const description = current.description[localeLang]
  const slug = current.slug[localeLang]

  const { masterVariant } = current

  const productPrice = masterVariant.prices.find(
    (price) => price.value.currencyCode === localeCurrency
  )

  return {
    name: name || '',
    description,
    objectID: product.id,
    key: slug,
    slug,
    timestampCreated: Date.parse(product.createdAt),
    categories: current.categories.map(
      ({ obj: category }) => category.slug[localeLang]
    ),
    price: {
      centAmount: productPrice?.value.centAmount || 0,
      currency: productPrice?.value.currencyCode || localeCurrency,
    },
    attributes: {
      normalized:
        masterVariant.attributes.reduce((acc: any, attribute) => {
          // Ignore some attributes that are not needed for search
          if (attribute.name === 'producer_bio') return { ...acc }
          if (attribute.name === 'type') return { ...acc }

          const normalizeFn =
            // @ts-ignore
            EXTENDED_ATTRIBUTES_TARGET[attribute.name]?.normalizeFn

          return {
            ...acc,
            [attribute.name]: normalizeFn
              ? normalizeFn(attribute.value)
              : attribute.value,
          }
        }, {}) || {},
    },
    image: masterVariant.images[0]
      ? {
          url: masterVariant.images[0].url,
          label: `Alternate text for ${name}`,
        }
      : undefined,
  }
}
;(async () => {
  await login()
  await pushProducts()
})()
