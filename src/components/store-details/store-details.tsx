import React from 'react'
import { useIntl } from 'react-intl'
import { useAtom } from 'jotai'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
  Switch,
} from '@chakra-ui/react'
import { AddIcon, MinusIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { REACT_INTL_KILOMETER_FORMAT } from '../../constants'
import { Store, storeDetailsModalAtom } from '../../_data'
import { WarnTag } from '../../ui/warn-tag'
import { InfoTag } from '../../ui/info-tag'
import { useUserLatLng } from '../../hooks/use-user-lat-lng'
import { isOpen } from '../../utils/is-open'
import { getOpenHoursLabel } from '../../utils/get-open-hours-label'
import { ContentHours } from './content-hours'
import { ProductDetailsModal } from './product-details-modal'

interface StoreDetailsProps {
  store: Store
}

export const StoreDetails = ({ store }: StoreDetailsProps) => {
  const intl = useIntl()
  const [modalIsOpen, setModalOpen] = useAtom(storeDetailsModalAtom)

  const { getDistance, getMapsLink } = useUserLatLng()
  const storeIsOpen = isOpen(store)
  const mapsLink = getMapsLink(store)
  const openHoursLabel = getOpenHoursLabel(store)
  const pointsDistance = getDistance(store)
  const rectDistance = pointsDistance
    ? intl.formatNumber(pointsDistance, REACT_INTL_KILOMETER_FORMAT)
    : ''

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  return (
    <Box h='full' overflow='auto' display='flex' flexDirection='column'>
      <Box p='8'>
        <Box color='text' textStyle='blockquote-100'>
          {rectDistance}
        </Box>

        <Box color='text' textStyle='desktop-400' fontWeight='bold' my='2'>
          #{store.id} {store.title}
        </Box>

        <Box color='text' textStyle='blockquote-100' my='2'>
          {[store.address1, store.address2, store.city, store.postal_code]
            .filter(Boolean)
            .join(', ')}
        </Box>

        <Box color='text-muted' textStyle='blockquote-75' mb='2'>
          {[rectDistance, openHoursLabel].filter(Boolean).join(' • ')}
        </Box>

        <Box my='6' display='flex'>
          <Button
            w='50%'
            mr='2-5'
            variant='outline'
            as='a'
            href={`tel:${store.phone}`}
          >
            Call Store
          </Button>

          <Button
            w='50%'
            ml='2-5'
            onClick={() => window.open(mapsLink, 'mapsLink')}
          >
            Get Directions
          </Button>
        </Box>

        <Switch
          my='6'
          display='flex'
          alignItems='center'
          checked={store.is_home}
        >
          Make this my home store
        </Switch>

        {!storeIsOpen && <WarnTag>This store is closed</WarnTag>}

        {store.is_curbside_pickup_available && (
          <InfoTag>Curbside pickup available</InfoTag>
        )}

        <Box color='text' textStyle='blockquote-75' my='6'>
          {store.description}
        </Box>

        <Accordion allowMultiple>
          {extraData.sections.map((section) => {
            return (
              <AccordionItem key={section.key}>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton>
                        <Box
                          as='span'
                          flex='1'
                          textAlign='left'
                          display='flex'
                          alignItems='center'
                        >
                          {section.title}

                          {section.key === 'fuel-products' && (
                            <Box
                              tabIndex={0}
                              display='flex'
                              alignItems='center'
                              justifyContent='center'
                              color='text'
                              ml='2'
                              p='1-5'
                              h='auto'
                              lineHeight='1'
                              borderRadius='full'
                              _hover={{ bg: 'shading.300' }}
                              _focus={{ shadow: 'outline', outline: 'none' }}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleOpenModal()
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.stopPropagation()
                                  handleOpenModal()
                                }
                              }}
                            >
                              <InfoOutlineIcon fontSize='md' />
                            </Box>
                          )}
                        </Box>
                        {isExpanded ? (
                          <MinusIcon fontSize='xs' />
                        ) : (
                          <AddIcon fontSize='xs' />
                        )}
                      </AccordionButton>
                    </h2>
                    <AccordionPanel p={0}>
                      {section.key === 'hours' && <ContentHours />}
                      {section.key === 'amenities' && <ContentHours />}
                      {section.key === 'fuel-products' && <ContentHours />}
                      {section.key === 'otb-amenities' && <ContentHours />}
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            )
          })}
        </Accordion>
      </Box>

      {modalIsOpen && (
        <ProductDetailsModal onClose={() => setModalOpen(false)} />
      )}
    </Box>
  )
}

const extraData = {
  sections: [
    {
      key: 'hours',
      title: 'Hours',
    },
    {
      key: 'amenities',
      title: 'Store Amenities',
    },
    {
      key: 'fuel-products',
      title: 'Fuel Products',
    },
    {
      key: 'otb-amenities',
      title: 'OTB Amenities',
    },
  ],
} as const
