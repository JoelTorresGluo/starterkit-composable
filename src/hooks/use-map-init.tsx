import { useEffect, useMemo, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  directionsRendererAtom,
  directionsServiceAtom,
  infoWindowAtom,
  infoWindowElementAtom,
  infoWindowRootAtom,
  mapAtom,
  markersAtom,
  userLatLngAtom,
} from '../_data'
import { useDataUrls } from './use-data-urls'
import { useStores } from './use-stores'
import { useStoreLocatorRouter } from './use-store-locator-router'
import { useUserGeoInit } from './use-user-geo-init'

export const useMapInit = () => {
  useUserGeoInit() // Initialize user's geolocation
  const ref = useRef<HTMLDivElement | null>(null)
  const { stores, bookmarks } = useStores()
  const { goTo, value, detailsId, previewId } = useStoreLocatorRouter()
  const userLatLng = useAtomValue(userLatLngAtom)
  const [markers, setMarkers] = useAtom(markersAtom)
  const [map, setMap] = useAtom(mapAtom)
  const [infoWindow, setInfoWindow] = useAtom(infoWindowAtom)
  const setDirectionsService = useSetAtom(directionsServiceAtom)
  const setDirectionsRenderer = useSetAtom(directionsRendererAtom)
  const setInfoWindowRoot = useSetAtom(infoWindowRootAtom)
  const setInfoWindowElement = useSetAtom(infoWindowElementAtom)
  const { getMapMarkerIcon } = useDataUrls()
  const homeStores = useMemo(
    () => stores?.filter((store) => store.is_home),
    [stores]
  )
  const mapMarkerDefaultIcon = getMapMarkerIcon('default')
  const mapMarkerBookmarksIcon = getMapMarkerIcon('bookmarks')
  const mapMarkerHomeIcon = getMapMarkerIcon('home')

  const handleMarkerClickDepsValue = {
    goTo,
    value,
    stores,
    detailsId,
    previewId,
  }

  const handleMarkerClickDeps = useRef(handleMarkerClickDepsValue)
  handleMarkerClickDeps.current = handleMarkerClickDepsValue

  const mapCenter = useMemo(
    () =>
      userLatLng
        ? { lat: userLatLng.lat, lng: userLatLng.lng }
        : {
            lat: stores?.[0]?._geoloc.lat ?? 0,
            lng: stores?.[0]?._geoloc.lng ?? 0,
          },
    [userLatLng, stores]
  )

  // Initialize Map and Map Services
  useEffect(() => {
    if (!ref.current) {
      return
    }

    const map = new window.google.maps.Map(ref.current, {
      mapTypeId: 'roadmap',
      controlSize: 24,
      disableDefaultUI: true,
      zoomControl: true,
      // center: { lat: 0, lng: 0 },
      zoom: 13,
      maxZoom: 14,
      minZoom: 11,
      // gestureHandling: 'none'
    })

    setMap(map)
    setInfoWindow(new google.maps.InfoWindow({ maxWidth: 700 }))
    setDirectionsService(new google.maps.DirectionsService())
    setDirectionsRenderer(
      new google.maps.DirectionsRenderer({
        map,
        preserveViewport: true,
        markerOptions: {
          visible: false,
        },
      })
    )
  }, [setDirectionsRenderer, setDirectionsService, setInfoWindow, setMap])

  // Center the map on the user's location
  useEffect(() => {
    if (!map) {
      return
    }

    map.setCenter(mapCenter)
  }, [map, mapCenter])

  // Initialize the InfoWindow objects
  useEffect(() => {
    const div = document.createElement('div')
    setInfoWindowElement(div)
    setInfoWindowRoot(createRoot(div))

    return () => {
      // TODO: do we need to unmount the root?
      /*
      setInfoWindowRoot((root) => {
        root?.unmount()
        return null
      })
      setInfoWindowElement((element) => {
        element?.remove()
        return null
      })
      */
    }
  }, [setInfoWindowElement, setInfoWindowRoot])

  // Initialize/Remove Markers
  useEffect(() => {
    if (!map) {
      return
    }

    const markers = (stores ?? []).reduce(
      (obj: Record<string, google.maps.Marker>, store) => {
        obj[store.id] = new window.google.maps.Marker({
          map,
          position: { lat: store._geoloc.lat, lng: store._geoloc.lng },
          title: store.title,
          icon: mapMarkerDefaultIcon,
        })
        return obj
      },
      {}
    )
    setMarkers(markers)

    return () => {
      // Remove the markers from the map
      setTimeout(() => {
        Object.values(markers).forEach((marker) => {
          marker.setMap(null)
        })
      }, 100)
    }
  }, [map, stores, mapMarkerDefaultIcon, setMarkers])

  // Handle Markers Icons
  useEffect(() => {
    if (!markers) {
      return
    }

    Object.values(markers).forEach((marker) => {
      marker.setIcon(mapMarkerDefaultIcon)
    })

    bookmarks.forEach((bookmark) => {
      markers[bookmark.id]?.setIcon(mapMarkerBookmarksIcon)
    })

    homeStores?.forEach((store) => {
      markers[store.id]?.setIcon(mapMarkerHomeIcon)
    })
  }, [
    markers,
    bookmarks,
    homeStores,
    mapMarkerBookmarksIcon,
    mapMarkerDefaultIcon,
    mapMarkerHomeIcon,
  ])

  // Handle Markers Click Events
  useEffect(() => {
    if (!markers || !stores) {
      return
    }

    const clickEvents: google.maps.MapsEventListener[] = []
    const clickHandler = (e: { latLng: google.maps.LatLng }) => {
      const store = handleMarkerClickDeps.current.stores?.find(
        (el) =>
          el._geoloc.lat === e.latLng.lat() && el._geoloc.lng === e.latLng.lng()
      )

      if (!store) {
        return
      }

      const handleRouting = () => {
        const storeId = store.id
        const { value, previewId, detailsId, goTo } =
          handleMarkerClickDeps.current

        // User is already previewing the store
        if (value === 'preview') {
          if (previewId === storeId) {
            goTo('map')
          } else {
            goTo('preview', storeId)
          }
          return
        }

        // User is already viewing the store details
        if (value === 'details') {
          if (detailsId === storeId) {
            goTo('map')
          } else {
            goTo('details', storeId)
          }
          return
        }

        // Default to open the store preview
        goTo('preview', storeId)
      }

      handleRouting()
    }

    Object.values(markers).forEach((marker) => {
      clickEvents.push(marker.addListener('click', clickHandler))
    })

    return () => {
      Object.values(markers).forEach((marker, idx) => {
        google.maps.event.removeListener(clickEvents[idx])
      })
    }
  }, [markers, stores])

  // Handle Map Click Events
  useEffect(() => {
    if (!infoWindow || !map) {
      return
    }

    const clickHandler = () => {
      goTo('map')
    }

    const infoWindowCloseClick = google.maps.event.addListener(
      infoWindow,
      'closeclick',
      clickHandler
    )
    const mapClick = google.maps.event.addListener(map, 'click', clickHandler)

    return () => {
      google.maps.event.removeListener(infoWindowCloseClick)
      google.maps.event.removeListener(mapClick)
    }
  }, [infoWindow, map, goTo])

  return {
    ref,
  }
}
