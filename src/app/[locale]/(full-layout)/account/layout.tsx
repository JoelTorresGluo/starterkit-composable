import routeSegmentConfig from '@modules/server/next-cache-config'
import { Metadata } from 'next'

export const { dynamic } = routeSegmentConfig.accountPage

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AccountDashboardLayout({
  children,
}: {
  children: React.ReactElement
}) {
  return children
}
