'use client'

import { useLocalStorage, writeStorage } from '@oriuminc/base'
import { UpdateCustomerAction } from '@oriuminc/commerce-generic'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getSession, signIn, signOut } from 'next-auth/react'
import { SignOutParams } from 'next-auth/react/types'
import { useIntl } from 'react-intl'
import { LOCAL_STORAGE_CT_USER_UPDATED } from '../constants'
import { api } from '@modules/trpc/react'
import { useCart } from '@modules/commerce'
import { useEffect, useState } from 'react'

const setUserUpdatedAt = (timestamp: number) => {
  writeStorage(LOCAL_STORAGE_CT_USER_UPDATED, timestamp)
}

export const useUser = () => {
  const { locale } = useIntl()
  const { client } = api.useUtils()
  const { refetch: refetchCart } = useCart()
  const [hasRedirected, setHasRedirected] = useState(false)

  const [userUpdatedAt] = useLocalStorage(
    LOCAL_STORAGE_CT_USER_UPDATED,
    Date.now()
  )

  const session = useQuery({
    queryKey: ['session', userUpdatedAt],
    queryFn: async () => {
      const session = await getSession()
      return session
    },
  })

  const isLoggedIn = session.isLoading
    ? null
    : Boolean(session.data?.user?.email)

  const logout = useMutation({
    mutationKey: ['logout'],
    mutationFn: async (options: SignOutParams) => {
      await signOut({
        redirect: true,
        ...options,
      })

      setUserUpdatedAt(Date.now())
    },
  })

  const login = useMutation({
    mutationKey: ['login', locale],
    mutationFn: async (variables: { email: string; password: string }) => {
      const response = await signIn(
        'credentials',
        {
          username: variables.email,
          password: variables.password,
          redirect: false,
          locale,
        },
        {
          cartId: localStorage?.getItem('cartId') ?? '',
        }
      )

      if (response?.error) {
        throw new Error(response.error)
      }
      setUserUpdatedAt(Date.now())
    },
    onSuccess: () => {
      refetchCart()
    },
  })

  const customer = useQuery({
    queryKey: ['customer', userUpdatedAt],
    queryFn: async () => {
      return await client.commerce.getCustomer.query()
    },
    enabled: !!isLoggedIn && !logout.isPending,
  })

  const updateCustomer = useMutation({
    mutationKey: ['updateCustomer'],
    mutationFn: async (variables: { actions: UpdateCustomerAction[] }) => {
      const response = await client.commerce.updateCustomer.mutate({
        actions: variables.actions,
      })

      setUserUpdatedAt(Date.now())
      return response
    },
  })

  // Probably you should remove this
  // Redirect to a URL only after login is successful
  // Cose of use: Shopify Multipass
  useEffect(() => {
    if (login.isSuccess && session.data?.user?.redirectUrl && !hasRedirected) {
      setHasRedirected(true)
      window.location.href = session.data.user.redirectUrl
    }
  }, [session, login, hasRedirected])

  return {
    login,
    logout,
    session: session.data?.user,
    sessionData: session.data,
    isLoggedIn,
    updateCustomer,
    customer: customer.data ?? null,
    isLoading: customer.isLoading || session.isLoading,
    isError: customer.isError || session.isError,
  }
}
