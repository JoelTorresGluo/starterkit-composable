import { useEffect } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useGeolocated } from 'react-geolocated'
import { DEV_MODE, USE_GEOLOCATED_DEFAULT_CONFIG } from '../constants'
import {
  geolocationAvailableAtom,
  mapAtom,
  userLatLngAtom,
  userMarkerAtom,
} from '../_data'
import mockUserLatLng from '../mock-data/user-lat-lng.json'
import { useDataUrls } from './use-data-urls'

export const useUserGeoInit = () => {
  const map = useAtomValue(mapAtom)
  const [userLatLng, setUserLatLng] = useAtom(userLatLngAtom)
  const setUserMarker = useSetAtom(userMarkerAtom)
  const setGeolocationAvailable = useSetAtom(geolocationAvailableAtom)
  const { getMapMarkerIcon } = useDataUrls()
  const mapMarkerIcon = getMapMarkerIcon('user')

  // Geolocation API: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
  useGeolocated({
    ...USE_GEOLOCATED_DEFAULT_CONFIG,
    onSuccess: ({ coords }) => {
      setGeolocationAvailable(true)
      setUserLatLng({
        lat: DEV_MODE ? mockUserLatLng.lat : coords.latitude,
        lng: DEV_MODE ? mockUserLatLng.lng : coords.longitude,
      })
    },
    onError: () => {
      setGeolocationAvailable(false)
      if (DEV_MODE) {
        console.log('Geolocation is not available')
      }
    },
  })

  // Update user map marker
  useEffect(() => {
    if (!map || !userLatLng) {
      return
    }

    setUserMarker(
      new google.maps.Marker({
        position: userLatLng,
        map,
        icon: mapMarkerIcon,
      })
    )
  }, [map, userLatLng])
}
