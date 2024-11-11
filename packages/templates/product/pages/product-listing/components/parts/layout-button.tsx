import { IconButton } from '@chakra-ui/react'
import { GridLayoutOption, useGridLayout } from '@oriuminc/base'

export const LayoutButton = ({
  layout,
  icon,
}: {
  layout: GridLayoutOption
  icon: React.ReactElement
}) => {
  const { currentLayout, changeLayout, showLayoutControl } = useGridLayout()
  return (
    <IconButton
      display={showLayoutControl(layout) ? 'flex' : 'none'}
      aria-label={layout}
      fontSize='xl'
      icon={icon}
      onClick={() => changeLayout(layout)}
      opacity={currentLayout === layout ? 1 : 0.4}
      mx='1'
      color='text'
      variant='ghost'
    />
  )
}
