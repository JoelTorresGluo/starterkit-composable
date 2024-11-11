import { MegaMenuItemProps } from '@oriuminc/ui'
import { ComposableMegaMenuItem } from '@oriuminc/cms-generic'

export const formatMegaMenuItem = (
  megaMenuItemFields: ComposableMegaMenuItem | null
): MegaMenuItemProps => {
  return {
    id: megaMenuItemFields?.id ?? '',
    label: megaMenuItemFields?.label ?? '',
    href: megaMenuItemFields?.href ?? '',
    variant: megaMenuItemFields?.variant ?? '',
    description: megaMenuItemFields?.description ?? '',
    children: megaMenuItemFields?.children?.map(formatMegaMenuItem) ?? [],
    imageSrc: megaMenuItemFields?.images?.[0]?.url ?? '',
  }
}
