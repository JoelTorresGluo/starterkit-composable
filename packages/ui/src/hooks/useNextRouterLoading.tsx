'use client'

import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useNextRouterLoading = () => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeStart = () => {
      document.body.style.cursor = 'progress'
    }

    const handleRouteChangeEnd = () => {
      document.body.style.cursor = 'auto'
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeEnd)
    router.events.on('routeChangeError', handleRouteChangeEnd)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeEnd)
      router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [router])

  return null
}
