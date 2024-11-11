import { Button, Text, useDisclosure } from '@chakra-ui/react'
import { FiltersIcon, PersistentModal } from '@oriuminc/ui'
import { useIntl } from 'react-intl'
import { FacetFilters } from './facet-filters'
import { useRef } from 'react'
import { useFilters } from '../hooks'

export const FacetFiltersModal = () => {
  const intl = useIntl()
  const { checked } = useFilters()
  const checkedSize = Object.keys(checked || {}).length

  const { isOpen, onClose, onOpen } = useDisclosure()
  const openButtonRef = useRef<HTMLButtonElement | null>(null)
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
          {checkedSize > 0 && `(${checkedSize})`}
        </Text>
      </Button>

      <PersistentModal
        isOpen={isOpen}
        onClose={handleModalClose}
        title={intl.formatMessage({ id: 'category.filters.refineBy' })}
        closeButtonLabel={intl.formatMessage({ id: 'action.close' })}
      >
        <FacetFilters />
      </PersistentModal>
    </>
  )
}
