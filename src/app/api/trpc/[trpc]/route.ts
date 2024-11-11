import { PROD_SERVER_ERROR_MESSAGE_ID, logger } from '@modules/general'
import { appRouter } from '@modules/server/api/root'
import { createTRPCContext } from '@modules/server/api/trpc'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { type NextRequest } from 'next/server'

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  const ip = req.headers.get('x-forwarded-for')

  return createTRPCContext({ ip: ip ?? undefined })
}

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext(req),
    onError: (opts) => {
      const { error, path, input } = opts
      const inputStringified = JSON.stringify(input)
      logger.error(
        `❌ tRPC failed on ${
          path ?? '<no-path>'
        }. Input: ${inputStringified}. Error: ${error.message}`
      )
      if (process.env.NODE_ENV === 'production') {
        //Override error message for production, to avoid leaking potentially sensitive information to the browser
        error.message = PROD_SERVER_ERROR_MESSAGE_ID

        /**
         * Implement your log sink in sendErrorToLogSink
         * logger.sendErrorToLogSink(opts)
         */
      }
    },
  })

export { handler as GET, handler as POST }
