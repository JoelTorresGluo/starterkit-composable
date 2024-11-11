'use client'

import dynamic from 'next/dynamic'
import { useBreakpointValue } from '@chakra-ui/react'
import {
  BagSummary,
  CheckoutCartSummary,
  useCartManagement,
  useCustomerManagement,
  useOrderManagement,
  usePaymentManagement,
  useShippingManagement,
} from '@modules/checkout'
import { useCheckoutAnalytics } from '../hooks/use-checkout-analytics'
import { api } from '@modules/trpc/react'
import { BRAND_NAME } from '@modules/general'
import { Locale } from '@oriuminc/base'
import { useIntl } from 'react-intl'

const DynamicThreeStepCheckout = dynamic(
  () =>
    import('@oriuminc/checkout-app-router').then(
      (mod) => mod.ThreeStepCheckout
    ),
  { ssr: false }
)

export const ThreeStepExperience = () => {
  const intl = useIntl()
  const { data: siteConfig } = api.cms.getSiteConfig.useQuery({
    key: BRAND_NAME,
    locale: intl.locale as Locale,
  })

  const cartManagement = useCartManagement()
  const customerManagement = useCustomerManagement()
  const orderManagement = useOrderManagement()
  const paymentManagement = usePaymentManagement()
  const shippingManagement = useShippingManagement()

  const analytics = useCheckoutAnalytics()

  const hideSummary = useBreakpointValue({ base: false, md: true })

  return (
    <DynamicThreeStepCheckout
      customerManagement={customerManagement}
      cartManagement={cartManagement}
      paymentManagement={paymentManagement}
      orderManagement={orderManagement}
      shippingManagement={shippingManagement}
      MobileCartSummary={<BagSummary />}
      analytics={analytics}
      headerLogo={
        siteConfig?.brandLogo?.url
          ? {
              url: siteConfig?.brandLogo?.url,
              alt: siteConfig.name ?? '',
            }
          : undefined
      }
      DesktopCartSummary={
        <CheckoutCartSummary
          hideCheckoutButton
          displayTitle
          orderSummaryProps={{ bg: 'transparent', p: '0' }}
          showCartItems={hideSummary}
          textOverride={{ total: 'cart.summary.total' }}
        />
      }
    />
  )
}
