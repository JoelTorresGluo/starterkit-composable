import { Text } from '@chakra-ui/react'
import { getServerIntl, getSupportedLocale } from '@modules/intl'
import { Locale } from '@oriuminc/base'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  const locale = getSupportedLocale(params.locale)
  const intl = await getServerIntl(locale)
  return {
    title: intl.formatMessage({ id: 'account.dashboard.menu.customerSupport' }),
  }
}

export default function SupportPage() {
  return <Text>SupportPage placeholder</Text>
}
