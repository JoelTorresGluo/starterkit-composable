import { Box, Checkbox, Stack } from '@chakra-ui/react'
import { RefinementBox } from '../../ui/refinement-box'

export const Filters = () => {
  const checkboxes = [
    'Burgers & Sandwiches',
    'Pizza',
    'Freshly Brewed Coffee',
    'Roller Grill',
    'Lorem Ipsum',
    'Stackers, Bowls, Burritos',
  ]

  return (
    <Box
      h='full'
      overflow='auto'
      display='flex'
      flexDirection='column'
      // TODO: Replace pixel value with token.
      pb='50px'
    >
      <Box px='8' pb='16'>
        {new Array(5).fill(0).map((_, i) => {
          return (
            <RefinementBox
              key={i}
              rootProps={{ mb: 5 }}
              title='Store Food Options'
              onSelectAll={() => console.log('Select All')}
            >
              <Stack spacing='1' direction='column'>
                {checkboxes.map((label, idx) => {
                  return (
                    <Checkbox
                      key={`${label}-${idx}-${i}`}
                      id={label}
                      // isChecked={false}
                      // onChange={() => refine(idx)}
                    >
                      <Box as='span' color='text'>
                        {label}
                      </Box>
                      <Box as='span' color='gray.500' ml='2'>
                        {idx + 1}
                      </Box>
                    </Checkbox>
                  )
                })}
              </Stack>
            </RefinementBox>
          )
        })}
      </Box>
    </Box>
  )
}
