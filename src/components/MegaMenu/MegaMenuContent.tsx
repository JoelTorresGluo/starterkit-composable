import { LinkProps } from '@chakra-ui/react'
import { MegaMenuContentColumns } from './MegaMenuContentColumns'
import { MegaMenuContentThumbnails } from './MegaMenuContentThumbnails'
import { MegaMenuItemProps } from './MegaMenuItem'

interface MegaMenuContentProps {
  variant?: string
  data?: (MegaMenuItemProps | null | undefined)[]
  linkProps: LinkProps
  prefetchChildNavs: boolean | undefined
}

export const MegaMenuContent = ({
  variant,
  data,
  linkProps,
  prefetchChildNavs,
}: MegaMenuContentProps) => {
  if (variant === 'boxes') {
    return (
      <MegaMenuContentThumbnails
        data={data}
        linkProps={linkProps}
        prefetchChildNavs={prefetchChildNavs}
      />
    )
  }

  if (variant === 'columns') {
    return (
      <MegaMenuContentColumns
        data={data}
        linkProps={linkProps}
        prefetchChildNavs={prefetchChildNavs}
      />
    )
  }

  return null
}
