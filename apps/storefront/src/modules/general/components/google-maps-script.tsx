import Script from 'next/script'
import { GOOGLE_MAPS_API_KEY } from '../constants'

export const GoogleMapsScript = () => {
  return (
    <Script
      id='google-maps-api'
      src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
      strategy='afterInteractive'
    />
  )
}
