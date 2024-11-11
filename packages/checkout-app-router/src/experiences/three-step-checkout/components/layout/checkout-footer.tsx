import { Container, Flex } from '@chakra-ui/react'
import { CopyrightFooter } from '@oriuminc/ui'
import { useIntl } from 'react-intl'

export const CheckoutFooter = () => {
  const intl = useIntl()
  return (
    <Flex
      as='footer'
      id='site-footer'
      role='contentinfo'
      tabIndex={-1}
      bg='background'
      color='text'
    >
      <Container maxW='container.2xl' px='4'>
        <CopyrightFooter
          copyrightText={intl.formatMessage(
            { id: 'footer.info.copyright' },
            { year: new Date().getFullYear() }
          )}
        />
      </Container>
    </Flex>
  )
}
