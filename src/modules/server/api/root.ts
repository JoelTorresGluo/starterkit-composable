import { cmsRouter } from '@modules/server/api/routers/cms/cms-router'
import { commerceRouter } from '@modules/server/api/routers/commerce/commerce-router'
import { stripeRouter } from '@modules/server/api/routers/stripe/stripe-router'
import { createCallerFactory, createTRPCRouter } from '@modules/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  cms: cmsRouter,
  commerce: commerceRouter,
  stripe: stripeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter)
