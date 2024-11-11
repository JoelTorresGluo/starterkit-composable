import {
  Table,
  Text,
  Tr,
  Tbody,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react'

export const ContentHours = () => {
  return (
    <Box>
      <Text px='4' my='6' textStyle='blockquote-75'>
        Lorem ipsum dolor:
      </Text>

      <TableContainer>
        <Table variant='simple'>
          <Tbody>
            <Tr>
              <Td px='4' fontWeight='bold'>
                Store
              </Td>
              <Td px='4'>Open 24h</Td>
            </Tr>
            <Tr>
              <Td px='4' fontWeight='bold'>
                Mobile Ordering
              </Td>
              <Td px='4'></Td>
            </Tr>
            <Tr>
              <Td px='4'>In-store Pickup Hours</Td>
              <Td px='4'>6am - 10pm</Td>
            </Tr>
            <Tr>
              <Td px='4'>Curbside Hours</Td>
              <Td px='4'>6am - 8pm</Td>
            </Tr>
            <Tr>
              <Td px='4' fontWeight='bold'>
                Kitchen
              </Td>
              <Td px='4'></Td>
            </Tr>
            <Tr>
              <Td px='4'>Breakfast Hours</Td>
              <Td px='4'>6am - 10.30am</Td>
            </Tr>
            <Tr>
              <Td px='4'>Lunch/Dinner Hours</Td>
              <Td px='4'>6pm - 11pm</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
