import { MegaMenu as UiMegaMenu, MegaMenuItem } from '@oriuminc/ui'
import { useContentfulMegaMenu } from '../../hooks'
import { formatMegaMenuItem } from '../../utils'

export const MegaMenu = (props: { megaMenuId: string }) => {
  const { data } = useContentfulMegaMenu(props.megaMenuId)

  return (
    <UiMegaMenu>
      {data?.items?.map((itemData) => {
        if (!itemData) return null
        return (
          <MegaMenuItem
            key={itemData.id}
            itemData={formatMegaMenuItem(itemData)}
          />
        )
      })}
    </UiMegaMenu>
  )
}
