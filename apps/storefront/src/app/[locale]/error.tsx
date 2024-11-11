'use client' // Error boundaries must be Client Components

import { ErrorFallback } from '@modules/general'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <ErrorFallback error={error} reset={reset} />
}
