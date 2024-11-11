import { Box, Flex } from '@chakra-ui/react'
import { CmsPreview, Footer } from '@modules/content'
import { MegaMenu } from '@modules/content/components/mega-menu'
import { MultiBrandPicker } from '@modules/content/components/multibrand-picker'
import {
  Header,
  LayoutDrawers,
  MEGA_MENU_ID,
  OfflineBanner,
} from '@modules/general'
import { getSupportedLocale } from '@modules/intl'
import { getMegaMenuCached, getSiteConfigCached } from '@modules/server/cache'
import { getServerPreviewData } from '@modules/server/preview/get-server-preview-data'
import { setServerLocale } from '@modules/server/server-context'
import { Locale } from '@oriuminc/base'
import { SkipLinks } from '@oriuminc/templates/navigation'
import { Suspense } from 'react'

export default async function RegularLayout({
  params,
  children,
}: {
  params: { locale: Locale }
  children: React.ReactNode
}) {
  const locale = getSupportedLocale(params.locale)
  setServerLocale(locale)
  const previewData = getServerPreviewData() ?? undefined
  const [megaMenu, footer, siteConfig] = await Promise.all([
    getMegaMenuCached(MEGA_MENU_ID.MAIN_NAV, locale, previewData),
    getMegaMenuCached(MEGA_MENU_ID.FOOTER, locale, previewData),
    getSiteConfigCached(locale, previewData),
  ])

  return (
    <>
      <Flex flexDirection='column' minH='100dvh' overflow='hidden'>
        <Suspense fallback={<></>}>
          <CmsPreview previewData={previewData} />
        </Suspense>
        <SkipLinks />
        <Box as='header' role='banner'>
          <MultiBrandPicker siteConfig={siteConfig} />
          <Header siteConfig={siteConfig} />
          <MegaMenu megaMenu={megaMenu} />
        </Box>
        <Box flexGrow='1' as='main' id='main'>
          {children}
        </Box>
        <Footer footer={footer} siteConfig={siteConfig} />
        <OfflineBanner />
      </Flex>
      <LayoutDrawers megaMenu={megaMenu} siteConfig={siteConfig} />
    </>
  )
}
