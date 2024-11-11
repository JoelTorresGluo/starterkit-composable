import { RefObject } from 'react'
import { Button } from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'

interface MegaMenuButtonProps {
  label: string
  onOpen: () => void
  btnRef: RefObject<HTMLButtonElement>
}

export const MegaDrawerButton = ({
  label,
  onOpen,
  btnRef,
}: MegaMenuButtonProps) => {
  return (
    <Button
      aria-label={`Open ${label} drawer`}
      ref={btnRef}
      onClick={onOpen}
      variant='megaDrawer'
    >
      {label}
      <ChevronRightIcon boxSize='6' aria-hidden='true' />
    </Button>
  )
}
