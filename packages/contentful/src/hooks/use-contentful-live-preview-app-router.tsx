'use client'

import { ContentfulLivePreview } from '@contentful/live-preview'
import { UseCmsLivePreview } from '@oriuminc/cms-generic'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

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

export const useContentfulLivePreviewAppRouter: UseCmsLivePreview = ({
  previewData: serverPreviewData,
  onUpdatePreview,
  onExitPreview,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const secret = searchParams.get('secret')
  const isLivePreview = isLivePreviewEnvironment()
  const intl = useIntl()
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // this is to switch isLoadingPreview only after the initial render to avoid hydration issues
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isLivePreview) return

    // start live preview features
    ContentfulLivePreview.init({
      locale: intl.locale,
    })

    const handleMessage = (e: any) => {
      const { from, action } = e.data
      if (from === 'live-preview') {
        onUpdatePreview?.()
        setIsLoading(false)
      }

      // this events will be sent from contentful to signal a change
      if (
        e.data?.hasOwnProperty('entity') &&
        from === 'live-preview' &&
        action === 'ENTRY_SAVED'
      ) {
        onUpdatePreview?.()
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  useEffect(() => {
    if (isLivePreview && !serverPreviewData) {
      // redirect to the preview api route to activate preview mode and set the previewData
      router.push(
        `/api/preview?redirectUrl=${
          window.location.href
        }&previewData=${JSON.stringify({})}&secret=${secret}`
      )
    }
  }, [isLivePreview, secret])

  useEffect(() => {
    if (!isLivePreview && serverPreviewData) {
      /**
       * This usually happens when you open the appon a new tab,
       * after using preview mode. Just exit preview mode.
       */
      onExitPreview?.()
    }
  }, [isLivePreview, serverPreviewData])

  return {
    isPreview: isLivePreview,
    isLoadingPreview:
      Boolean(isLivePreview && isClient && isLoading) || !serverPreviewData,
  }
}
