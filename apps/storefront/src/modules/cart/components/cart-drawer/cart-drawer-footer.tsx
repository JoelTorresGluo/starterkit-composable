'use client'

import { Button, Flex, HStack, Stack, VStack, Text } from '@chakra-ui/react'
import {
  CartPromotion,
  CheckoutButton,
  CheckoutButtonEnum,
} from '@modules/cart'
import { useCart } from '@modules/commerce'
import { useComposable } from '@modules/general'
import { getCurrency } from '@oriuminc/base'
import { handleTimeout } from '@modules/utils'
import { CartPromotionAccordion } from '@oriuminc/templates/cart'
import { useRouter } from 'next/navigation'
import { ReactNode, useState } from 'react'
import { FormatNumberOptions, useIntl } from 'react-intl'

interface CartDrawerFooterItemProps {
  label: string
  value?: string
  children?: ReactNode
}

const CartDrawerFooterItem = (props: CartDrawerFooterItemProps) => {
  const { label, value, children } = props
  return (
    <Flex justify='space-between' fontSize='sm'>
      <Text fontWeight='medium' color='gray.600'>
        {label}
      </Text>
      {value ? <Text fontWeight='medium'>{value}</Text> : children}
    </Flex>
  )
}

export const CartDrawerFooter = () => {
  const intl = useIntl()
  const currency = getCurrency(intl.locale)
  const router = useRouter()
  const { path, cartDrawer } = useComposable()
  const { cart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const formatNumberOptions: FormatNumberOptions = {
    currency,
    style: 'currency',
  }

  const estimatedTotal =
    cart?.price?.total !== undefined
      ? intl.formatNumber(cart?.price?.total / 100, formatNumberOptions)
      : null

  return (
    <Stack spacing='6' w='full'>
      <Stack spacing='4'>
        <CartPromotionAccordion
          isOpen={Boolean(cart.discountCodes?.length)}
          hideBorderTop={true}
          showDiscount={
            <CartDrawerFooterItem
              label={intl.formatMessage({
                id: 'cart.summary.discount',
              })}
            />
          }
        >
          <CartPromotion />
        </CartPromotionAccordion>
      </Stack>
      <Flex justify='space-between' align='center' wrap='wrap'>
        <VStack align='left' spacing='none'>
          <Text as='h2' textStyle='eyebrow' color='text-muted'>
            {intl.formatMessage({ id: 'cart.summary.estimatedTotal' })}
          </Text>
          <Text as='h2' textStyle='desktop-100-200'>
            {estimatedTotal}
          </Text>
        </VStack>
        <HStack flexGrow='9999' justifyContent='flex-end'>
          <Button
            onClick={() => {
              setIsLoading(true)
              router.push(path.getCart())
              cartDrawer.onClose()
              handleTimeout(() => {
                setIsLoading(false)
              }, 1000)
            }}
            isLoading={isLoading}
            color='primary'
            variant='outline'
            textStyle={{ base: 'mobile-50', lg: 'mobile-200' }}
            fontSize={{ base: 'sm', lg: 'md' }}
          >
            {intl.formatMessage({ id: 'action.viewBag' })}
          </Button>
          <CheckoutButton style={CheckoutButtonEnum.Drawer} />
        </HStack>
      </Flex>
    </Stack>
  )
}
