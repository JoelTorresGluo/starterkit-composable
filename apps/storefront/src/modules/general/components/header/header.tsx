'use client'

import { useCart, useUser } from '@modules/commerce'
import {
  algoliaIndexNameResolver,
  algoliaQuerySuggestionsIndexNameResolver,
  useComposable,
  useHandleError,
} from '@modules/general'
import { HeaderDesktop, HeaderType } from './header-desktop'
import { useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { ComposableSiteConfig } from '@oriuminc/base'
import { useIntl } from 'react-intl'

export const Header = ({
  siteConfig,
}: {
  siteConfig: ComposableSiteConfig | null
}) => {
  const intl = useIntl()
  const { createHandleError } = useHandleError()
  const { path } = useComposable()
  const { cart } = useCart()
  const { logout, isLoggedIn, session, customer } = useUser()

  const userName = `${session?.firstName?.charAt(0).toUpperCase() ?? ''}${
    session?.lastName?.charAt(0).toUpperCase() ?? ''
  }`
  const pathname = usePathname()

  const handleLogout = () => {
    logout.mutate(
      { callbackUrl: path.getHome() },
      {
        onError: createHandleError(),
      }
    )
  }

  const headerType = useMemo(() => {
    const urlLocalePrefix =
      intl.locale === intl.defaultLocale ? '' : `/${intl.locale}`
    if (pathname.startsWith(urlLocalePrefix + path.getConstructorIo())) {
      return HeaderType.CONSTRUCTOR
    }
    if (pathname.startsWith(urlLocalePrefix + path.getBloomreach())) {
      return HeaderType.BLOOMREACH
    }
    return HeaderType.ALGOLIA
  }, [pathname, intl.locale, intl.defaultLocale])

  return (
    <HeaderDesktop
      key={headerType} // recreate the header component when headerType changes
      type={headerType}
      isLoggedIn={Boolean(isLoggedIn)}
      userName={userName}
      logout={handleLogout}
      cartQuantity={cart.itemsTotalQuantity}
      algoliaIndexNameResolver={algoliaIndexNameResolver}
      algoliaQuerySuggestionsIndexNameResolver={
        algoliaQuerySuggestionsIndexNameResolver
      }
      constructorData={{
        userId: customer?.id,
      }}
      siteConfig={siteConfig}
    />
  )
}
