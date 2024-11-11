import pRetry from 'p-retry'

export async function withRetry<T>(
  action: () => Promise<T>,
  options: {
    retries?: number
    minTimeout?: number
    maxTimeout?: number
  } = { retries: 3, minTimeout: 1000, maxTimeout: 5000 }
): Promise<T> {
  const { retries, minTimeout, maxTimeout } = options
  return pRetry(async () => await action(), {
    retries,
    minTimeout,
    maxTimeout,
  })
}
