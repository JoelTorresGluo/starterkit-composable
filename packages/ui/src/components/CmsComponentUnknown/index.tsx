import { Box, Heading, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface CmsComponentPropsUnknown {
  id: string
  contentType: string
  message?: ReactNode
}

export const CmsComponentUnknown = ({
  id,
  contentType,
  message,
}: CmsComponentPropsUnknown) => {
  return (
    <Box m='5' p='5' border='sm' borderColor='danger.600'>
      <Heading>Component Not Found</Heading>
      {message ?? (
        <Text>
          The CMS component{' '}
          <Text as='span' fontWeight='bold'>
            {contentType}
          </Text>{' '}
          (id{' '}
          <Text as='span' fontWeight='bold'>
            {id}
          </Text>
          ) is not mapped to a React component. Check the rendering function.
        </Text>
      )}
    </Box>
  )
}
