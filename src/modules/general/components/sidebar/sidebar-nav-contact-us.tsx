'use client'

import { useIntl } from 'react-intl'
import { useToken } from '@chakra-ui/react'

import {
  IoHelpBuoyOutline,
  IoHelpCircleOutline,
  IoRefreshOutline,
} from 'react-icons/io5'
import { useComposable } from '@modules/general'
import { SidebarItem } from './sidebar-item'
import { ContactUs } from './contact-us'

interface SidebarNavContactUsProps {
  activeItem?: ContactUsItemProps
}

export interface ContactUsItemProps {
  path: string
  label: string
  intlId: string
}

export const contactUsItems: ContactUsItemProps[] = [
  {
    path: 'support',
    label: 'Customer Support',
    intlId: 'account.dashboard.menu.customerSupport',
  },
  {
    path: 'shipping-and-return',
    label: 'Shipping & Return Policy',
    intlId: 'account.dashboard.menu.shippingAndReturn',
  },
  {
    path: 'faq',
    label: 'FAQs',
    intlId: 'account.dashboard.menu.faq',
  },
]

export const getContactUsIcon = (itemPath: string, size: string) => {
  switch (itemPath) {
    case 'support':
      return <IoHelpBuoyOutline size={size} />
    case 'shipping-and-return':
      return <IoRefreshOutline size={size} />
    case 'faq':
      return <IoHelpCircleOutline size={size} />
    default:
      return undefined
  }
}

export const SidebarNavContactUs = ({
  activeItem,
}: SidebarNavContactUsProps) => {
  const { accountDrawer, path } = useComposable()
  const intl = useIntl()
  const [size6] = useToken('sizes', ['sizes.6'])
  return (
    <ContactUs>
      {contactUsItems.map((item, idx) => (
        <SidebarItem
          state={activeItem?.path === item.path ? 'Active' : 'Default'}
          href={path.getAccountDashboard({ page: item.path })}
          key={`${item.path}`}
          label={intl.formatMessage({ id: item.intlId })}
          rootProps={{
            borderBottom: 'none',
            leftIcon: getContactUsIcon(item.path, size6),
            p: 'none',
            onClick: () => {
              accountDrawer.onClose()
            },
          }}
          textProps={{
            textStyle: { base: 'desktop-75' },
          }}
        />
      ))}
    </ContactUs>
  )
}
