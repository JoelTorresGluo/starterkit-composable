'use server'

import { logger } from '@modules/general/utils/logger'

export const logErrorToServer = async (message: string) => {
  logger.error(message)
}
