'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  IconButton,
  useBreakpointValue,
  Text,
} from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { useIntl } from 'react-intl'

export interface PaginationProps {
  variant?: PaginationVariant
  totalRecords: number
  itemsPerPage: number
  activePage: number
  showText: boolean
  onPageChange?: (newPage: number) => void
}

export type PaginationVariant = 'solid' | 'outline' | 'ghost'

export const Pagination = ({
  variant = 'solid',
  totalRecords = 0,
  itemsPerPage = 10,
  activePage = 1,
  showText = false,
  onPageChange = (newPage) => {},
}: PaginationProps) => {
  const intl = useIntl()
  const numberOfPages = Math.ceil(totalRecords / itemsPerPage)
  const initialPageValue = activePage <= numberOfPages ? activePage : 1

  const [selectedPage, setSelectedPage] = useState(initialPageValue)
  const isMobile = useBreakpointValue({ base: true, md: false })

  if (!totalRecords || !itemsPerPage) {
    return null
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > numberOfPages) return
    onPageChange(newPage)
    setSelectedPage(newPage)
  }

  const shouldRenderButton = (
    page: number,
    isLeftSideTruncated: boolean,
    isRightSideTruncated: boolean
  ) => {
    const sideItemsToDisplay = isMobile ? 1 : 2
    const leftItemsTilTrucate = isMobile ? 3 : 5
    const rightItemsTilTruncate = isMobile
      ? numberOfPages - 2
      : numberOfPages - 4

    return (
      page < 2 ||
      (page <= leftItemsTilTrucate && !isLeftSideTruncated) ||
      (page >= rightItemsTilTruncate && !isRightSideTruncated) ||
      page > numberOfPages - 1 ||
      Math.abs(selectedPage - page) < sideItemsToDisplay
    )
  }

  const Ellipsis = () => (
    <Box px='4' lineHeight='loose'>
      &hellip;
    </Box>
  )

  const renderButtons = () => {
    let items = []

    const pagesThresholdForTruncation = isMobile ? 6 : 8
    const leftSideLimitForTruncation = isMobile
      ? selectedPage >= 3
      : selectedPage >= 4
    const rightSideLimitForTruncation = isMobile
      ? selectedPage <= numberOfPages - 2
      : selectedPage <= numberOfPages - 3

    const isLeftSideTruncated =
      numberOfPages >= pagesThresholdForTruncation && leftSideLimitForTruncation
    const isRightSideTruncated =
      numberOfPages >= pagesThresholdForTruncation &&
      rightSideLimitForTruncation

    for (let page = 1; page <= numberOfPages; page++) {
      const isPageActive = selectedPage === page
      if (page === 2 && isLeftSideTruncated) {
        items.push(<Ellipsis key={`ellipsis-left-${page}`} />)
      }

      if (shouldRenderButton(page, isLeftSideTruncated, isRightSideTruncated)) {
        items.push(
          <Button
            key={page}
            variant={variant}
            isActive={isPageActive}
            onClick={() => handlePageChange(page)}
            w={{ base: '8', md: '10' }}
            size={{ base: 'sm', md: 'md' }}
          >
            {page}
          </Button>
        )
      }

      if (page === numberOfPages - 1 && isRightSideTruncated) {
        items.push(<Ellipsis key={`ellipsis-right-${page}`} />)
      }
    }

    return items
  }

  const renderLeftArrowButton = () => {
    return (
      <IconButton
        w={{ base: '8', md: '10' }}
        size={{ base: 'sm', md: 'md' }}
        isDisabled={selectedPage === 1}
        variant='ghost'
        aria-label={
          intl.formatMessage({ id: 'action.previousPage' }) || 'Previous Page'
        }
        icon={<ChevronLeftIcon />}
        onClick={(e) => {
          e.preventDefault()
          handlePageChange(selectedPage - 1)
        }}
      />
    )
  }

  const renderRightArrowButton = () => {
    return (
      <IconButton
        w={{ base: '8', md: '10' }}
        size={{ base: 'sm', md: 'md' }}
        isDisabled={selectedPage === numberOfPages}
        variant='ghost'
        aria-label={
          intl.formatMessage({ id: 'action.nextPage' }) || 'Next Page'
        }
        icon={<ChevronRightIcon />}
        onClick={(e) => {
          e.preventDefault()
          handlePageChange(selectedPage + 1)
        }}
      />
    )
  }

  const renderText = () => {
    const lowerValue = 1 + (selectedPage - 1) * itemsPerPage
    const higherValue = Math.min(selectedPage * itemsPerPage, totalRecords)

    return (
      <Box pt='4' display='flex' justifyContent='center'>
        {/* TODO: Localize string */}
        <Text textStyle='body-100'>
          Viewing {lowerValue}-{higherValue} of {totalRecords}
        </Text>
      </Box>
    )
  }

  return (
    <>
      {showText && renderText()}
      <Box
        py='4'
        gap='2'
        display='flex'
        flexDirection='row'
        justifyContent='center'
      >
        {renderLeftArrowButton()}
        {renderButtons()}
        {renderRightArrowButton()}
      </Box>
    </>
  )
}
