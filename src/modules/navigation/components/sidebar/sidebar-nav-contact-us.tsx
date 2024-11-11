import { useComposable } from '@modules/general'
import {
  IoHelpBuoyOutline,
  IoHelpCircleOutline,
  IoRefreshOutline,
} from 'react-icons/io5'
import { useIntl } from 'react-intl'
import { ContactUs } from './contact-us'
import { SidebarItem } from './sidebar-item'

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

export const getContactUsIcon = (itemPath: string) => {
  switch (itemPath) {
    case 'support':
      return <IoHelpBuoyOutline size='6' />
    case 'shipping-and-return':
      return <IoRefreshOutline size='6' />
    case 'faq':
      return <IoHelpCircleOutline size='6' />
    default:
      return undefined
  }
}

export const SidebarNavContactUs = ({
  activeItem,
}: SidebarNavContactUsProps) => {
  const { accountDrawer, path } = useComposable()
  const intl = useIntl()
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
            leftIcon: getContactUsIcon(item.path),
            padding: '0',
            onClick: () => {
              accountDrawer.onClose()
            },
          }}
          textProps={{
            textStyle: {
              base: 'blockquote-75',
              md: 'blockquote-100',
            },
          }}
        />
      ))}
    </ContactUs>
  )
}
