'use client'

import { useUser } from '@modules/commerce'
import { useComposable } from '@modules/general'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuthGuard = () => {
  const router = useRouter()
  const { isLoggedIn, isLoading } = useUser()
  const { path } = useComposable()

  useEffect(() => {
    if (isLoggedIn === false) {
      router.push(path.getAccountLogin())
    }
  }, [isLoggedIn, router])

  return {
    isLoading,
  }
}
