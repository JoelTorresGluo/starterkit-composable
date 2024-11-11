import { Accordion, AccordionItem } from '@chakra-ui/react'
import { useContentfulMegaMenu } from '../../hooks'
import { useComposable } from '@oriuminc/base'
import {
  MegaDrawer as UiMegaDrawer,
  MegaDrawerItemProps,
  MegaDrawerItem,
  MegaMenuItemProps,
} from '@oriuminc/ui'
import { formatMegaMenuItem } from '../../utils'

export const MegaDrawer = (props: { megaMenuId: string }) => {
  const { siteConfig, megaDrawer } = useComposable()
  const { data } = useContentfulMegaMenu(props.megaMenuId)

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
      <Accordion allowToggle>
        {data?.items.map((item) => {
          if (!item) return null

          const itemData = createDrawerItemData(
            formatMegaMenuItem(item),
            megaDrawer.onClose
          )
          return (
            <AccordionItem key={itemData.id}>
              <MegaDrawerItem key={`${itemData.id}_item`} itemData={itemData} />
            </AccordionItem>
          )
        })}
      </Accordion>
    </UiMegaDrawer>
  )
}
