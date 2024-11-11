import { Button } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface CheckoutStepLinksProps {
  title: string
  isAllowed: boolean
  active: boolean
  onClick?: () => void
}

export const CheckoutStepLink = ({
  isAllowed,
  active,
  title,
  onClick,
}: CheckoutStepLinksProps) => {
  const intl = useIntl()

  return (
    <Button
      borderBottom={active ? 0.5 : 'none'}
      borderRadius='none'
      color={active ? 'primary' : 'text-muted'}
      fontWeight={active ? 'bold' : 'regular'}
      disabled={!isAllowed}
      fontSize={{ base: 'xs', md: 'sm' }}
      tabIndex={isAllowed ? 0 : -1}
      arial-label={intl.formatMessage(
        { id: 'checkout.step.ariaTitle' },
        { title: title }
      )}
      onClick={() => isAllowed && onClick !== undefined && onClick()}
      p={{ base: 2.5, md: 5 }}
      textDecoration='none'
      variant='link'
      _hover={{
        textDecoration: 'none',
      }}
    >
      {title}
    </Button>
  )
}
