import { createTRPCRouter } from '@modules/server/api/trpc'
import * as procedures from './procedures'

export const commerceRouter = createTRPCRouter(procedures)
