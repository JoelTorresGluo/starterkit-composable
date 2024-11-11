'use client'

import {
  Button,
  ButtonProps,
  Text,
  TextProps,
  useToken,
} from '@chakra-ui/react'
import NextLink from 'next/link'

interface SidebarItemProps {
  href: string
  children?: React.ReactNode
  label?: string
  rootProps?: Omit<ButtonProps, 'children'>
  state?: 'Default' | 'Hover' | 'Active'
  textProps?: TextProps
}

export const SidebarItem = ({
  href,
  children,
  label,
  rootProps,
  state = 'Default',
  textProps,
}: SidebarItemProps) => {
  const [size4] = useToken('sizes', ['sizes.4'])

  const isActive = state === 'Active'
  return (
    <Button
      as={NextLink}
      href={href}
      role='link'
      alignItems='center'
      backgroundColor='transparent'
      borderRadius='md'
      color='text'
      display='flex'
      isActive={isActive}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      justifyContent='flex-start'
      textDecoration='none'
      variant='ghost'
      w='full'
      _hover={{
        background: 'transparent',
      }}
      _active={{
        color: 'primary',
        textStyle: 'blockquote-100',
        fontWeight: '700 !important',
        textDecoration: 'underline',
      }}
      {...rootProps}
    >
      {children ? (
        children
      ) : (
        <Text
          textStyle='blockquote-100'
          {...(isActive && { fontWeight: '700' })}
          {...textProps}
        >
          {label}
        </Text>
      )}
    </Button>
  )
}
