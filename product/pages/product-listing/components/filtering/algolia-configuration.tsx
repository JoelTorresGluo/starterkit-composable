import { useGridLayout } from '@oriuminc/base'
import { Configure } from 'react-instantsearch'
import { useMemo } from 'react'

interface AlgoliaConfigurationProps {
  query: string
  isCategoryPage?: boolean
}

export const AlgoliaConfiguration = (props: AlgoliaConfigurationProps) => {
  const { query, isCategoryPage } = props

  const { hitsPerPage } = useGridLayout()
  const filterProps = useMemo(
    () => (isCategoryPage ? { filters: `categories: ${query}` } : { query }),
    [query, isCategoryPage]
  )
  // @ts-ignore
  return <Configure page={0} hitsPerPage={hitsPerPage} {...filterProps} />
}
