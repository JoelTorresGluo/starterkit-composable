import {
  LayoutProps,
  Progress as ChakraProgress,
  BorderProps,
} from '@chakra-ui/react'

export interface ProgressProps {
  size?: ProgressSize
  height?: LayoutProps['height']
  value: number
  borderRadius?: BorderProps['borderRadius']
}

export type ProgressSize = 'sm' | 'md' | 'lg'

export const Progress = ({
  size = 'sm',
  height,
  value,
  borderRadius = 'none',
}: ProgressProps) => {
  return (
    <>
      <ChakraProgress
        value={value}
        size={size}
        h={height}
        borderRadius={borderRadius}
      ></ChakraProgress>
    </>
  )
}
