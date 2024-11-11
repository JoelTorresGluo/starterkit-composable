'use client'

import { VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState, useEffect, useMemo } from 'react'
import { useIntl } from 'react-intl'
import {
  contactUsItems,
  menuItems,
  SidebarAccordion,
  SidebarNav,
  getContactUsIcon,
  getIcon,
} from '../../navigation'

export interface AccountDashboardNavProps {
  state?: 'Expanded' | 'Collapsed'
  contentRef?: React.RefObject<HTMLDivElement>
  logout: () => void
}

const DEFAULT_ACCOUNT_DASHBOARD_PATH = '/account/dashboard'

const getActiveItemData = (pathName: string) => {
  return (
    contactUsItems.find((item) => pathName.includes(item.path)) ??
    menuItems.find((item) => pathName.includes(item.path))
  )
}

export const AccountDashboardNav = ({
  state = 'Collapsed',
  contentRef,
  logout,
}: AccountDashboardNavProps) => {
  const router = useRouter()
  const intl = useIntl()

  const activePath = useMemo(() => {
    return router.pathname.split(DEFAULT_ACCOUNT_DASHBOARD_PATH).slice(-1)?.[0]
  }, [router.pathname])

  const initialActiveItem = useMemo(
    () => getActiveItemData(activePath),
    [activePath]
  )

  const [activeItem, setActiveItem] = useState(initialActiveItem)

  useEffect(() => {
    setActiveItem(getActiveItemData(activePath))
    contentRef?.current?.focus()
  }, [activePath])

  return (
    <>
      {/* Desktop */}
      <VStack
        spacing='0'
        w='full'
        alignItems='stretch'
        display={{ base: 'none', md: 'flex' }}
      >
        <SidebarNav
          size='Large'
          logout={() => logout()}
          activeItem={activeItem}
        />
      </VStack>

      {/* Mobile */}
      <VStack
        spacing='0'
        w='full'
        alignItems='stretch'
        display={{ base: 'flex', md: 'none' }}
      >
        <SidebarAccordion
          expanded={state === 'Expanded'}
          icon={
            getContactUsIcon(activeItem?.path ?? '') ||
            getIcon(activeItem?.path ?? '')
          }
          label={intl.formatMessage({ id: activeItem?.intlId ?? 'order' })}
        >
          <SidebarNav
            size='Small'
            logout={() => logout()}
            activeItem={activeItem}
          />
        </SidebarAccordion>
      </VStack>
    </>
  )
}
