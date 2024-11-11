import { useIntl } from 'react-intl'
import { Box, Flex, Text, Button, Icon, useToken } from '@chakra-ui/react'
import { AiOutlineCheckCircle } from 'react-icons/ai'

interface CheckoutDetailItemProps {
  title: string
  details?: string[]
  onClickEdit?: () => void
}

export const CheckoutDetailItem = ({
  title,
  details,
  onClickEdit,
}: CheckoutDetailItemProps) => {
  const intl = useIntl()
  const editLabel = intl.formatMessage({
    id: 'action.edit',
  })
  const [size1] = useToken('sizes', ['sizes.1'])

  return (
    <Flex gap='3'>
      <Box aria-hidden='true'>
        <Icon
          as={AiOutlineCheckCircle}
          boxSize={5}
          position='relative'
          insetBlockStart={`calc(${size1} / 2)`}
        />
      </Box>
      <Box flex='1' display='flex' flexDirection='column' gap={1.5}>
        <Text textStyle='desktop-75'>{title}</Text>
        <Box>
          {details?.map((detailLine, index) => (
            <Text textStyle='body-75' key={index}>
              {detailLine}
            </Text>
          ))}
        </Box>
      </Box>
      {onClickEdit && (
        <Box>
          <Button
            variant='link'
            aria-label={`${editLabel} ${title}`}
            onClick={onClickEdit}
          >
            {editLabel}
          </Button>
        </Box>
      )}
    </Flex>
  )
}
