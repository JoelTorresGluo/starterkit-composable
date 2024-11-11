'use client'

import { Box, Container, Stack, useToken } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { AccountDashboardNav } from '@modules/account'

import { useUser } from '@modules/commerce'
import { useAuthGuard, useComposable, useHandleError } from '@modules/general'
import { AccountLoadingState } from '@oriuminc/ui'

export interface AccountDashboardPageLayout {
  children: React.ReactElement
}

export const AccountDashboardPageLayout = ({
  children,
}: AccountDashboardPageLayout) => {
  const { isLoading } = useAuthGuard()
  const { createHandleError } = useHandleError()
  const { logout } = useUser()
  const { path } = useComposable()
  const contentRef = useRef(null)
  const [size3, size4, size6, size8, size12, size16] = useToken('sizes', [
    'sizes.3',
    'sizes.4',
    'sizes.6',
    'sizes.8',
    'sizes.12',
    'sizes.16',
  ])
  const handleLogout = () => {
    logout.mutate(
      {
        callbackUrl: path.getHome(),
      },
      {
        onError: createHandleError(),
        onSuccess: () => {
          localStorage.removeItem('cartId')
        },
      }
    )
  }

  if (isLoading) {
    return <AccountLoadingState />
  }

  return (
    <Container maxW='container.2xl'>
      <Stack spacing='none' direction={{ base: 'column', md: 'row' }} w='full'>
        <Box
          minW={{ base: 'full', md: '300px', lg: '395px' }}
          p={{
            base: 'none',
            md: `${size12} ${size3} ${size16} ${size8}`,
            lg: `${size12} ${size3} ${size16} ${size12}`,
          }}
        >
          <AccountDashboardNav logout={handleLogout} contentRef={contentRef} />
        </Box>
        <Box
          w='full'
          p={{
            base: `${size12} ${size4}`,
            md: `${size12} ${size8} ${size16} ${size6}`,
            lg: `${size12} ${size12} ${size16} ${size6}`,
          }}
          overflow='auto'
          ref={contentRef}
          tabIndex={-1}
          m='none'
        >
          {children}
        </Box>
      </Stack>
    </Container>
  )
}
