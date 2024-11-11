import { useIntl } from 'react-intl'
import { useToast } from '@oriuminc/ui'

export const useHandleError = () => {
  const { formatMessage } = useIntl()
  const toast = useToast()

  const handleError = (e: unknown, next: () => any) => {
    const error = e as Error
    const message = error.message
      ? formatMessage({ id: error.message })
      : 'An unexpected error has occurred.'
    toast({
      status: 'error',
      description: message,
    })
  }

  //allow passing of custom next function to be called after displaying the error from the onError handlers
  const createHandleError = (next: () => any = () => {}) => {
    return (e: unknown) => {
      handleError(e, next)
    }
  }

  return { createHandleError }
}
