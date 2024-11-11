import { ComposableMegaMenu } from '@oriuminc/cms-generic'
import { MegaMenuItem, MegaMenu as UiMegaMenu } from '@oriuminc/ui'
import { composableMegaMenuItemToMegaMenuItemProps } from '../utils'
import {
  PREFETCH_CHILD_NAV_LINKS,
  PREFETCH_TOP_NAV_LINKS,
} from '@modules/general'

export interface ExtendedMegaMenuItem {
  id: string
  label: string
  href: string
  variant: string
  description: string
  imageSrc: string
  children: (ExtendedMegaMenuItem | null | undefined)[]
}

export const MegaMenu = async ({
  megaMenu,
}: {
  megaMenu: ComposableMegaMenu | null
}) => {
  return (
    <UiMegaMenu>
      {megaMenu?.items?.map((itemData, idx) => {
        if (!itemData) return null
        return (
          <MegaMenuItem
            key={`${idx}-${itemData.id}`}
            itemData={composableMegaMenuItemToMegaMenuItemProps(itemData)}
            prefetchTopLevelNavs={PREFETCH_TOP_NAV_LINKS}
            prefetchChildNavs={PREFETCH_CHILD_NAV_LINKS}
          />
        )
      })}
    </UiMegaMenu>
  )
}
