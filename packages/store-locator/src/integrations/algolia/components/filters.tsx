import { Box, BoxProps, Checkbox, Stack } from '@chakra-ui/react'
import { RefinementList, RefinementListProps } from './refinement-list'
import { useToggleRefinement } from 'react-instantsearch'
import { RefinementBox } from '../../../ui/refinement-box'

export const Filters = (props: { rootProps?: BoxProps }) => {
  const refinements: RefinementListProps[] = [
    {
      title: 'Service Options',
      refinementListProps: {
        attribute: 'service_options',
      },
    },
    {
      title: 'Offerings',
      refinementListProps: {
        attribute: 'offerings',
      },
    },
    {
      title: 'Dining Options',
      refinementListProps: {
        attribute: 'dining_options',
      },
    },
  ]

  const { refine: curbsideRefine, value: curbsideValue } = useToggleRefinement({
    attribute: 'is_curbside_pickup_available',
  })

  return (
    <Box
      h='100%'
      overflow='auto'
      display='flex'
      flexDirection='column'
      paddingBottom='16'
      {...props.rootProps}
    >
      <Box px={{ base: '4', md: '8' }} pb='16'>
        {refinements.map((props) => {
          return <RefinementList key={props.title} {...props} />
        })}

        <RefinementBox title='Other'>
          <Stack spacing={1} direction='column'>
            <Checkbox
              isChecked={curbsideValue.isRefined}
              onChange={(e) => curbsideRefine({ isRefined: !e.target.checked })}
            >
              <Box as='span' color='text'>
                Curbside Pickup
              </Box>
              <Box as='span' color='gray.500' ml={2}>
                {curbsideValue.count}
              </Box>
            </Checkbox>
          </Stack>
        </RefinementBox>
      </Box>
    </Box>
  )
}
