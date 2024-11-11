'use client'

import { VStack, Text, Box, useToken } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import {
  IoCardOutline,
  IoHeartOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoTimeOutline,
} from 'react-icons/io5'
import { useComposable } from '@oriuminc/base'
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
    path: 'profile',
    label: 'Profile & Preferences',
    intlId: 'account.dashboard.menu.profileAndPreferences',
  },
  {
    path: 'address',
    label: 'Saved Addresses',
    intlId: 'account.dashboard.menu.savedAddresses',
  },
  {
    path: 'payment',
    label: 'Payment Methods',
    intlId: 'account.dashboard.menu.paymentMethod',
  },
  {
    path: 'wishlist',
    label: 'Wishlist',
    intlId: 'account.dashboard.menu.wishlist',
  },
  {
    path: 'order',
    label: 'Order History',
    intlId: 'account.dashboard.menu.orderHistory',
    otherProps: {
      borderBottom: 'none',
    },
  },
]

export const getIcon = (itemPath: string) => {
  const [size6] = useToken('sizes', ['sizes.6'])

  switch (itemPath) {
    case 'profile':
      return <IoPersonOutline size={size6} />
    case 'address':
      return <IoHomeOutline size={size6} />
    case 'payment':
      return <IoCardOutline size={size6} />
    case 'wishlist':
      return <IoHeartOutline size={size6} />
    case 'order':
      return <IoTimeOutline size={size6} />
    default:
      return undefined
  }
}

export const SideBarNavMenu = ({ activeItem }: SideBarNavMenuProps) => {
  const { accountDrawer, path } = useComposable()
  const intl = useIntl()
  const [size2, size4, size10, size14] = useToken('sizes', [
    'sizes.2',
    'sizes.4',
    'sizes.10',
    'sizes.14',
  ])

  return (
    <VStack spacing='0' gap='1'>
      <Box py='2' px='none' alignSelf='flex-start'>
        <Text
          textStyle='eyebrow-50'
          color='text-muted'
          display={{ base: 'initial', md: 'none' }}
        >
          {intl.formatMessage({ id: 'account.dashboard.account' })}
        </Text>
      </Box>

      {menuItems.map((item) => (
        <SidebarItem
          key={`${item.path}`}
          label={intl.formatMessage({ id: item.intlId })}
          href={path.getAccountDashboard({ page: item.path })}
          state={item.path === activeItem?.path ? 'Active' : 'Default'}
          rootProps={{
            leftIcon: getIcon(item.path),
            height: {
              base: `${size10} !important`,
              md: `${size14} !important`,
            },
            size: { base: 'sm', md: 'lg' },
            padding: {
              base: `${size4} 0 !important`,
              md: `${size4} ${size2} !important`,
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
