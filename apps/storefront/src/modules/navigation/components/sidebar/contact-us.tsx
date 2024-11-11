import { Box, Text, VStack } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export const ContactUs = ({ children }: { children?: React.ReactNode }) => {
  const intl = useIntl()

  return (
    <Box pt={{ base: 0, md: 6 }}>
      <VStack
        align='flex-start'
        border={{ base: 'none', md: 'sm' }}
        borderColor={{ md: '#E2E2E2' }}
        py={{ base: 3, md: 6 }}
        px={{ base: 0, md: 6 }}
        spacing='0'
        gap='0'
        alignItems='stretch'
      >
        <Box py='4' px='0'>
          <Text
            as='h2'
            textStyle={{ base: 'eyebrow-50', md: 'desktop-200' }}
            color={{ base: 'text-muted', md: 'text' }}
          >
            {intl.formatMessage({ id: 'account.support.needHelp' })}
          </Text>
          <Text
            textStyle='blockquote-100'
            color='text-muted'
            display={{ base: 'none', md: 'flex' }}
          >
            {intl.formatMessage({ id: 'account.support.contactUs' })}
          </Text>
        </Box>

        <VStack spacing='0' gap='1'>
          {children}
        </VStack>
      </VStack>
    </Box>
  )
}
