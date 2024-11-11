import { Flex, FlexProps, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { useIntl } from 'react-intl'

interface ItemCountProps extends FlexProps {
  total?: number
}

export const ItemCount: FunctionComponent<ItemCountProps> = (props) => {
  const intl = useIntl()

  return (
    <Flex direction='column' {...props}>
      <Text fontSize={{ base: 'xs', lg: 'base' }} fontWeight='normal'>
        {intl.formatMessage({
          id: 'category.results.displaying',
        })}
      </Text>

      <Text
        fontSize={{ base: 'base', lg: 'lg' }}
        fontWeight='normal'
        color='gray.600'
      >
        {`${intl.formatMessage(
          {
            id: 'category.results.itemCount',
          },
          { itemCount: props.total || 0 }
        )}`}
      </Text>
    </Flex>
  )
}
