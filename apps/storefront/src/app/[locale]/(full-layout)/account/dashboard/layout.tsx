import { AccountDashboardPageLayout } from '@modules/account'
import {
  ENABLE_GOOGLE_STANDALONE_AUTOCOMPLETE,
  GoogleMapsScript,
} from '@modules/general'

export default function AccountDashboardLayout({
  children,
}: {
  children: React.ReactElement
}) {
  return (
    <>
      {ENABLE_GOOGLE_STANDALONE_AUTOCOMPLETE && <GoogleMapsScript />}
      <AccountDashboardPageLayout>{children}</AccountDashboardPageLayout>
    </>
  )
}
