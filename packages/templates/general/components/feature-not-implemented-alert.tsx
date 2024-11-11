import { Alert, AlertIcon } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export const FeatureNotImplementedAlert = (props: { label?: string }) => {
  const intl = useIntl()
  return (
    <Alert status='warning'>
      <AlertIcon />
      {props.label ?? intl.formatMessage({ id: 'featureNotImplemented' })}
    </Alert>
  )
}
