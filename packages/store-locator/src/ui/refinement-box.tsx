import { ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { LinkButton } from './link-button'

export interface RefinementBoxProps {
  rootProps?: BoxProps
  title: string
  children: ReactNode
  onSelectAll?: () => void
}

export const RefinementBox = ({
  title,
  children,
  rootProps,
  onSelectAll,
}: RefinementBoxProps) => {
  return (
    <Box {...rootProps}>
      <Box
        display='flex'
        justifyContent='space-between'
        textStyle='body-300'
        borderBottom='sm'
        borderBottomColor='gray.200'
        py='3'
        mb='3'
      >
        <Box>{title}</Box>
        {onSelectAll && (
          <LinkButton onClick={() => onSelectAll()}>Select All</LinkButton>
        )}
      </Box>
      <Box>{children}</Box>
    </Box>
  )
}
