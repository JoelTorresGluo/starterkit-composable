'use client'

import { useSearchParams } from 'next/navigation'

export const usePDPSearchParams = () => {
  const searchParams = useSearchParams()
  const queryID = searchParams.get('queryID')
  const stringFilters = searchParams.get('filters')
  const formattedFilters = stringFilters ? stringFilters.split(',') : null

  return {
    queryID,
    filters: formattedFilters,
  }
}
