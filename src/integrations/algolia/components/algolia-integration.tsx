import { useEffect } from 'react'
import { useInfiniteHits, useInstantSearch } from 'react-instantsearch'
import { useStores } from '../../../hooks/use-stores'

export const AlgoliaIntegration = () => {
  const { setStores } = useStores()
  const { status } = useInstantSearch()
  const { hits } = useInfiniteHits()

  useEffect(() => {
    if (status !== 'idle') {
      return
    }

    // @ts-ignore
    setStores(hits)
  }, [status])

  return null
}
