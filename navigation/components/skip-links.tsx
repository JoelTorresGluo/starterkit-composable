'use client'

import { SkipLinks as UiSkipLinks } from '@oriuminc/ui'
import { useIntl } from 'react-intl'

export const SkipLinks = () => {
  const intl = useIntl()

  const skipList = [
    {
      href: '#mega-menu',
      label: intl.formatMessage({ id: 'skipNav.mainMenu' }),
    },
    {
      href: '#my-shopping-bag',
      label: intl.formatMessage({ id: 'skipNav.myShoppingBag' }),
    },
    {
      href: '#main',
      label: intl.formatMessage({ id: 'skipNav.mainContent' }),
    },
    {
      href: '#site-footer',
      label: intl.formatMessage({ id: 'skipNav.footerLinks' }),
    },
  ]

  return <UiSkipLinks skipToList={skipList} />
}
