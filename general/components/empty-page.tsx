import { Button, Flex, Text, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'

interface OrderHistoryEmptyProps {
  title: string
  description: string
  buttonLabel: string
  buttonHref: string
  buttonOnClick?: (() => void) | undefined
}

export const EmptyPage = ({
  title,
  description,
  buttonLabel,
  buttonHref,
  buttonOnClick,
}: OrderHistoryEmptyProps) => {
  return (
    <Flex
      bg='shading.100'
      p='8'
      h='xl'
      justifyContent='center'
      alignItems='center'
    >
      <VStack spacing='4'>
        <Text textStyle='desktop-300'>{title}</Text>

        <Text textStyle='blockquote-100'>{description}</Text>
        <Button
          as={NextLink}
          href={buttonHref}
          variant='solid'
          type='submit'
          fontSize='mobile-50'
          fontWeight='bold'
          onClick={buttonOnClick}
        >
          {buttonLabel}
        </Button>
      </VStack>
    </Flex>
  )
}
