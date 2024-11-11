import { Button, Text, useDisclosure } from '@chakra-ui/react'
import { FiltersIcon, PersistentModal } from '@oriuminc/ui'
import { useRef } from 'react'
import { useIntl } from 'react-intl'
import { useCommercetoolsSearch } from '../provider'
import { Filters } from './filters'

export const FiltersModal = () => {
  const intl = useIntl()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { checked } = useCommercetoolsSearch()
  const openButtonRef = useRef<HTMLButtonElement | null>(null)

  const checkedSize = Object.keys(checked || {}).length

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
      <Text as='label' htmlFor='btnMmobileFilters' fontSize='sm' mb='0.5rem'>
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
        inset='none'
        isOpen={isOpen}
        onClose={handleModalClose}
        title={intl.formatMessage({ id: 'category.filters.refineBy' })}
        closeButtonLabel={intl.formatMessage({ id: 'action.close' })}
      >
        <Filters />
      </PersistentModal>
    </>
  )
}
