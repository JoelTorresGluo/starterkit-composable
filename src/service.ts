import algoliasearch from 'algoliasearch'
import { AlgoliaProduct } from './types'

interface AlgoliaUtils {
  appId: string
  baseIndex: string
  writeApiKey: string
  config: {
    defaultRankingOptions: string[]
    primaryIndexSettings: Record<string, string[]>
    replicas: Array<{ name: string; ranking: string }>
  }
}

export const getAlgoliaUtils = ({
  appId,
  baseIndex,
  writeApiKey,
  config,
}: AlgoliaUtils): any => {
  const algoliaClient = algoliasearch(appId, writeApiKey)

  const setReplicaSetting = (replica: string, ranking: string) =>
    algoliaClient
      .initIndex(replica)
      .setSettings({ ranking: [ranking, ...config.defaultRankingOptions] })
      .wait()

  return {
    algoliaClient,
    saveProducts: (index: string, products: AlgoliaProduct[]) =>
      algoliaClient.initIndex(index).saveObjects(products).wait(),
    getIndexName: (language: string) => `${baseIndex}_${language}`,
    setIndexSettings: (index: string) =>
      algoliaClient.initIndex(index).setSettings(config.primaryIndexSettings),
    createReplicas: async (index: string) => {
      const replicas = config.replicas.map((replica) => ({
        id: `${index}_${replica.name}`,
        ...replica,
      }))

      await algoliaClient
        .initIndex(index)
        .setSettings({ replicas: replicas.map(({ id }) => id) })
        .wait()

      return Promise.all(
        replicas.map((replica) =>
          setReplicaSetting(replica.id, replica.ranking)
        )
      )
    },
    setReplicaSetting,
    clearIndex: async (index: string) =>
      await algoliaClient.initIndex(index).clearObjects().wait(),
  }
}
