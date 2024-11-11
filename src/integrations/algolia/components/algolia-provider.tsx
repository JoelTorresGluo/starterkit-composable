import { ReactElement } from 'react'
import { useAtomValue } from 'jotai'
import { InstantSearch, Configure } from 'react-instantsearch'
import { STORE_LOCATOR_ALGOLIA_INDEX_NAME } from './constants'
import { searchClientAtom } from '../search-client'
import { AlgoliaIntegration } from './algolia-integration'
import { useUserLatLng } from '../../../hooks/use-user-lat-lng'
import { useAlgoliaInsights } from '@oriuminc/algolia'

export const AlgoliaProvider = (props: {
  children: ReactElement | ReactElement[]
}) => {
  const searchClient = useAtomValue(searchClientAtom)
  const { userLatLng } = useUserLatLng()
  const { useAlgoliaAutomaticInsights } = useAlgoliaInsights()

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={STORE_LOCATOR_ALGOLIA_INDEX_NAME}
      insights={useAlgoliaAutomaticInsights}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <>
        <AlgoliaIntegration />
        {userLatLng && (
          <Configure
            // @ts-ignore
            aroundLatLng={`${userLatLng?.lat}, ${userLatLng?.lng}`}
            aroundLatLngViaIP={!userLatLng}
            aroundRadius='all' // To retrieve all results within the specified radius
          />
        )}
        {props.children}
      </>
    </InstantSearch>
  )
}
