import React, { useMemo, useRef } from 'react'
import { Root } from 'react-dom/client'
import { IntlShape, useIntl } from 'react-intl'
import { REACT_INTL_KILOMETER_FORMAT } from '../constants'
import { Store } from '../_data'
import { InfoWindow } from '../components/info-window'
import { useMapApi } from './use-map-api'
import { useStores } from './use-stores'
import {
  useStoreLocatorRouter,
  UseStoreLocatorRouter,
} from './use-store-locator-router'

export const useSelectStore = () => {
  const intl = useIntl()
  const router = useStoreLocatorRouter()
  const stores = useStores()
  const storesRef = useRef<ReturnType<typeof useStores> | null>(null)
  storesRef.current = stores

  const {
    directionsService,
    directionsRenderer,
    infoWindowRoot,
    infoWindowElement,
    infoWindow,
    map,
    markers,
  } = useMapApi()

  return useMemo(() => {
    return {
      handleSelectStore: createHandleSelectStore({
        map,
        markers,
        storesRef,
        directionsService,
        directionsRenderer,
        infoWindow,
        infoWindowRoot,
        infoWindowElement,
        intl,
        router,
      }),
    }
  }, [
    directionsRenderer,
    directionsService,
    infoWindow,
    infoWindowElement,
    infoWindowRoot,
    intl,
    map,
    markers,
  ])
}

interface CreateHandleSelectStoreDeps {
  markers: Record<string, google.maps.Marker>
  directionsService: google.maps.DirectionsService | null
  directionsRenderer: google.maps.DirectionsRenderer | null
  storesRef: React.MutableRefObject<ReturnType<typeof useStores> | null>
  intl: IntlShape
  router: UseStoreLocatorRouter
  infoWindow: google.maps.InfoWindow | null
  infoWindowRoot: Root | null
  infoWindowElement: HTMLElement | null
  map: google.maps.Map | null
}

interface CreateHandleSelectStoreOptions {
  directionsOrigin?: { lat: number; lng: number }
  infoWindowVariant?: 'gallery' | 'details'
}

export const createHandleSelectStore =
  (deps: CreateHandleSelectStoreDeps) =>
  (store?: Store, opts?: CreateHandleSelectStoreOptions) => {
    const {
      map,
      storesRef,
      infoWindow,
      infoWindowRoot,
      infoWindowElement,
      intl,
      directionsService,
      directionsRenderer,
      markers,
      router,
    } = deps

    if (!store) {
      infoWindow?.close()
      directionsRenderer?.setDirections({ routes: [] })
      return
    }

    const setInfoWindow = (params?: { distance?: string }) => {
      infoWindowRoot?.render(
        <InfoWindow
          key={`${store.id}-${opts?.infoWindowVariant}`}
          store={store}
          distance={params?.distance}
          variant={opts?.infoWindowVariant}
          deps={{ intl, router }}
          isBookmarked={storesRef.current?.bookmarksIds.includes(store.id)}
          onBookmark={() => storesRef.current?.bookmarkStore(store)}
        />
      )
      infoWindow?.setContent(infoWindowElement) // https://stackoverflow.com/questions/29586411/react-js-is-it-possible-to-convert-a-react-component-to-html-doms
      infoWindow?.open({ map, anchor: markers[store.id] })
    }

    if (!opts?.directionsOrigin) {
      setInfoWindow()
      return
    }

    directionsService?.route(
      {
        origin: opts.directionsOrigin,
        destination: { lat: store._geoloc.lat, lng: store._geoloc.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        let distance = undefined

        if (status === google.maps.DirectionsStatus.OK) {
          const distanceValue =
            response?.routes?.[0].legs?.[0]?.distance?.value ?? 0
          directionsRenderer?.setDirections(response)
          distance = intl.formatNumber(
            distanceValue / 1000,
            REACT_INTL_KILOMETER_FORMAT
          )
        }

        setInfoWindow({ distance })
      }
    )
  }
