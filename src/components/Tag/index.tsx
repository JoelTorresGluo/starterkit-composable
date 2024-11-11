import {
  Tag as ChakraTag,
  TagLabel,
  TagLeftIcon,
  TagRightIcon,
} from '@chakra-ui/react'
export interface TagProps {
  title: string
  size: TagSize
  variant: TagVariant
  showLeftIcon: boolean
  showRightIcon: boolean
  leftIcon?: any
  rightIcon?: any
}

export type TagSize = 'sm' | 'md' | 'lg'
export type TagVariant =
  | 'solid'
  | 'solid-green'
  | 'solid-orange'
  | 'solid-red'
  | 'solid-blue'
  | 'solid-gray'
  | 'subtle'
  | 'subtle-green'
  | 'subtle-orange'
  | 'subtle-red'
  | 'subtle-blue'
  | 'subtle-gray'
  | 'solid-gray'
  | 'outline'
  | 'outline-green'
  | 'outline-orange'
  | 'outline-red'
  | 'outline-blue'
  | 'outline-gray'

export const Tag = ({
  title,
  size = 'sm',
  variant,
  showLeftIcon,
  showRightIcon,
  leftIcon,
  rightIcon,
}: TagProps) => {
  return (
    <ChakraTag size={size} key={size} variant={variant}>
      {showLeftIcon && <TagLeftIcon m='none' as={leftIcon} />}
      <TagLabel>{title}</TagLabel>
      {showRightIcon && <TagRightIcon m='none' as={rightIcon} />}
    </ChakraTag>
  )
}
