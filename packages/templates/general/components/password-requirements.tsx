import { Box, ListItem, UnorderedList, Text } from '@chakra-ui/react'
import { useIntl } from 'react-intl'

export const PasswordRequirements = () => {
  const intl = useIntl()
  return (
    <Box textStyle={{ base: 'blockquote-75', md: 'blockquote-75' }}>
      <Text>
        {intl.formatMessage({
          id: 'account.dashboard.password.requirements.line1',
        })}
      </Text>
      <UnorderedList pl='1'>
        <ListItem>
          {intl.formatMessage({
            id: 'account.dashboard.password.requirements.line2',
          })}
        </ListItem>
        <ListItem>
          {intl.formatMessage({
            id: 'account.dashboard.password.requirements.line3',
          })}
        </ListItem>
      </UnorderedList>
    </Box>
  )
}
