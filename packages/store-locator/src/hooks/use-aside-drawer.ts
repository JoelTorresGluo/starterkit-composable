import { useAtom } from 'jotai'
import { asideDrawerAtom } from '../_data'

export const useAsideDrawer = () => {
  const [isOpen, setOpen] = useAtom(asideDrawerAtom)

  return {
    isOpen,
    setOpen,
  }
}
