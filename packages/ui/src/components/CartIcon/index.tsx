import { Flex, useToken } from '@chakra-ui/react'
import { IoBagOutline } from 'react-icons/io5'

interface CartIconProps {
  cartQuantity?: number
}

export const CartIcon = (props: CartIconProps) => {
  const [size7] = useToken('sizes', ['sizes.7'])
  const [colorText] = useToken('colors', ['colors.text'])

  return (
    <Flex w='fit-content' alignItems='center' justifyContent='end'>
      <IoBagOutline aria-hidden size={size7} color={colorText} />
      <Flex
        // TODO: Replace pixel values with tokens.
        transform='translate(8px, -10px)'
        alignItems='center'
        justifyContent='center'
        justifySelf='end'
        color='white'
        fontSize='sm'
        fontWeight='bold'
        borderRadius='full'
        bg={props.cartQuantity ? 'primary' : 'transparent'}
        px='1'
        maxH='5'
        minW='5'
        position='absolute'
      >
        {props.cartQuantity ? props.cartQuantity : ''}
      </Flex>
    </Flex>
  )
}
