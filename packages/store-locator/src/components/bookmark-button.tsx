import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useDataUrls } from '../hooks/use-data-urls'

interface BookmarkButtonProps {
  buttonProps?: ButtonProps
  onChange?: () => void
  isBookmarked?: boolean
}

export const BookmarkButton = ({
  buttonProps,
  onChange,
  isBookmarked,
}: BookmarkButtonProps) => {
  const { getBookmarkIcon } = useDataUrls()

  return (
    <Button
      display='flex'
      alignItems='center'
      justifyContent='center'
      aria-label='Add to favourites'
      variant='unstyled'
      borderRadius='full'
      _hover={{ bg: 'shading.100' }}
      {...buttonProps}
      onClick={(e) => {
        e.stopPropagation()
        onChange?.()
      }}
    >
      <img src={getBookmarkIcon(isBookmarked)} alt='' />
    </Button>
  )
}
