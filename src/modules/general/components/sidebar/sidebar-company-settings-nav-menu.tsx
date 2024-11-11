'use client'

import { Box, Text, VStack, useToken } from '@chakra-ui/react'
import { useComposable } from '@oriuminc/base'
import { IoHomeOutline, IoPersonOutline } from 'react-icons/io5'
import { useIntl } from 'react-intl'
import { SidebarItem } from './sidebar-item'

interface SideBarSettingNavMenuProps {
  activeItem?: MenuItemProps
}

export interface MenuItemProps {
  path: string
  label: string
  intlId: string
  otherProps?: Record<string, any>
}

export const menuItems: MenuItemProps[] = [
  {
    path: 'company-management',
    label: 'Company Management',
    intlId: 'management.dashboard.menu.companyManagement',
  },
  {
    path: 'profile',
    label: 'Profile & Preferences',
    intlId: 'account.dashboard.menu.profileAndPreferences',
  },
]

export const getIcon = (itemPath: string, size: string) => {
  switch (itemPath) {
    case 'company-management':
      return <IoHomeOutline size={size} />
    case 'profile':
      return <IoPersonOutline size={size} />
    default:
      return undefined
  }
}

export const SideBarCompanySettingNavMenu = ({
  activeItem,
}: SideBarSettingNavMenuProps) => {
  const { accountDrawer, path } = useComposable()
  const intl = useIntl()
  const [size2, size4, size3, size6, size10] = useToken('sizes', [
    'sizes.2',
    'sizes.3',
    'sizes.4',
    'sizes.6',
    'sizes.10',
  ])

  return (
    <VStack spacing='0' gap='2'>
      <Box py='2' px='none' alignSelf='flex-start'>
        <Text
          textStyle='eyebrow-50'
          color='text-muted'
          display={{ base: 'initial', md: 'none' }}
        >
          Settings
        </Text>
      </Box>

      {menuItems.map((item) => (
        <SidebarItem
          key={`${item.path}`}
          label={intl.formatMessage({ id: item.intlId })}
          href={path.getManagementDashboard({ page: item.path })}
          state={item.path === activeItem?.path ? 'Active' : 'Default'}
          rootProps={{
            leftIcon: getIcon(item.path, size6),
            height: { base: `${size10} !important`, md: `${size3} !important` },
            size: { base: 'sm', md: 'lg' },
            padding: {
              base: `${size4} 0 !important}`,
              md: `${size4} ${size2} !important}`,
            },
            onClick: () => {
              accountDrawer.onClose()
            },
            ...(item.otherProps ?? {}),
          }}
        />
      ))}
    </VStack>
  )
}
