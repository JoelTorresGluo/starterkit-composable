export const getDistance = (
  a: { lat: number; lng: number },
  b: { lat: number; lng: number }
) => {
  if (!google?.maps?.geometry?.spherical) {
    return
  }

  const latLng1 = new google.maps.LatLng(a.lat, a.lng)
  const latLng2 = new google.maps.LatLng(b.lat, b.lng)

  return google.maps.geometry.spherical.computeDistanceBetween(latLng1, latLng2)
}
