import {
  AspectRatio,
  Box,
  Skeleton,
  SkeletonText,
  SkeletonProps,
  SkeletonTextProps,
} from '@chakra-ui/react'

export interface ListEmptyStateProps {
  skeletonProps?: SkeletonProps
  skeletonTextProps?: SkeletonTextProps
  ratio?: number
}

export const CardEmptyState = ({
  skeletonTextProps,
  skeletonProps,
  ratio,
}: ListEmptyStateProps) => {
  const _ratio = ratio ?? 4 / 3

  return (
    <Box>
      <AspectRatio ratio={_ratio}>
        <Skeleton {...skeletonProps} />
      </AspectRatio>
      <SkeletonText mt='3' {...skeletonTextProps} />
    </Box>
  )
}
