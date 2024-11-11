import { Button, Input, InputGroup } from '@chakra-ui/react'
import { useCart } from '@modules/commerce'
import { useHandleError } from '@modules/general'
import { ComposableDiscountCode } from '@oriuminc/commerce-generic'
import { useToast } from '@oriuminc/ui'
import { useState } from 'react'
import { useIntl } from 'react-intl'

export const CartPromotionDiscount = (props: {
  discount: ComposableDiscountCode
}) => {
  const intl = useIntl()
  const { discount } = props
  const { removeCode } = useCart()
  const toast = useToast()
  const { createHandleError } = useHandleError()
  const [code, setCode] = useState('')

  return (
    <InputGroup size='md'>
      <Input
        variant='filled'
        pointerEvents='none'
        borderRightRadius='none'
        readOnly={Boolean(discount)}
        value={discount.code ? discount.code : code}
        onChange={(e) => setCode(e.target.value)}
        placeholder={intl.formatMessage({ id: 'cart.coupon.title' })}
      />
      {discount && (
        <Button
          variant='outline'
          type='button'
          borderLeftRadius='none'
          isLoading={removeCode.isPending}
          onClick={() =>
            removeCode.mutate(
              { discountId: discount.id },
              {
                onSuccess: () => {
                  toast({
                    status: 'success',
                    title: intl.formatMessage({
                      id: 'cart.coupon.title',
                    }),
                    description: intl.formatMessage({
                      id: 'cart.coupon.remove.success',
                    }),
                  })
                },
                onError: createHandleError(),
              }
            )
          }
        >
          {intl.formatMessage({ id: 'action.remove' })}
        </Button>
      )}
    </InputGroup>
  )
}
