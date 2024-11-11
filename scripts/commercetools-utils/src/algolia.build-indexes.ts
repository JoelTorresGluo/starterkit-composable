import {
  LOCALES,
  DEFAULT_RANKING_OPTIONS,
  PRIMARY_INDEX_SETTINGS,
  REPLICAS,
} from '@oriuminc/algolia'
import {
  ALGOLIA_APP_ID,
  ALGOLIA_BASE_INDEX,
  ALGOLIA_WRITE_API_KEY,
} from './algolia/config'
import { getDemoProducts } from './commercetools/utils/files'
import { getAlgoliaUtils } from '@oriuminc/algolia'

export const buildAlgoliaIndexes = async () => {
  console.log('Building Algolia indexes...')

  const { setIndexSettings, createReplicas } = getAlgoliaUtils({
    appId: ALGOLIA_APP_ID,
    baseIndex: ALGOLIA_BASE_INDEX,
    writeApiKey: ALGOLIA_WRITE_API_KEY,
    config: {
      replicas: REPLICAS,
      primaryIndexSettings: PRIMARY_INDEX_SETTINGS,
      defaultRankingOptions: DEFAULT_RANKING_OPTIONS,
    },
  })

  const { stores } = getDemoProducts()

  for (const store of stores) {
    for (const locale of LOCALES) {
      // Get an index name for current locale
      const primaryIndexName = `${ALGOLIA_BASE_INDEX}_${store}_${locale.countryLanguageCode}`

      // Create primary index and set basic settings
      await setIndexSettings(primaryIndexName)

      // Create replicas & Set ranking for each replica
      await createReplicas(primaryIndexName)

      console.log(`Build of ${primaryIndexName} complete`)
    }
  }
}
;(async () => {
  await buildAlgoliaIndexes()
})()
