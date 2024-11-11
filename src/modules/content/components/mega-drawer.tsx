'use client'

import { Accordion, AccordionItem } from '@chakra-ui/react'
import {
  PREFETCH_CHILD_NAV_LINKS,
  PREFETCH_TOP_NAV_LINKS,
  useComposable,
} from '@modules/general'
import { ComposableSiteConfig } from '@oriuminc/base'
import { ComposableMegaMenu } from '@oriuminc/cms-generic'
import {
  MegaDrawerItem,
  MegaDrawerItemProps,
  MegaMenuItemProps,
  MegaDrawer as UiMegaDrawer,
} from '@oriuminc/ui'
import { composableMegaMenuItemToMegaMenuItemProps } from '../utils'

export const MegaDrawer = ({
  megaMenu,
  siteConfig,
}: {
  megaMenu: ComposableMegaMenu | null
  siteConfig: ComposableSiteConfig | null
}) => {
  const { megaDrawer } = useComposable()

  const createDrawerItemData = (item: MegaMenuItemProps, onClose: () => void) =>
    ({
      ...item,
      parentLabel: item.label,
      closeAll: onClose,
      isFirstChild: true,
    } as MegaDrawerItemProps)

  return (
    <UiMegaDrawer
      isOpen={megaDrawer.isOpen}
      onClose={megaDrawer.onClose}
      brandLogoUrl={siteConfig?.brandLogo?.url}
      siteName={siteConfig?.name}
    >
      <Accordion variant='megaDrawer'>
        {megaMenu?.items?.map((item, idx) => {
          if (!item) return null
          const itemData = createDrawerItemData(
            composableMegaMenuItemToMegaMenuItemProps(item),
            megaDrawer.onClose
          )
          return (
            <AccordionItem key={itemData.id}>
              <MegaDrawerItem
                key={`${itemData.id}_item_${idx}`}
                itemData={itemData}
                prefetchTopLevelNavs={PREFETCH_TOP_NAV_LINKS}
                prefetchChildNavs={PREFETCH_CHILD_NAV_LINKS}
              />
            </AccordionItem>
          )
        })}
      </Accordion>{' '}
    </UiMegaDrawer>
  )
}
