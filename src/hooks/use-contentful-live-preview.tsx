'use client'

import { ContentfulLivePreview } from '@contentful/live-preview'
import { UseCmsLivePreview } from '@oriuminc/cms-generic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const isLivePreviewEnvironment = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false
  }

  // For browsers that support ancestorOrigins (e.g., Chromium browsers)
  if (
    window.location.ancestorOrigins &&
    window.location.ancestorOrigins.length > 0
  ) {
    return window.location.ancestorOrigins.contains(
      'https://app.contentful.com'
    )
  }

  // Fallback for browsers like Firefox (use document.referrer)
  if (document.referrer) {
    try {
      const referrerOrigin = new URL(document.referrer).origin
      return referrerOrigin === 'https://app.contentful.com'
    } catch (e) {
      // Handle cases where document.referrer is not a valid URL
      console.error('Invalid referrer URL:', e)
      return false
    }
  }

  return false
}

export const useContentfulLivePreview: UseCmsLivePreview = ({
  onUpdatePreview,
}) => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const isLivePreview = isLivePreviewEnvironment()

  useEffect(() => {
    // this is to switch isLoadingPreview only after the initial render to avoid hydration issues
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isLivePreview) return

    // start live preview features
    ContentfulLivePreview.init({
      locale: router.locale!,
    })

    const handleMessage = (e: any) => {
      const { from, action } = e.data
      // this events will be sent from contentful to signal a change
      if (
        e.data?.hasOwnProperty('entity') &&
        from === 'live-preview' &&
        action === 'ENTRY_SAVED'
      ) {
        // trigger the onUpdate handlers (typically a refetch function)
        onUpdatePreview?.()
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    if (!router.isReady) return
    if (isLivePreview && !router.isPreview) {
      // redirect to the preview api route to activate preview mode and set the previewData
      router.push(
        `/api/preview?redirectUrl=${
          window.location.href
        }&previewData=${JSON.stringify({})}&secret=${router.query.secret}`
      )
    }
  }, [isLivePreview, router.isPreview, router.isReady, router.query])

  useEffect(() => {
    if (!router.isReady) return
    if (!isLivePreview && router.isPreview) {
      // redirect to the exit preview mode api route
      // this is for when the preview mode was opened from contentstack
      // and then the app was opened in another tabs, but the preview mode is still on
      router.push(`/api/exit-preview`)
    }
  }, [isLivePreview, router.isPreview, router.isReady])

  return {
    isPreview: isLivePreview,
    isLoadingPreview: Boolean(isClient && isLivePreview && !router.isPreview),
  }
}
