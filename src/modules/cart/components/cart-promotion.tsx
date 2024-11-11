'use client'

import { useState } from 'react'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useCart } from '@modules/commerce'
import { useHandleError } from '@modules/general'
import { CartPromotionDiscount } from './cart-promotion-discount'

export const CartPromotion = () => {
  const intl = useIntl()
  const { applyCode, cart } = useCart()
  const { createHandleError } = useHandleError()
  const discountCodes = cart.discountCodes ?? []
  const [code, setCode] = useState('')

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          applyCode.mutate(
            { code },
            {
              onError: createHandleError(),
              onSettled: () => {
                setCode('')
              },
            }
          )
        }}
      >
        <InputGroup size='md'>
          <Input
            variant='outline'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={intl.formatMessage({ id: 'cart.coupon.title' })}
          />
          <InputRightElement w='fit-content'>
            <Button
              variant='solid'
              type='submit'
              minW='5.5rem'
              borderLeftRadius='none'
              isLoading={applyCode.isPending}
            >
              {intl.formatMessage({ id: 'cart.coupon.action.apply' })}
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>

      {discountCodes.map((discountCode) => {
        return (
          <CartPromotionDiscount
            key={discountCode.id}
            discount={discountCode}
          />
        )
      })}
    </>
  )
}
