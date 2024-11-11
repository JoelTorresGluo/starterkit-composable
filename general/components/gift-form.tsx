'use client'

import { Box, Grid, GridItem } from '@chakra-ui/react'
import { CheckboxField, InputField, TextareaField } from '@oriuminc/ui'
import { useIntl } from 'react-intl'
import { ChangeEvent, useState } from 'react'

const MESSAGE_FIELD_MAX_CHARS = 250

export const GiftForm = () => {
  const intl = useIntl()
  const [isGift, setIsGift] = useState(false)
  const [message, setMessage] = useState('')

  const handleIsGiftChange = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    setIsGift(checked)
  }

  const handleMessageChange = ({
    target: { value },
  }: ChangeEvent<HTMLTextAreaElement>) => {
    if (value.length <= MESSAGE_FIELD_MAX_CHARS) {
      setMessage(value)
    }
  }

  return (
    <Box>
      <Box my='sm'>
        <CheckboxField
          content={intl.formatMessage({
            id: 'checkout.giftForm.checkboxLabel',
          })}
          checkboxProps={{ name: 'save-address', onChange: handleIsGiftChange }}
        />
      </Box>

      {isGift && (
        <Grid
          gridTemplateAreas={{
            base: `"to" "from" "message"`,
            md: `"to from" "message message"`,
          }}
          gap='sm'
        >
          <GridItem area='to'>
            <InputField
              label={intl.formatMessage({
                id: 'checkout.giftForm.toLabel',
              })}
              inputProps={{ name: 'to' }}
            />
          </GridItem>
          <GridItem area='from'>
            <InputField
              label={intl.formatMessage({
                id: 'checkout.giftForm.fromLabel',
              })}
              inputProps={{ name: 'from' }}
            />
          </GridItem>
          <GridItem area='message'>
            <TextareaField
              label={intl.formatMessage({
                id: 'checkout.giftForm.messageLabel',
              })}
              inputProps={{
                name: 'message',
                placeholder: intl.formatMessage({
                  id: 'checkout.giftForm.messagePlaceholder',
                }),
                value: message,
                onChange: handleMessageChange,
              }}
              caption={intl.formatMessage(
                {
                  id: 'checkout.giftForm.messageCounter',
                },
                {
                  chars_left: MESSAGE_FIELD_MAX_CHARS - message.length,
                  max_chars: MESSAGE_FIELD_MAX_CHARS,
                }
              )}
            />
          </GridItem>
        </Grid>
      )}
    </Box>
  )
}
