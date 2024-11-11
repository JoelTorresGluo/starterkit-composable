import { useComposable } from '@oriuminc/base'
import { BrandLogo, HeaderDesktop as UiDesktopHeader } from '@oriuminc/ui'
import { useIntl } from 'react-intl'
import {
  GlobalSearch,
  ConstructorGlobalSearch,
  BloomreachGlobalSearch,
  CommercetoolsGlobalSearch,
} from '../../general'
import { AspectRatio, useToken } from '@chakra-ui/react'
import { ReactElement, useMemo } from 'react'

export enum HeaderType {
  ALGOLIA = 0,
  CONSTRUCTOR,
  BLOOMREACH,
  COMMERCETOOLS,
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
}: HeaderProps) => {
  const intl = useIntl()
  const {
    path,
    siteConfig,
    cartDrawer,
    megaDrawer,
    accountDrawer,
    intl: intlOptions,
    setLocale,
  } = useComposable()

  const headerLogo = siteConfig?.brandLogo
  //NOTE: Algolia search component or fallback to Constructor search
  const SearchComponent: ReactElement = useMemo(() => {
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
      case HeaderType.COMMERCETOOLS:
        return (
          <CommercetoolsGlobalSearch
            channelId={commercetoolsData?.channelId}
            isLoggedIn={isLoggedIn}
          />
        )
    }
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
      intl={intlOptions}
      setLocale={setLocale}
      langSwitchTitle={intl.formatMessage({ id: 'text.languageSwitcher' })}
    />
  )
}
