import { Box, Flex, Grid, GridItem, Radio } from '@chakra-ui/react'

interface ShippingOptionProps {
  id: string
  rate: string
  name: string
  description?: string
  selected?: boolean
  onSelect: () => void
}

export const ShippingOption = (props: ShippingOptionProps) => {
  const { id, rate, name, description, selected = false, onSelect } = props
  return (
    <Flex
      p='sm'
      gap='sm'
      alignItems='start'
      border='sm'
      borderRadius='base'
      borderColor={selected ? 'primary' : 'muted'}
      onClick={onSelect}
      cursor='pointer'
    >
      <Box>
        <Radio
          value={id}
          size='lg'
          inputProps={{ 'aria-label': `${name} ${rate}` }}
          position='relative'
          insetBlockStart='1'
        />
      </Box>
      <Grid
        as='p'
        w='full'
        justifyContent='space-between'
        templateAreas={`"name rate" "desc rate"`}
        gridTemplateColumns={'1fr min-content'}
      >
        <GridItem
          as='span'
          gridArea='name'
          fontWeight='extrabold'
          fontSize={{ base: 'xs', md: 'sm' }}
        >
          {name}
        </GridItem>
        <GridItem
          as='span'
          gridArea='rate'
          textAlign='end'
          color='text'
          fontSize='sm'
        >
          {rate}
        </GridItem>
        <GridItem
          as='span'
          gridArea='desc'
          color='text-muted'
          fontSize={{ base: 'xs', md: 'sm' }}
        >
          {description}
        </GridItem>
      </Grid>
    </Flex>
  )
}
