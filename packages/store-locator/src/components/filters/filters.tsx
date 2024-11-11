import { Box, BoxProps, Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import { LinkButton } from '../../ui/link-button'

export const Filters = (props: { rootProps?: BoxProps }) => {
  return (
    <Box
      h='full'
      overflow='auto'
      display='flex'
      flexDirection='column'
      {...props.rootProps}
    >
      <Box px={8}>
        {new Array(5).fill(0).map((_, i) => {
          return (
            <Box key={i} mb={5}>
              <Box
                display='flex'
                justifyContent='space-between'
                textStyle='body-300'
                borderBottom='sm'
                borderColor='red'
                py={3}
                mb={3}
              >
                <Box>Store Food Options</Box>

                <LinkButton>Select All</LinkButton>
              </Box>
              <Box>
                <CheckboxGroup defaultValue={['3', '6']}>
                  <Stack spacing={1} direction='column'>
                    <Checkbox value='1'>Burgers & Sandwiches</Checkbox>
                    <Checkbox value='2'>Pizza</Checkbox>
                    <Checkbox value='3'>Freshly Brewed Coffee</Checkbox>
                    <Checkbox value='4'>Roller Grill</Checkbox>
                    <Checkbox value='5'>Pizza</Checkbox>
                    <Checkbox value='6'>Stackers, Bowls, Burritos</Checkbox>
                  </Stack>
                </CheckboxGroup>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}
