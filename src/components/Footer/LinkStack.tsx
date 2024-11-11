'use client'

import { Link as ChakraLink, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import NextLink from 'next/link'
import { useMegaMenu, MegaMenuItemProps } from '../MegaMenu'

interface LinkStackProps {
  itemData: MegaMenuItemProps
  level?: number
  prefetch?: boolean
}

export const LinkStack = ({
  itemData,
  level = 0,
  prefetch,
}: LinkStackProps) => {
  const router = useRouter()
  const { id, label, href, children } = itemData
  const hasChildren = children.length > 0
  const { linkProps } = useMegaMenu({
    item: {
      href,
      hasChildren,
    },
    routerPush: router.push,
  })

  return (
    <Stack
      key={id}
      spacing='2'
      minW={{ lg: '40' }}
      paddingLeft={level > 2 ? 0 : 5}
    >
      {!hasChildren ? (
        <ChakraLink
          as={NextLink}
          prefetch={prefetch}
          href={href}
          p={3}
          display='block'
          color='shading.900'
          fontSize='sm'
          {...linkProps}
          padding={0}
        >
          {label}
        </ChakraLink>
      ) : (
        <>
          <Text
            fontSize={level > 1 ? 'md' : 'lg'}
            fontWeight='semibold'
            color='subtle'
            paddingBottom={level > 1 ? 0 : 3}
            paddingLeft={level > 1 ? 0 : 5}
          >
            {label}
          </Text>
          {children?.map((child, idx) => {
            return (
              child && (
                <LinkStack
                  key={`${idx}-${child.id}`}
                  itemData={child}
                  level={level + 1}
                />
              )
            )
          })}
        </>
      )}
    </Stack>
  )
}
