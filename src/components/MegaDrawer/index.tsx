import dynamic from 'next/dynamic'

const DynamicMegaDrawer = dynamic(() =>
  import('./MegaDrawer').then((el) => el.MegaDrawer)
)

export const MegaDrawer = (props: { megaMenuId: string }) => {
  return <DynamicMegaDrawer megaMenuId={props.megaMenuId} />
}
