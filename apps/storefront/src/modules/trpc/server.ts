import 'server-only'

import { createCaller, type AppRouter } from '@modules/server/api/root'
import { createTRPCContext } from '@modules/server/api/trpc'
import { QueryClient } from '@tanstack/react-query'
import { createHydrationHelpers } from '@trpc/react-query/rsc'
import { cache } from 'react'
import { createQueryClient } from './query-client'
import { logger } from '@modules/general'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache((isStatic?: boolean) => {
  return createTRPCContext({ staticContext: isStatic })
})

const getQueryClient = cache(createQueryClient)

/**
 * dynamicCaller is currently not used on the Storefront, but it's here as an example of how to create a caller
 * for use in a React Server Component that relies on dynamic data, like the headers or cookies. Once Partial Prerendering
 * is production ready, dynamicCaller will be used on React Server Components like Cart, Price, Inventory, and Add To Cart Button.
 *
 */
const dynamicCaller = createCaller(createContext, {
  onError: ({ error, path, input }) => {
    const inputStringified = JSON.stringify(input)
    logger.error(
      `❌ tRPC dynamicCaller failed on ${
        path ?? '<no-path>'
      }. Input: ${inputStringified}. Error: ${error.message}`
    )
  },
})

export const serverQueryClient: QueryClient = getQueryClient()

export const { trpc: dynamicApi } = createHydrationHelpers<AppRouter>(
  dynamicCaller,
  () => serverQueryClient
)

const staticCaller = createCaller(() => createContext(true), {
  onError: ({ error, path, input }) => {
    const inputStringified = JSON.stringify(input)
    logger.error(
      `❌ tRPC staticCaller failed on ${
        path ?? '<no-path>'
      }. Input: ${inputStringified}. Error: ${error.message}`
    )
  },
})

export const { trpc: staticApi } = createHydrationHelpers<AppRouter>(
  staticCaller,
  () => serverQueryClient
)
