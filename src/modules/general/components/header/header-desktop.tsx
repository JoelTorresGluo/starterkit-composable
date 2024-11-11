'use client'

import { AspectRatio, useToken } from '@chakra-ui/react'
import { GlobalSearch, useComposable } from '@modules/general'
import { BloomreachGlobalSearch } from '@modules/general/components/search/bloomreach-global-search'
import { ConstructorGlobalSearch } from '@modules/general/components/search/constructor-global-search'
import { ComposableSiteConfig, INTL_CONFIG } from '@oriuminc/base'
import { BrandLogo, HeaderDesktop as UiDesktopHeader } from '@oriuminc/ui'
import { useCurrentLocale } from 'next-i18n-router/client'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import { useIntl } from 'react-intl'
import i18nConfig from '../../../../../i18nConfig'

export enum HeaderType {
  ALGOLIA = 0,
  CONSTRUCTOR,
  BLOOMREACH,
}

interface HeaderProps {
  cartQuantity?: number
  isLoggedIn: boolean
  logout: () => void
  userName?: string
  type?: HeaderType
  algoliaIndexNameResolver?: (props: {
    locale: string
    sortBy?: string | false
    isLoggedIn?: boolean
  }) => string
  algoliaQuerySuggestionsIndexNameResolver?: (props: {
    locale: string
    sortBy?: string
    isLoggedIn?: boolean
    querySuggestionsPostfix?: string
  }) => string
  constructorData?: {
    userId?: string
    clientId?: string
  }
  bloomreachData?: {}
  commercetoolsData?: {
    channelId?: string
  }
  siteConfig: ComposableSiteConfig | null
}

export const HeaderDesktop = ({
  cartQuantity,
  isLoggedIn,
  logout,
  userName,
  algoliaIndexNameResolver,
  algoliaQuerySuggestionsIndexNameResolver,
  constructorData,
  commercetoolsData,
  type = HeaderType.ALGOLIA,
  siteConfig,
}: HeaderProps) => {
  const intl = useIntl()
  const { path, cartDrawer, megaDrawer, accountDrawer } = useComposable()
  const router = useRouter()
  const currentPathname = usePathname()
  const currentLocale = useCurrentLocale(i18nConfig)
  const headerLogo = siteConfig?.brandLogo

  const handleChangeLocale = (newLocale: string) => {
    // set cookie for next-i18n-router
    const days = 30
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${date.toUTCString()};path=/`

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  //NOTE: Algolia search component or fallback to Constructor search
  const SearchComponent: ReactNode = useMemo(() => {
    algoliaIndexNameResolver && algoliaQuerySuggestionsIndexNameResolver
    switch (type) {
      case HeaderType.ALGOLIA:
        if (
          algoliaIndexNameResolver &&
          algoliaQuerySuggestionsIndexNameResolver
        ) {
          return (
            <GlobalSearch
              algoliaIndexNameResolver={algoliaIndexNameResolver}
              algoliaQuerySuggestionsIndexNameResolver={
                algoliaQuerySuggestionsIndexNameResolver
              }
            />
          )
        }
        throw new Error(
          'HeaderDesktop with type: HeaderType.ALGOLIA requires algoliaIndexNameResolver and algoliaQuerySuggestionsIndexNameResolver properties'
        )
      case HeaderType.CONSTRUCTOR:
        return <ConstructorGlobalSearch userId={constructorData?.userId} />
      case HeaderType.BLOOMREACH:
        return <BloomreachGlobalSearch />
    }
    return null
  }, [isLoggedIn, commercetoolsData?.channelId])

  const [sizeDeviceW] = useToken('sizes', ['sizes.deviceW'])

  return (
    <UiDesktopHeader
      homeUrl={path.getHome()}
      accountDashboardUrl={path.getAccountDashboard()}
      accountDashboardButtonText={intl.formatMessage({
        id: 'account.dashboard.title',
      })}
      loginUrl={path.getAccountLogin()}
      loginButtonText={intl.formatMessage({ id: 'action.login' })}
      logoutButtonText={intl.formatMessage({ id: 'action.logout' })}
      isLoggedIn={isLoggedIn}
      userName={userName}
      logout={logout}
      cartQuantity={cartQuantity}
      isCartDrawerOpen={cartDrawer.isOpen}
      isMegaDrawerOpen={megaDrawer.isOpen}
      ariaCartDrawerLabel={intl.formatMessage({
        id: 'aria.label.itemsInYourShoppingBag',
      })}
      ariaMegaDrawerLabel={intl.formatMessage({
        id: 'aria.label.openMainMenu',
      })}
      onOpenCartDrawer={() => cartDrawer.onOpen()}
      onOpenMegaDrawer={() => megaDrawer.onOpen()}
      onOpenAccountDrawer={() => accountDrawer.onOpen()}
      brandLogo={
        headerLogo && (
          <AspectRatio maxW='32' ratio={4 / 1}>
            <BrandLogo
              src={headerLogo.url}
              alt={siteConfig.name ?? ''}
              fill={true}
              sizes={`calc(${sizeDeviceW} / 5)`}
            />
          </AspectRatio>
        )
      }
      searchComponent={SearchComponent}
      intl={INTL_CONFIG}
      setLocale={handleChangeLocale}
      langSwitchTitle={intl.formatMessage({ id: 'text.languageSwitcher' })}
    />
  )
}
