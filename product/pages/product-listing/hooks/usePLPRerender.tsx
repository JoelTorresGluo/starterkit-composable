'use client'

import { useRouter } from 'next/compat/router'
import { useEffect, useState } from 'react'

/**
 * This is a workaround for the PLP links to work when changing query params.
 * TODO: Use Next's Router to manage InstantSearch routing
 */
export const usePLPRerender = () => {
  const router = useRouter()!
  const [originalQuery] = useState(router?.query)
  const [key, setKey] = useState(Date.now())

  useEffect(() => {
    if (originalQuery !== router.query) {
      setKey(Date.now())
    }
  }, [router])

  return {
    pageContainerProps: {
      key,
    },
  }
}
