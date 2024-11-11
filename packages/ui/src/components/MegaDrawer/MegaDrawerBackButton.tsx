import { IconButton } from '@chakra-ui/react'
import { ChevronLeftIcon } from '@chakra-ui/icons'

interface MegaDrawerBackButtonProps {
  onClick: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  parentLabel?: string
}

export const MegaDrawerBackButton = ({
  onClick,
  onKeyDown,
  parentLabel = 'main menu',
}: MegaDrawerBackButtonProps) => {
  return (
    <IconButton
      aria-label={`Return to ${parentLabel}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      icon={<ChevronLeftIcon boxSize='6' aria-hidden='true' />}
      variant='megaDrawer'
    />
  )
}
