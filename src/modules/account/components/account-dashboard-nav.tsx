'use client'

import { VStack } from '@chakra-ui/react'
import {
  SidebarAccordion,
  SidebarNav,
  contactUsItems,
  getContactUsIcon,
  getIcon,
  menuItems,
} from '@modules/navigation'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

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
  const intl = useIntl()
  const pathname = usePathname()

  const activePath = useMemo(() => {
    return pathname.split(DEFAULT_ACCOUNT_DASHBOARD_PATH).slice(-1)?.[0]
  }, [pathname])

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
        width='full'
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
        width='full'
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
