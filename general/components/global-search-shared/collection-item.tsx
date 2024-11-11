import { useIntl } from 'react-intl'
import { IoClose, IoSearchOutline, IoTimeOutline } from 'react-icons/io5'
import { Box, HStack, IconButton, Highlight } from '@chakra-ui/react'

interface CollectionItemProps {
  inputValue: string
  name: string
  selected: boolean
  handleRemove?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => void
}

export const CollectionItem = ({
  inputValue,
  name,
  selected,
  handleRemove,
}: CollectionItemProps) => {
  const intl = useIntl()
  return (
    <HStack
      justifyContent={'start'}
      backgroundColor={selected ? 'blackAlpha.100' : 'transparent'}
      spacing={2}
      minH={7}
    >
      <HStack>
        <Box minW={'1rem'}>
          {handleRemove ? <IoTimeOutline /> : <IoSearchOutline />}
        </Box>
        <Box gap={0} fontWeight={inputValue.trim() ? 'bold' : 'normal'}>
          <Highlight
            query={inputValue.trim() ? inputValue : 'NO_QUERY_FOUND'}
            styles={{
              fontWeight: 'normal',
            }}
          >
            {name}
          </Highlight>
        </Box>
      </HStack>
      <Box>
        {handleRemove && (
          <IconButton
            maxH={7}
            tabIndex={-1}
            variant={'ghost'}
            icon={<IoClose />}
            minW={5}
            aria-label={`${intl.formatMessage({
              id: 'action.remove',
            })} ${name}`}
            color={'text'}
            _hover={{
              color: 'primary',
            }}
            _focus={{
              bg: 'transparent',
            }}
            onClick={(e) => handleRemove(e, name)}
          />
        )}
      </Box>
    </HStack>
  )
}
