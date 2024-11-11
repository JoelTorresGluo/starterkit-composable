import { Button, ButtonProps, Text, TextProps } from '@chakra-ui/react'
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
  const isActive = state === 'Active'
  return (
    <Button
      as={NextLink}
      href={href}
      role='link'
      alignItems='center'
      backgroundColor={state === 'Hover' ? 'highlight' : 'background'}
      borderRadius='1-5'
      color='text'
      display='flex'
      // TODO: Replace pixel values with tokens.
      height={{ base: '37px', md: ' 53px' }}
      isActive={isActive}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
      justifyContent='flex-start'
      px={{ base: 0, md: 2 }}
      py='4'
      textDecoration='none'
      variant='ghost'
      w='full'
      _hover={{
        background: 'highlight',
      }}
      _active={{
        color: 'primary',
        textStyle: 'blockquote-100',
        fontWeight: 'bold !important',
        textDecoration: 'underline',
        textUnderlineOffset: 2,
      }}
      {...rootProps}
    >
      {children ? (
        children
      ) : (
        <Text
          textStyle='blockquote-100'
          {...(isActive && { fontWeight: 'bold' })}
          {...textProps}
        >
          {label}
        </Text>
      )}
    </Button>
  )
}
