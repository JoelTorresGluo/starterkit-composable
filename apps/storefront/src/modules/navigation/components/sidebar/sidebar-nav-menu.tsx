import { VStack, Text, Box } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import {
  IoCardOutline,
  IoHeartOutline,
  IoHomeOutline,
  IoPersonOutline,
  IoTimeOutline,
} from 'react-icons/io5'
import { SidebarItem } from './sidebar-item'
import { useComposable } from '@modules/general'

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
  switch (itemPath) {
    case 'profile':
      return <IoPersonOutline size={20} />
    case 'address':
      return <IoHomeOutline size={20} />
    case 'payment':
      return <IoCardOutline size={20} />
    case 'wishlist':
      return <IoHeartOutline size={20} />
    case 'order':
      return <IoTimeOutline size={20} />
    default:
      return undefined
  }
}

export const SideBarNavMenu = ({ activeItem }: SideBarNavMenuProps) => {
  const { accountDrawer, path } = useComposable()
  const intl = useIntl()

  return (
    <VStack
      spacing='0'
      // TODO: Replace pixel values with tokens.
      gap='3px'
    >
      <Box py='2' alignSelf='flex-start'>
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
            // TODO: Replace pixel values with tokens.
            height: { base: '41px !important', md: '53px !important' },
            size: { base: 'sm', md: 'lg' },
            padding: { base: '16px 0 !important', md: '16px 8px !important' },
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
