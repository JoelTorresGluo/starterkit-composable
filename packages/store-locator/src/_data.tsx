import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { Root } from 'react-dom/client'

export interface Store {
  id: string
  description?: string
  service_options?: string[]
  offerings?: string[]
  dining_options?: string[]
  image_cover?: StoreImage
  image_gallery?: StoreImage[]
  title: string
  _geoloc: {
    lat: number
    lng: number
  }
  address1: string
  address2: string
  city: string
  state_or_province: string
  country_code: string
  postal_code: string
  phone: string
  is_home?: boolean
  is_curbside_pickup_available?: boolean

  timezone?: string
  open_hours?: StoreOpenHours
  open_overrides?: StoreOpenHours
}

export type StoreOpenHours = Record<
  string,
  | undefined
  | Array<{
      open: string
      close: string
    }>
>

export interface StoreImage {
  src: string
  alt?: string
}

export const storesAtom = atom<Store[] | null>(null)

export const bookmarksAtom = atomWithStorage<Store[]>('bookmarks', [])

export const directionsRendererAtom =
  atom<google.maps.DirectionsRenderer | null>(null)

export const directionsServiceAtom = atom<google.maps.DirectionsService | null>(
  null
)

export const userLatLngAtom = atom<{ lat: number; lng: number } | null>(null)

export const userMarkerAtom = atom<google.maps.Marker | null>(null)

export const geolocationAvailableAtom = atom<boolean>(true)

export const mapAtom = atom<google.maps.Map | null>(null)

export const infoWindowAtom = atom<google.maps.InfoWindow | null>(null)

export const infoWindowRootAtom = atom<Root | null>(null)

export const infoWindowElementAtom = atom<HTMLDivElement | null>(null)

export const markersAtom = atom<Record<string, google.maps.Marker>>({})

export const searchQueryAtom = atom<string>('')

export const asideDrawerAtom = atom<boolean>(false)

export const storeDetailsModalAtom = atom<boolean>(false)
