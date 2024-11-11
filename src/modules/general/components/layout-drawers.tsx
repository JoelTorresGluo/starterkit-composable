'use client'

import dynamic from 'next/dynamic'
import { useComposable } from '@modules/general'
import { ComposableMegaMenu } from '@oriuminc/cms-generic'
import { ComposableSiteConfig } from '@oriuminc/base'

const DynamicMegaDrawer = dynamic(() =>
  import('@modules/content').then((_module) => _module.MegaDrawer)
)

const DynamicCartDrawer = dynamic(() =>
  import('@modules/cart').then((_module) => _module.CartDrawer)
)

const DynamicAccountDrawer = dynamic(() =>
  import('@modules/account').then((_module) => _module.AccountDrawer)
)

export const LayoutDrawers = (props: {
  megaMenu: ComposableMegaMenu | null
  siteConfig: ComposableSiteConfig | null
}) => {
  const { cartDrawer, accountDrawer, megaDrawer } = useComposable()
  return (
    <>
      {cartDrawer.isOpen && <DynamicCartDrawer />}
      {accountDrawer.isOpen && <DynamicAccountDrawer />}
      {megaDrawer.isOpen && <DynamicMegaDrawer {...props} />}
    </>
  )
}
