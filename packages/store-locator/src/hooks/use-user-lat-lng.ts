import { useAtomValue } from 'jotai'
import { geolocationAvailableAtom, Store, userLatLngAtom } from '../_data'
import { getDistance } from '../utils/get-distance'

export const useUserLatLng = () => {
  const userLatLng = useAtomValue(userLatLngAtom)
  const geolocationAvailable = useAtomValue(geolocationAvailableAtom)

  return {
    userLatLng,
    geolocationAvailable,
    getMapsLink: (store: Store) => {
      const origin = userLatLng
        ? `&origin=${userLatLng?.lat},${userLatLng?.lng}`
        : ''
      return `https://www.google.com/maps/dir/?api=1${origin}&destination=${store?._geoloc.lat},${store?._geoloc.lng}`
    },

    getDistance: (store: Store) => {
      if (!userLatLng) {
        return undefined
      }

      const value = getDistance(
        { lat: userLatLng.lat, lng: userLatLng.lng },
        { lat: store._geoloc.lat, lng: store._geoloc.lng }
      )
      return value ? value / 1000 : undefined
    },
  }
}
