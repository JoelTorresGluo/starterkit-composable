'use client'

import { Button, Text, useDisclosure } from '@chakra-ui/react'
import { FiltersIcon, PersistentModal } from '@oriuminc/ui'
import { useCurrentRefinements } from 'react-instantsearch'
import { useIntl } from 'react-intl'
import { Filters } from './filters'
import { useRef } from 'react'
import { AlgoliaFilter } from '@oriuminc/cms-generic'

export const FiltersModal = ({ filters }: { filters: AlgoliaFilter[] }) => {
  const intl = useIntl()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { items } = useCurrentRefinements()
  const openButtonRef = useRef<HTMLButtonElement | null>(null)

  const currentRefinementsCount = items.reduce(
    (prev, refinementAttribute) =>
      prev + refinementAttribute.refinements.length,
    0
  )
  const handleModalClose = () => {
    if (isOpen) {
      onClose()
      setTimeout(() => {
        openButtonRef.current?.focus()
      }, 0)
    }
  }

  return (
    <>
      <Text as='label' htmlFor='btnMmobileFilters' fontSize='sm' mb='2'>
        {intl.formatMessage({ id: 'category.filters.refineBy' })}
      </Text>
      <Button
        id='btnMmobileFilters'
        variant='outline-black'
        onClick={() => onOpen()}
        rightIcon={<FiltersIcon ml='auto' />}
        iconSpacing='auto'
        ref={openButtonRef}
      >
        <Text fontWeight='normal' fontSize='base'>
          {intl.formatMessage({ id: 'category.filters.filters' })}{' '}
          {currentRefinementsCount > 0 && `(${currentRefinementsCount})`}
        </Text>
      </Button>

      <PersistentModal
        isOpen={isOpen}
        onClose={handleModalClose}
        title={intl.formatMessage({ id: 'category.filters.refineBy' })}
        closeButtonLabel={intl.formatMessage({ id: 'action.close' })}
      >
        <Filters prefix='mobile' filters={filters} />
      </PersistentModal>
    </>
  )
}
