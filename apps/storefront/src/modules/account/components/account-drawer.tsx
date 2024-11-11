'use client'

import {
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  VStack,
  Show,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'

import { useUser } from '@modules/commerce'
import { SidebarNav, useComposable, useHandleError } from '@modules/general'
import { useAlgoliaInsights } from '@oriuminc/algolia'
import { LoginForm, ForgotPasswordForm, RegisterForm } from '@modules/account'

import { useState } from 'react'

export enum AccountPageType {
  PAGE = 'page',
  DRAWER = 'drawer',
}

export type AccountFormTypes = 'login' | 'forgot_password' | 'create_account'

export const AccountDrawer = () => {
  const { logout, customer } = useUser()
  const { accountDrawer, path } = useComposable()
  const { queryProductCache } = useAlgoliaInsights()
  const [accountFormToShow, setAccountFormToShow] =
    useState<AccountFormTypes>('login')
  const intl = useIntl()
  const { createHandleError } = useHandleError()

  const handleLogout = () => {
    logout.mutate(
      {
        callbackUrl: path.getHome(),
      },
      {
        onSuccess: () => {
          accountDrawer.onClose()
          queryProductCache.clear()

          // remove cartId from local storage if exists (Currently only for Shopify)
          localStorage?.removeItem('cartId')
        },
        onError: createHandleError(),
      }
    )
  }

  return (
    <Drawer
      isOpen={accountDrawer.isOpen}
      onClose={accountDrawer.onClose}
      placement='right'
      size='md'
    >
      <DrawerOverlay />
      {customer ? (
        <DrawerContent
          // TODO: Replace token value with token.
          maxW='550px'
          p='none'
        >
          <DrawerHeader
            minH='12'
            py='2'
            px='3'
            display='flex'
            borderBottom={{
              base: 'sm',
              md: 'none',
            }}
          >
            <DrawerCloseButton
              size='md'
              fontSize='sm'
              left={{ base: 'initial', md: '2.5' }}
            />
            <Center w='full' display={{ base: 'flex', md: 'none' }}>
              <Text textStyle='desktop-200'>
                {intl.formatMessage({ id: 'account.dashboard.title' })}
              </Text>
            </Center>
          </DrawerHeader>
          <DrawerBody pt='6' pb={{ base: 6, md: 16 }} px={{ base: 4, md: 16 }}>
            {/* Desktop */}
            <VStack
              align='stretch'
              spacing='none'
              display={{ base: 'none', md: 'flex' }}
            >
              <SidebarNav size='Large' logout={handleLogout} />
            </VStack>
            {/* Mobile */}
            <VStack
              align='stretch'
              spacing='none'
              display={{ base: 'flex', md: 'none' }}
            >
              <SidebarNav size='Small' logout={handleLogout} />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      ) : (
        <DrawerContent
          // TODO: Replace token value with token.
          maxW='550px'
          p='none'
        >
          <DrawerHeader
            minH='12'
            py='2'
            px='3'
            display='flex'
            borderBottom={{
              base: 'sm',
              md: 'none',
            }}
          >
            <DrawerCloseButton
              size='md'
              fontSize='sm'
              left={{ base: 'initial', md: '2.5' }}
            />
            <Show below='md'>
              <Text
                as='h2'
                textAlign='center'
                textStyle={{ base: 'mobile-200', md: 'mobile-300' }}
              >
                {intl.formatMessage({ id: 'account.login.title' })}
              </Text>
            </Show>
          </DrawerHeader>
          <DrawerBody pt='6' pb={{ base: 6, md: 16 }} px={{ base: 4, md: 16 }}>
            {accountFormToShow === 'login' && (
              <LoginForm
                type={AccountPageType.DRAWER}
                setAccountFormToShow={setAccountFormToShow}
              />
            )}
            {accountFormToShow === 'forgot_password' && (
              <ForgotPasswordForm type={AccountPageType.DRAWER} />
            )}
            {accountFormToShow === 'create_account' && (
              <RegisterForm
                setAccountFormToShow={setAccountFormToShow}
                type={AccountPageType.DRAWER}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      )}
    </Drawer>
  )
}
