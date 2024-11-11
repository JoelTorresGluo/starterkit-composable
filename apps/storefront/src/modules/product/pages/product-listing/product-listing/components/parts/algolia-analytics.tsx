'use client'

import {
  ALGOLIA_TRACK_EVENT_DESCRIPTION,
  useAlgoliaInsights,
} from '@oriuminc/algolia'
import { useEffect, useMemo, useRef } from 'react'
import { useCurrentRefinements, useInstantSearch } from 'react-instantsearch'

export const AlgoliaAnalytics = () => {
  // hits view events
  const { results } = useInstantSearch()
  const { trackAlgoliaViewedObjectIDs, trackAlgoliaClickedFilters } =
    useAlgoliaInsights()
  const lastObjectIdsSent = useRef<string | null>(null)

  const hitsObjectIds = useMemo(() => {
    return results.hits.map((hit) => hit.objectID as string)
  }, [results.hits])

  useEffect(() => {
    const hitsObjectIdsStringified = hitsObjectIds.join(',')
    // avoid sending the last event more than once
    if (
      lastObjectIdsSent.current === hitsObjectIdsStringified ||
      hitsObjectIds.length === 0
    )
      return
    lastObjectIdsSent.current = hitsObjectIdsStringified
    trackAlgoliaViewedObjectIDs(
      hitsObjectIds,
      ALGOLIA_TRACK_EVENT_DESCRIPTION.HITS_VIEWED
    )
  }, [hitsObjectIds])

  // filters applied events
  const { items: refinements } = useCurrentRefinements()
  const lastFiltersSent = useRef<string | null>(null)

  const filters = useMemo(
    () =>
      refinements?.reduce<string[]>((acc, attribute) => {
        const currentAttributeRefinements = attribute.refinements.reduce<
          string[]
        >(
          (acc2, refinement) => [
            ...acc2,
            `${refinement.attribute}:${refinement.value}`,
          ],
          []
        )
        return [...acc, ...currentAttributeRefinements]
      }, []),
    [refinements]
  )

  useEffect(() => {
    const filtersStringified = filters.join(',')
    // avoid sending the last event more than once
    if (lastFiltersSent.current === filtersStringified || filters.length === 0)
      return
    lastFiltersSent.current = filtersStringified
    trackAlgoliaClickedFilters({ filters })
  }, [filters])

  return null
}
