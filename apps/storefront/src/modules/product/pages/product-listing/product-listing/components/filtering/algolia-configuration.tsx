'use client'

import { useAlgoliaInsights } from '@oriuminc/algolia'
import { useGridLayout } from '@oriuminc/base'
import { useEffect, useMemo, useRef } from 'react'
import { Configure } from 'react-instantsearch'

interface AlgoliaConfigurationProps {
  query: string
  isCategoryPage?: boolean
}

export const AlgoliaConfiguration = (props: AlgoliaConfigurationProps) => {
  const { query, isCategoryPage } = props
  const { trackAlgoliaViewedFilters } = useAlgoliaInsights()
  const eventSentCategory = useRef('')
  const { hitsPerPage } = useGridLayout()
  const filterProps = useMemo(
    () => (isCategoryPage ? { filters: `categories:${query}` } : { query }),
    [query, isCategoryPage]
  )

  useEffect(() => {
    if (!isCategoryPage || eventSentCategory.current === query) return
    eventSentCategory.current = query
    trackAlgoliaViewedFilters({
      filters: [`categories:${query}`],
    })
  }, [isCategoryPage, query])

  // @ts-ignore
  return <Configure page={0} hitsPerPage={hitsPerPage} {...filterProps} />
}
