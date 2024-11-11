import { useEffect, useRef } from 'react'
import { useBreakpointValue } from '@chakra-ui/react'
import {
  StoreLocatorRouterValue,
  useStoreLocatorRouter,
} from './use-store-locator-router'
import { useMapApi } from './use-map-api'
import { useAsideDrawer } from './use-aside-drawer'
import { useSelectStore } from './use-select-store'
import { useUserLatLng } from './use-user-lat-lng'

export const useStoreLocatorInit = () => {
  const { store, value } = useStoreLocatorRouter()
  const { handleSelectStore } = useSelectStore()
  const { userLatLng, geolocationAvailable } = useUserLatLng()
  const { setOpen } = useAsideDrawer()
  const { mapReady } = useMapApi()
  const selectStoreRef = useRef(handleSelectStore)
  const infoWindowVariant = value === 'details' ? 'gallery' : 'details'
  const enableAsideDrawer =
    useBreakpointValue({ lg: false, base: true }) ?? false

  selectStoreRef.current = handleSelectStore

  // Selected Store Handler
  useEffect(() => {
    if (!mapReady) {
      return
    }

    const directionsOrigin = geolocationAvailable ? userLatLng : undefined
    setTimeout(() => {
      selectStoreRef.current(store, {
        infoWindowVariant,
        directionsOrigin: directionsOrigin ?? undefined,
      })
    }, 1)
  }, [infoWindowVariant, store, userLatLng, geolocationAvailable, mapReady])

  // Aside Drawer Handler (for mobile version)
  useEffect(() => {
    const values: Partial<StoreLocatorRouterValue>[] = [
      'results',
      'filters',
      'details',
    ]
    setOpen(values.includes(value))
  }, [value])

  // Return
  return {
    geolocationAvailable,
    enableAsideDrawer,
  }
}
