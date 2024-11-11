'use client'

import React, { useState, useEffect } from 'react'
import { Box, useToken } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export function OfflineBanner() {
  const intl = useIntl()
  const [bgColor, fontColor] = useToken('colors', ['info.200', 'info.600'])
  const [isOnline, setIsOnline] = useState(() => {
    return typeof window !== 'undefined' ? window.navigator.onLine : true
  })

  const handleOnline = () => {
    setIsOnline(true)
  }

  const handleOffline = () => {
    setIsOnline(false)
  }

  useEffect(() => {
    // Add event listeners to listen for online and offline events
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) {
    return null
  }

  return (
    <Box bg={bgColor} position='fixed' bottom='0' left='0' w='full' zIndex='9'>
      <Box
        display='flex'
        maxW='container.sm'
        w='full'
        mx='auto'
        alignItems='center'
        justifyContent='center'
        px='3'
        py='5'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='44'
          height='44'
          viewBox='0 0 24 24'
        >
          <path
            fill={fontColor}
            d='m4.281 4.225 14.495 14.496a.75.75 0 1 1-1.06 1.06l-3.785-3.785H6.693A3.687 3.687 0 0 1 3 12.313a3.687 3.687 0 0 1 3.567-3.68L3.22 5.286a.75.75 0 1 1 1.061-1.061ZM12 4.001c3.169 0 4.966 2.097 5.227 4.63h.08A3.687 3.687 0 0 1 21 12.313a3.686 3.686 0 0 1-2.91 3.6l-1.415-1.415h.577c1.261 0 2.284-1.001 2.284-2.236 0-1.235-1.023-2.237-2.284-2.237h-.69c-.365 0-.684-.28-.684-.637 0-2.285-1.806-3.89-3.877-3.89A3.89 3.89 0 0 0 9.039 6.86L7.93 5.752c.884-1.066 2.25-1.751 4.069-1.751Zm.433 10.497L7.838 9.904a.714.714 0 0 1-.399.121h-.69c-1.261 0-2.284 1.002-2.284 2.237s1.023 2.236 2.284 2.236h5.684Z'
          />
        </svg>
        <Box color={fontColor} fontSize='lg' fontWeight='500' pl='3'>
          {intl.formatMessage({
            id: 'app.offline',
          })}
        </Box>
      </Box>
    </Box>
  )
}
