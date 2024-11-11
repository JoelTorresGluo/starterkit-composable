'use client'

import { useRef } from 'react'
import NextLink from 'next/link'
import {
  Accordion,
  AccordionItem,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Link as ChakraLink,
  Text,
  useDisclosure,
  useToken,
} from '@chakra-ui/react'
import { MegaDrawerButton } from './MegaDrawerButton'
import { MegaDrawerBackButton } from './MegaDrawerBackButton'
import { useIntl } from 'react-intl'

export interface MegaDrawerItemProps {
  id: string
  label: string
  href: string
  variant: string
  description: string
  imageSrc: string
  closeAll: (isLink?: boolean) => void
  children: (MegaDrawerItemProps | null | undefined)[]
  parentLabel?: string
  isFirstChild?: boolean
}

export const MegaDrawerItem = ({
  itemData,
  prefetchTopLevelNavs,
  prefetchChildNavs,
}: {
  itemData: MegaDrawerItemProps
  prefetchTopLevelNavs?: boolean
  prefetchChildNavs?: boolean
}) => {
  const intl = useIntl()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement>(null)
  const {
    id: itemId,
    label,
    href,
    parentLabel,
    closeAll,
    isFirstChild = false,
    children,
  } = itemData
  const hasChildren = children.length > 0

  const ItemLink = ({
    href,
    closeAll,
    label,
    prefetchTopLevelNavs,
    prefetchChildNavs,
  }: {
    href: string
    closeAll: () => void
    label: string
    prefetchTopLevelNavs?: boolean
    prefetchChildNavs?: boolean
  }) => (
    <ChakraLink
      variant='megaDrawer'
      prefetch={isFirstChild ? prefetchTopLevelNavs : prefetchChildNavs}
      as={NextLink}
      href={href}
      onClick={() => {
        closeAll()
      }}
    >
      {label}
    </ChakraLink>
  )

  const [size12] = useToken('sizes', ['sizes.12'])

  return (
    <>
      {hasChildren ? (
        <>
          <MegaDrawerButton btnRef={btnRef} onOpen={onOpen} label={label} />
          <Drawer
            variant='megaDrawer'
            isOpen={isOpen}
            placement='left'
            onClose={onClose}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader gridTemplateColumns={`${size12} 1fr ${size12}`}>
                <MegaDrawerBackButton
                  onKeyDown={(e: React.KeyboardEvent): void => {
                    if (['Space', 'Enter'].includes(e.code)) {
                      onClose()
                    }
                  }}
                  onClick={onClose}
                  parentLabel={parentLabel}
                />
                <Text
                  textStyle='mobile-200'
                  textAlign='center'
                  id={`drawer-${itemId}`}
                >
                  {label}
                </Text>
                <DrawerCloseButton
                  ml='auto'
                  position='static'
                  onClick={(e) => {
                    e.preventDefault()
                    onClose()
                    // This setTimeout is needed to prevent the drawer from closing too quickly
                    // and causing the parent drawer to close at the same time the child drawer is closing
                    // which causes the lose of focus, I would like to find a better solution for this
                    // but for now this works
                    setTimeout(() => {
                      closeAll()
                    }, 100)
                  }}
                  aria-label={intl.formatMessage({
                    id: 'aria.label.closeMainMenu',
                  })}
                />
              </DrawerHeader>
              <DrawerBody as='nav' aria-labelledby={`drawer-${itemId}`}>
                <Accordion variant='megaDrawer'>
                  {href && href !== '' && href.trim() !== '/' && (
                    <AccordionItem>
                      <ItemLink
                        closeAll={closeAll}
                        href={href}
                        label={`${label} - All`}
                        prefetchChildNavs={prefetchChildNavs}
                        prefetchTopLevelNavs={prefetchTopLevelNavs}
                      />
                    </AccordionItem>
                  )}
                  {children?.map((item) => {
                    if (!item) return null
                    const itemData = {
                      ...item,
                      closeAll: (isLink: Boolean | undefined) => {
                        onClose()
                        if (isFirstChild || isLink) {
                          setTimeout(() => {
                            closeAll()
                          }, 100)
                        }
                      },
                      parentLabel: label,
                    }
                    const key = item?.id
                    return (
                      <AccordionItem key={key}>
                        <MegaDrawerItem
                          itemData={itemData}
                          prefetchChildNavs={prefetchChildNavs}
                          prefetchTopLevelNavs={prefetchTopLevelNavs}
                        />
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <ItemLink
          closeAll={() => closeAll(true)}
          href={href}
          label={label}
          prefetchChildNavs={prefetchChildNavs}
          prefetchTopLevelNavs={prefetchTopLevelNavs}
        />
      )}
    </>
  )
}
