import { ChakraProvider } from '@modules/chakra'
import {
  Analytics,
  ComposableProvider,
  getMetadataAlternateLanguages,
} from '@modules/general'
import {
  ServerIntlProvider,
  getServerIntl,
  getSupportedLocale,
} from '@modules/intl'
import { getSiteConfigCached } from '@modules/server/cache'
import { TRPCReactProvider } from '@modules/trpc/react'
import { Locale, getTwitterMetaTag, parseUrlTemplate } from '@oriuminc/base'
import { Metadata } from 'next'
import i18nConfig from '../../../i18nConfig'
import { SpeedInsights } from '@vercel/speed-insights/next'

// generate static routes for all of our supported languages
// https://nextjs.org/docs/app/building-your-application/routing/internationalization#static-generation
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: {
    locale: Locale
  }
}): Promise<Metadata> {
  const locale = getSupportedLocale(params.locale)
  const siteConfig = await getSiteConfigCached(locale)

  return {
    title: {
      default: siteConfig?.name ?? '',
      template: siteConfig?.name ? `%s | ${siteConfig.name}` : '%s',
    },
    openGraph: {
      type: 'website',
      locale,
      url: parseUrlTemplate(siteConfig?.url) ?? undefined,
      siteName: siteConfig?.name ?? undefined,
    },
    icons: siteConfig?.shortcutIcon?.url,
    alternates: getMetadataAlternateLanguages(),
    twitter: getTwitterMetaTag(),
  }
}

export default async function RootLayout({
  params,
  children,
}: {
  params: { locale: Locale }
  children: React.ReactNode
}) {
  const locale = getSupportedLocale(params.locale)
  const intl = await getServerIntl(locale)
  return (
    <html lang={locale}>
      <body>
        <TRPCReactProvider>
          <ServerIntlProvider messages={intl.messages} locale={locale}>
            <ComposableProvider>
              <ChakraProvider>
                <Analytics />
                {children}
              </ChakraProvider>
            </ComposableProvider>
          </ServerIntlProvider>
        </TRPCReactProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
