import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'

interface CmsComponentErrorProps {
  id: string
  contentType: string
  headingText?: string
  errorMessageText?: string
  errors?: string[]
}

export const CmsComponentError = ({
  id,
  contentType,
  headingText = 'Component Error',
  errorMessageText,
  errors,
}: CmsComponentErrorProps) => {
  return (
    <Box m='5' p='5' border='sm' borderColor='danger.600'>
      <Heading>{headingText}</Heading>
      <Text>
        {errorMessageText ?? (
          <>
            The CMS component{' '}
            <Text as='span' fontWeight='bold'>
              {contentType}
            </Text>{' '}
            (id{' '}
            <Text as='span' fontWeight='bold'>
              {id}
            </Text>
            ) threw an error while parsing its fields.
          </>
        )}
      </Text>

      {errors && (
        <UnorderedList>
          {errors.map((error) => (
            <ListItem key={error}>{error}</ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  )
}
