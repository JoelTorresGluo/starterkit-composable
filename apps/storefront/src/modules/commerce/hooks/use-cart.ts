'use client'

import {
  analyticsTrackAddToCart,
  analyticsTrackRemoveFromCart,
  analyticsTrackUpdateCart,
} from '@modules/general'
import { getCurrency } from '@oriuminc/base'
import { api } from '@modules/trpc/react'
import { Locale } from '@oriuminc/base'
import { UpdateCartAction } from '@oriuminc/commerce-generic'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useCallback, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import { useAlgoliaInsights } from '@oriuminc/algolia'

export const useCart = () => {
  const queryClient = useQueryClient()
  const { client } = api.useUtils()
  const intl = useIntl()
  const locale = intl.locale as Locale
  const currency = getCurrency(locale)
  const { queryProductCache } = useAlgoliaInsights()

  /**
   * Fetch Cart
   */
  const {
    data: cart,
    isLoading,
    isError,
    isFetched,
    refetch,
    error,
  } = api.commerce.getCart.useQuery(
    {
      locale,
      currency,
      // some e-commerce engines could need a cartId to get the cart
      cartId:
        typeof window !== 'undefined'
          ? localStorage?.getItem('cartId') ?? undefined
          : undefined,
    },
    {
      retry: false,
    }
  )

  const cartId = cart?.id ?? null

  // This logic should be removed
  useEffect(() => {
    if (cart && isFetched) {
      localStorage.setItem('cartId', cart.id)
    }

    if (error) {
      localStorage?.removeItem('cartId')
    }
  }, [cart, isFetched, error])

  /**
   * Apply Discount Code
   */
  const applyCode = useMutation({
    mutationKey: ['addDiscountCode'],
    mutationFn: async (variables: { code: string }) => {
      const response = await client.commerce.updateCart.mutate({
        id: cartId ?? '',
        locale,
        currency,
        actions: [
          {
            action: 'addDiscountCode',
            code: variables.code,
          },
        ],
      })

      await refetch()
    },
  })

  /**
   * Remove Discount Code
   */
  const removeCode = useMutation({
    mutationKey: ['removeDiscountCode'],
    mutationFn: async ({ discountId }: { discountId: string }) => {
      const response = await client.commerce.updateCart.mutate({
        id: cartId ?? '',
        locale,
        currency,
        actions: [
          {
            action: 'removeDiscountCode',
            discountCode: { id: discountId },
          },
        ],
      })
      await refetch()
    },
  })

  /**
   * Add Cart Payment
   */
  const addCartPayment = useMutation({
    mutationKey: ['addPayment'],
    mutationFn: async (variables: { paymentId: string }) => {
      const response = await client.commerce.updateCart.mutate({
        id: cartId ?? '',
        locale,
        currency,
        actions: [
          {
            action: 'addPayment',
            payment: {
              id: variables.paymentId,
            },
          },
        ],
      })
      await refetch()
    },
  })

  /**
   * Add Cart Item Mutation
   */
  const addCartItem = useMutation({
    mutationKey: ['addCartItem'],
    mutationFn: async (params: {
      productId: string
      variantId?: string
      quantity?: number
    }) => {
      let _id = cartId ?? ''

      if (!cartId) {
        const cartRes = await client.commerce.createCart.mutate({
          currency,
          locale,
        })

        _id = cartRes?.id ?? ''
      }

      const response = await client.commerce.updateCart.mutate({
        id: _id,
        locale,
        currency,
        actions: [
          {
            action: 'addLineItem',
            productId: params.productId,
            variantId: params.variantId?.toString(),
            quantity: params.quantity,
          },
        ],
      })

      analyticsTrackAddToCart({
        productId: params.productId,
        quantity: params.quantity ?? 1,
        nextCart: response ?? undefined,
        prevCart: cart ?? undefined,
      })
      await refetch()
    },
  })

  /**
   * Update Cart Item Mutation
   */
  const updateCartItem = useMutation({
    mutationKey: ['updateCartItem'],
    mutationFn: async (params: {
      lineItemId: string
      quantity: number
      variantId: string
    }) => {
      const { lineItemId, quantity, variantId } = params

      const response = await client.commerce.updateCart.mutate({
        id: cartId ?? '',
        locale,
        currency,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
            variantId,
          },
        ],
      })

      analyticsTrackUpdateCart({
        lineItemId,
        quantity,
        nextCart: response ?? undefined,
        prevCart: cart ?? undefined,
      })
      await refetch()
    },
  })

  /**
   * Delete Cart Item Mutation
   */
  const deleteCartItem = useMutation({
    mutationKey: ['deleteCartItem'],
    mutationFn: async (params: { lineItemId: string }) => {
      const { lineItemId } = params
      const productId = cart?.items.find(
        (p) => p.itemId === lineItemId
      )?.productId

      const response = await client.commerce.updateCart.mutate({
        id: cartId ?? '',
        locale,
        currency,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
          },
        ],
      })

      /**
       * The cart might still have other products with same id, but a different variant
       * (variants share the same product id).
       *
       * Only clear the product from the cache, if there are no variants left.
       */
      const productIsStillInCart = Boolean(
        response.items.find((p) => p.productId === productId)
      )
      if (!productIsStillInCart) {
        queryProductCache.remove({ objectID: productId! })
      }

      analyticsTrackRemoveFromCart({
        lineItemId,
        prevCart: cart ?? undefined,
        quantity:
          cart?.items?.find((item) => item.itemId === lineItemId)?.quantity ??
          undefined,
      })
      await refetch()
    },
  })

  /**
   * Update Cart Mutation
   */
  const updateCart = useMutation({
    mutationKey: ['updateCart'],
    mutationFn: async (params: { actions: UpdateCartAction[] }) => {
      const response = await client.commerce.updateCart.mutate({
        id: cartId ?? '',
        actions: params.actions,
        locale,
        currency,
      })
      await refetch()
    },
  })

  /**
   * Cart data
   */
  const cartData = useMemo(() => {
    return {
      ...cart,
      isLoading,
      isError,
      isEmpty: !cart?.items.length,
      quantity: cart?.items.length ?? 0,
    }
  }, [cart])

  /**
   * Delete Cart Handler
   */
  const deleteCart = useCallback(async () => {
    const cartKey = getQueryKey(
      api.commerce.getCart,
      {
        locale,
        currency,
        cartId: localStorage?.getItem('cartId') ?? undefined,
      },
      'query'
    )
    queryClient.setQueryData(cartKey, () => null)
  }, [locale, currency])

  /**
   * Public
   */
  return {
    addCartItem,
    updateCartItem,
    deleteCartItem,
    addCartPayment,
    updateCart,
    applyCode,
    removeCode,
    cart: cartData,
    deleteCart,
    refetch: () => {
      refetch()
    }, // exporting refetch directly breaks type inferrence
  }
}
