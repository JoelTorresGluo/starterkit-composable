import { Box, Checkbox, Stack } from '@chakra-ui/react'
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch'
import { RefinementBox } from '../../../ui/refinement-box'

export interface RefinementListProps {
  title: string
  refinementListProps: UseRefinementListProps
}

export const RefinementList = ({
  title,
  refinementListProps,
}: RefinementListProps) => {
  const { items, refine } = useRefinementList(refinementListProps)

  return (
    <RefinementBox rootProps={{ mb: 5 }} title={title}>
      <Stack spacing='1' direction='column'>
        {items.map((item) => {
          return (
            <Checkbox
              key={item.label}
              id={item.label}
              isChecked={item.isRefined}
              onChange={() => refine(item.value)}
            >
              <Box as='span' color='text'>
                {item.label}
              </Box>
              <Box as='span' color='gray.500' ml='1'>
                {item.count}
              </Box>
            </Checkbox>
          )
        })}
      </Stack>
    </RefinementBox>
  )
}
