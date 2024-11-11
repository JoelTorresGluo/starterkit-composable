'use client'

import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Button, Flex } from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { MegaMenuContent } from './MegaMenuContent'
import { useMegaMenu } from './useMegaMenu'

const linkStyles = {
  padding: 2,
  minHeight: 10,
  color: 'text-muted', // Default color
  _hover: {
    color: 'primary',
  },
}

export interface MegaMenuItemProps {
  id: string
  label: string
  href: string
  variant: string
  description: string
  imageSrc: string
  children: (MegaMenuItemProps | null | undefined)[]
}

export const MegaMenuItem = ({
  itemData,
  prefetchChildNavs,
  prefetchTopLevelNavs,
}: {
  itemData: MegaMenuItemProps
  prefetchTopLevelNavs?: boolean
  prefetchChildNavs?: boolean
}) => {
  const router = useRouter()
  const { id, label, href, variant, children } = itemData
  const hasChildren = children.length > 0

  const {
    buttonArrowProps,
    buttonProps,
    childrenLinkProps,
    linkProps,
    motionProps,
    renderContent,
    rootProps,
  } = useMegaMenu({
    item: {
      href,
      hasChildren,
    },
    routerPush: router.push,
  })

  const popupId = `popup-${id}`

  return (
    itemData && (
      <Box py='1' {...rootProps}>
        <Flex alignItems='center'>
          {href !== '/' && href ? (
            <Link
              prefetch={prefetchTopLevelNavs}
              sx={linkStyles}
              aria-haspopup={hasChildren}
              aria-expanded={renderContent}
              aria-controls={hasChildren && renderContent ? popupId : undefined}
              href={href}
              p='3'
              display='block'
              // TODO: Replace color value with token.
              color='red'
              textStyle='desktop-75'
              fontSize='sm'
              fontWeight='bold'
              {...linkProps}
            >
              {label}
            </Link>
          ) : (
            <Link
              // prefetch={true} //always prefetch the homepage
              sx={linkStyles}
              aria-haspopup={hasChildren}
              aria-expanded={renderContent}
              aria-controls={hasChildren && renderContent ? popupId : undefined}
              href='null'
              p='3'
              display='block'
              // TODO: Replace color value with token.
              color='red'
              textStyle='desktop-75'
              fontSize='sm'
              fontWeight='bold'
              {...linkProps}
            >
              {label}
            </Link>
          )}
          {hasChildren && (
            <Button
              sx={linkStyles}
              aria-label={`${label} Menu`}
              aria-controls={renderContent ? popupId : undefined}
              variant='ghost-alt'
              color='text'
              p='none'
              minW='none'
              w='2'
              verticalAlign='middle'
              tabIndex={0}
              opacity='0'
              _focusWithin={{ opacity: 1 }}
              borderRadius='none'
              {...buttonArrowProps}
            >
              <ChevronDownIcon
                w='4'
                h='4'
                transform={renderContent ? 'rotate(180deg)' : ''}
              />
            </Button>
          )}
        </Flex>
        <AnimatePresence>
          {renderContent && (
            <motion.div {...motionProps}>
              <Box
                id={popupId}
                borderBottom='sm'
                minH='12'
                background='background'
              >
                <MegaMenuContent
                  data={children}
                  variant={variant}
                  linkProps={childrenLinkProps}
                  prefetchChildNavs={prefetchChildNavs}
                />
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    )
  )
}
