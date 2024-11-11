import {
  ENABLE_GOOGLE_STANDALONE_AUTOCOMPLETE,
  GoogleMapsScript,
} from '@modules/general'
import { Metadata } from 'next'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <>
      {ENABLE_GOOGLE_STANDALONE_AUTOCOMPLETE && <GoogleMapsScript />}
      {children}
    </>
  )
}
