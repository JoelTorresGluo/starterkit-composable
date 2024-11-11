'use client'

import { VStack, Text, Box, useToken } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import {
  IoHeartOutline,
  IoHomeOutline,
  IoCartOutline,
  IoCashOutline,
  IoPeopleOutline,
} from 'react-icons/io5'
import { RiDashboardLine } from 'react-icons/ri'
import { useComposable } from '@modules/general'
import { SidebarItem } from './sidebar-item'

interface SideBarNavMenuProps {
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
    path: 'dashboard',
    label: 'Dashboard',
    intlId: 'management.dashboard.menu.dashboard',
  },
  {
    path: 'order',
    label: 'Order',
    intlId: 'management.dashboard.menu.orderHistory',
    otherProps: {
      borderBottom: 'none',
    },
  },
  {
    path: 'quotes',
    label: 'Quotes',
    intlId: 'management.dashboard.menu.quotes',
  },
  {
    path: 'shopping-lists',
    label: 'Shopping Lists',
    intlId: 'management.dashboard.menu.shoppinglists',
  },
  {
    path: 'associates',
    label: 'Associates',
    intlId: 'management.dashboard.menu.associates',
  },
  {
    path: 'address-info',
    label: 'Addresses',
    intlId: 'account.dashboard.menu.addresses',
  },
]

export const getIcon = (itemPath: string, size: string) => {
  switch (itemPath) {
    case 'dashboard':
      return <RiDashboardLine size={size} />
    case 'address-info':
      return <IoHomeOutline size={size} />
    case 'order':
      return <IoCartOutline size={size} />
    case 'quotes':
      return <IoCashOutline size={size} />
    case 'shopping-lists':
      return <IoHeartOutline size={size} />
    case 'associates':
      return <IoPeopleOutline size={size} />
    default:
      return undefined
  }
}

export const SideBarCompanyNavMenu = ({ activeItem }: SideBarNavMenuProps) => {
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
    <VStack spacing='0' gap='1'>
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