'use client'

import { Box, Text, VStack, useToken } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export const ContactUs = ({ children }: { children?: React.ReactNode }) => {
  const intl = useIntl()
  const [sizeNone, size3, size4] = useToken('sizes', [
    'sizes.none',
    'sizes.3',
    'sizes.4',
  ])

  return (
    <Box paddingTop={{ base: 'none', md: 6 }}>
      <VStack
        align='flex-start'
        border={{ base: 'none', md: 'sm' }}
        padding={{ base: `${size3} ${sizeNone}`, md: 6 }}
        spacing='none'
        gap='none'
        alignItems='stretch'
      >
        <Box padding={`${size4} ${sizeNone}`}>
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
