'use client'

import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import { Text, Stack, Radio, Box, Button } from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useEffect, useRef } from 'react'

interface DetailedRichListProps {
  description?: React.ReactElement | string
  editOnClick?: () => void
  editButtonLabel?: string
  label?: string
  showDescription?: boolean
  size?: 'Large' | 'Small'
  shouldFocus?: boolean
}
interface DetailedRichListRadioProps extends DetailedRichListProps {
  type: 'Radio'
  radioValue: string | number
}
interface DetailedRichListIconProps extends DetailedRichListProps {
  type: 'Icon'
  icon: React.ReactElement
}

export const DetailedRichList = (
  props: DetailedRichListRadioProps | DetailedRichListIconProps
) => {
  const intl = useIntl()
  const radioRef = useRef<HTMLInputElement>(null)
  const isSelected = props.shouldFocus ?? false

  useEffect(() => {
    if (isSelected && radioRef.current) {
      radioRef.current.focus()
    }
  }, [])

  return (
    <Stack
      borderBottom='md'
      paddingBottom={4}
      maxWidth={props.size === 'Small' ? '343px' : 'full'}
    >
      <Box>
        {props.type === 'Radio' && (
          <Radio
            aria-label={props.label}
            size='lg'
            value={props.radioValue.toString()}
            _checked={{
              borderWidth: 6,
              borderColor: 'primary',
            }}
            ref={radioRef}
          >
            <Text textStyle='mobile-200'>{props.label}</Text>
          </Radio>
        )}
        {props.type === 'Icon' && (
          <Text>
            <IoCheckmarkCircleOutline></IoCheckmarkCircleOutline> {props.label}
          </Text>
        )}
        {props.editOnClick && (
          <Button
            size='sm'
            color='text'
            variant='ghost'
            textDecoration='underline'
            onClick={props.editOnClick}
          >
            {props.editButtonLabel ?? intl.formatMessage({ id: 'action.edit' })}
          </Button>
        )}
      </Box>
      <Box pl='5'>
        {typeof props.description === 'string' ? (
          <Text textStyle='blockquote-75'>{props.description}</Text>
        ) : (
          props.description
        )}
      </Box>
    </Stack>
  )
}
