import { useAtomValue } from 'jotai'
import {
  directionsRendererAtom,
  directionsServiceAtom,
  infoWindowAtom,
  infoWindowElementAtom,
  infoWindowRootAtom,
  mapAtom,
  markersAtom,
} from '../_data'

export const useMapApi = () => {
  const directionsService = useAtomValue(directionsServiceAtom)
  const directionsRenderer = useAtomValue(directionsRendererAtom)
  const infoWindowRoot = useAtomValue(infoWindowRootAtom)
  const infoWindowElement = useAtomValue(infoWindowElementAtom)
  const map = useAtomValue(mapAtom)
  const infoWindow = useAtomValue(infoWindowAtom)
  const markers = useAtomValue(markersAtom)
  const mapReady = Boolean(infoWindow && infoWindowRoot && map)

  return {
    mapReady,
    directionsService,
    directionsRenderer,
    infoWindowRoot,
    infoWindowElement,
    infoWindow,
    map,
    markers,
  }
}
