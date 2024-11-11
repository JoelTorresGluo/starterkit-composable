import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useToken,
} from '@chakra-ui/react'
import { BrandLogo } from '../BrandLogo'
import { useIntl } from 'react-intl'

interface MegaDrawerProps {
  isOpen: boolean
  onClose: () => void
  brandLogoUrl?: string | null
  siteName?: string | null
  children: React.ReactNode
}

export const MegaDrawer: React.FC<MegaDrawerProps> = ({
  isOpen,
  onClose,
  brandLogoUrl,
  siteName,
  children,
}) => {
  const intl = useIntl()
  const [size6, size12] = useToken('sizes', ['sizes.6', 'sizes.12'])

  return (
    <Drawer
      variant='megaDrawer'
      isOpen={isOpen}
      placement='left'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          variant='megaDrawer'
          aria-label={intl.formatMessage({
            id: 'aria.label.closeMainMenu',
          })}
        />
        <DrawerHeader gridTemplateColumns={`1fr ${size12}`}>
          {brandLogoUrl && (
            <BrandLogo
              src={brandLogoUrl}
              alt={siteName ?? ''}
              // FYI These values have to be in pixels but without the unit
              // for the height/width properties on the img element.
              height='19'
              width='83'
              style={{
                width: 'auto',
                height: size6,
              }}
            />
          )}
        </DrawerHeader>
        <DrawerBody
          as='nav'
          sx={{
            '.chakra-accordion__item:first-of-type': { borderTop: 'none' },
          }}
        >
          {children}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
