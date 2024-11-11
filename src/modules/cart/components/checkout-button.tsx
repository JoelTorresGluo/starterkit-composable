'use client'

import { Button } from '@chakra-ui/react'
import { useCart } from '@modules/commerce'
import {
  BOLD_CHECKOUT_HOST,
  BOLD_COMMERCE_SHOP_ALIAS,
  ENABLE_BOLD_CHECKOUT,
  createHiddenField,
  useComposable,
} from '@modules/general'
import { getCurrency } from '@oriuminc/base'
import { api } from '@modules/trpc/react'
import { handleTimeout } from '@modules/utils'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

export enum CheckoutButtonEnum {
  Desktop = 'DESKTOP',
  Drawer = 'DRAWER',
}
export interface CheckoutButtonProps {
  style: CheckoutButtonEnum
}

const getDeviceInfo = () => {
  const isClient = typeof window !== 'undefined'
  const isIphone = !!navigator.userAgent.match(/iPhone/i)
  const isAndroid = !!navigator.userAgent.match(/Android/i)
  const windowWidth = isClient ? window.innerWidth : 1280
  // @ts-ignore
  const userAgentData = isClient ? navigator.userAgentData : {}
  return {
    userAgent: navigator.userAgent,
    platform:
      userAgentData?.platform ||
      (isIphone && 'iPhone') ||
      (isAndroid && 'Android') ||
      '',
    mobile:
      (isIphone || isAndroid || userAgentData?.mobile || windowWidth < 768) ??
      false,
    windowWidth: windowWidth,
    devicePixelRatio: window.devicePixelRatio,
  }
}

const redirectToBoldCheckout = ({
  accessToken,
  cartId,
  cartPath,
  currency,
  locale,
}: {
  accessToken: string
  cartId: string
  cartPath: string
  currency: string
  locale: string
}) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const returnUrl = `${origin}/${locale}${cartPath}`
  const formElement = document.createElement('form')
  // Get device info
  const deviceInfo = getDeviceInfo()
  const fields = [
    createHiddenField('platform', 'commercetools'),
    createHiddenField('language_iso', locale),
    createHiddenField('shop', BOLD_COMMERCE_SHOP_ALIAS),
    createHiddenField('return_url', returnUrl),
    createHiddenField('cart_id', cartId),
    createHiddenField('user_access_token', accessToken),
    createHiddenField('currency_iso_name', currency),
    createHiddenField('customer_id', ''),
    createHiddenField('checkout_local_time', new Date().getTime().toString()),
    createHiddenField('flow_id', deviceInfo.mobile ? 'mobile' : 'desktop'),
    createHiddenField('device_info', JSON.stringify(deviceInfo)),
  ]

  fields.forEach((field) => formElement.appendChild(field))
  formElement.method = 'POST'
  formElement.action = `${BOLD_CHECKOUT_HOST}/checkout/build_order_begin`
  document.body.appendChild(formElement)
  formElement.submit()
}

function checkoutButtonStyleProps(style: CheckoutButtonEnum) {
  switch (style) {
    case CheckoutButtonEnum.Desktop:
      return {
        size: 'lg',
        w: 'full',
        maxW: 'full',
      }
    case CheckoutButtonEnum.Drawer:
      return {
        variant: 'solid',
        textStyle: { base: 'mobile-50', lg: 'mobile-200' },
        fontSize: { base: 'sm', lg: 'md' },
      }
  }
}

const useCheckoutButtonStatus = (placement: CheckoutButtonEnum) => {
  const isDrawer = placement === CheckoutButtonEnum.Drawer

  const [isLoading, _setIsLoading] = useState(false)
  const { cartDrawer } = useComposable()

  const didClickButton = useCallback(() => {
    _setIsLoading(true)
    handleTimeout(() => _setIsLoading(false), 5000)
  }, [])

  const doneClickButton = useCallback(() => {
    if (isDrawer) {
      handleTimeout(() => cartDrawer.onClose(), 1000)
    }
  }, [cartDrawer, isDrawer])

  const onClickIsLoadingHandler = useCallback(
    async (onClickFn: () => PromiseLike<void> | void) => {
      didClickButton()
      await onClickFn()
      doneClickButton()
    },
    [didClickButton, doneClickButton]
  )

  return { isLoading, onClickIsLoadingHandler }
}

const CheckoutButtonBold = (props: {
  buttonText: string
  buttonStyle: ReturnType<typeof checkoutButtonStyleProps>
}) => {
  const { buttonText, buttonStyle } = props
  const { path } = useComposable()
  const { locale } = useIntl()
  const currency = getCurrency(locale)
  const { isLoading, onClickIsLoadingHandler } = useCheckoutButtonStatus(
    CheckoutButtonEnum.Desktop
  )
  const { client } = api.useUtils()
  const cartId = useCart().cart.id ?? ''

  const redirectToBold = useCallback(async () => {
    const accessToken =
      (await client.commerce.getAccessToken.query())?.access_token ?? ''
    redirectToBoldCheckout({
      accessToken,
      cartId,
      cartPath: path.getCart(),
      currency,
      locale,
    })
  }, [cartId, currency, locale, path])

  const onClick = useCallback(async () => {
    await onClickIsLoadingHandler(redirectToBold)
  }, [onClickIsLoadingHandler, redirectToBold])

  return (
    <Button {...buttonStyle} isLoading={isLoading} onClick={onClick}>
      {buttonText}
    </Button>
  )
}

const CheckoutButtonInline = (props: {
  buttonText: string
  buttonStyle: ReturnType<typeof checkoutButtonStyleProps>
}) => {
  const router = useRouter()
  const { cart } = useCart()
  const { path, cartDrawer } = useComposable()

  const { buttonText, buttonStyle } = props
  const { isLoading, onClickIsLoadingHandler: onClickIsLoadingHandler } =
    useCheckoutButtonStatus(CheckoutButtonEnum.Desktop)

  const navigateToCheckout = useCallback(async () => {
    await router.push(cart.checkoutUrl ?? path.getCheckout())
  }, [path, router])

  const onClickTrackingStatus = useCallback(async () => {
    await onClickIsLoadingHandler(async () => {
      cartDrawer.onClose()
      await navigateToCheckout()
    })
  }, [onClickIsLoadingHandler, navigateToCheckout])

  return (
    <Button
      {...buttonStyle}
      isLoading={isLoading}
      onClick={onClickTrackingStatus}
    >
      {buttonText}
    </Button>
  )
}

export const CheckoutButton = ({ style }: CheckoutButtonProps) => {
  const intl = useIntl()

  const buttonText = useMemo(
    () => intl.formatMessage({ id: 'action.checkout' }),
    [intl]
  )
  const buttonStyle = useMemo(() => checkoutButtonStyleProps(style), [style])
  const props = useMemo(() => {
    return { buttonText, buttonStyle }
  }, [buttonText, buttonStyle])

  if (ENABLE_BOLD_CHECKOUT) {
    return <CheckoutButtonBold {...props} />
  } else {
    return <CheckoutButtonInline {...props} />
  }
}
