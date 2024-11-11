import { Box, Divider, List, ListItem, Text } from '@chakra-ui/react'
import { useHits } from 'react-instantsearch'
import { Hit } from '../shared/hit'

export const Hits = () => {
  const hits = useHits()
  return (
    <List aria-label=''>
      <Box mt='3xl' mb='lg' px='sm'>
        {hits.hits.length === 0 ? (
          <ListItem>
            <Text fontSize='sm'>noResults...</Text>
          </ListItem>
        ) : (
          hits.hits.map((hit, index) => (
            <ListItem key={hit.objectID}>
              <Hit hit={hit} />
              <Divider />
            </ListItem>
          ))
        )}
      </Box>
    </List>
  )
}
