'use client'

import { Text, VStack } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { SidebarLogout } from './sidebar-logout'
import {
  SidebarNavContactUs,
  ContactUsItemProps,
} from './sidebar-nav-contact-us'
import { SideBarNavMenu, MenuItemProps } from './sidebar-nav-menu'

interface SidebarNavProps {
  activeItem?: ContactUsItemProps | MenuItemProps
  logout: () => void
  size: 'Small' | 'Large'
  state?: 'Expanded' | 'Collapsed'
}

export const SidebarNav = ({
  activeItem,
  logout,
  size,
  state = 'Expanded',
}: SidebarNavProps) => {
  const intl = useIntl()
  if (state !== 'Expanded') return <></>

  return (
    <>
      {size === 'Small' && (
        <>
          <SideBarNavMenu activeItem={activeItem} />
          <SidebarNavContactUs activeItem={activeItem} />
          <SidebarLogout onClick={logout} />
        </>
      )}
      {size === 'Large' && (
        <>
          <Text as='h1' textStyle='desktop-200' h={6}>
            {intl.formatMessage({ id: 'account.dashboard.title' })}
          </Text>
          <VStack spacing='0' w='full' alignItems='stretch'>
            <SideBarNavMenu activeItem={activeItem} />
            <SidebarLogout onClick={logout} />
            <SidebarNavContactUs activeItem={activeItem} />
          </VStack>
        </>
      )}
    </>
  )
}
