'use client'

import { useEffect, useRef } from 'react'

export const useAriaLabeling = (ids: string[]) => {
  const observerRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    const targetNode = document.body
    const config = { attributes: false, childList: true, subtree: true }

    const callback = (mutationsList: MutationRecord[]) => {
      let allLabeled = true

      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          ids.forEach((id) => {
            const element = document.getElementById(id)
            if (element && !element.getAttribute('aria-label')) {
              element.setAttribute('aria-label', `${id} notification region`)
              allLabeled = false
            }
          })
        }
      }

      if (allLabeled && observerRef.current) {
        observerRef.current.disconnect()
      }
    }

    observerRef.current = new MutationObserver(callback)
    observerRef.current.observe(targetNode, config)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [ids]) // Re-run the effect if the 'ids' array changes
}
