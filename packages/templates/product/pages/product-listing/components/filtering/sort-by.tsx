import { Flex, FormControl, FormLabel, Select, Text } from '@chakra-ui/react'
import { useSortBy, UseSortByProps } from 'react-instantsearch'
import { useIntl } from 'react-intl'

interface SortByProps extends UseSortByProps {
  prefix?: string
  indexNameResolver: (props: {
    locale: string
    sortBy?: string
    isLoggedIn?: boolean
  }) => string
}

export const SortBy = (props: SortByProps) => {
  const { items, indexNameResolver, prefix = '' } = props
  const { currentRefinement, refine } = useSortBy(props)

  const intl = useIntl()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value
    refine(selectValue)
  }

  const selectId = `${prefix}_indexSortSelect_${currentRefinement}`

  return (
    <Flex direction='column'>
      <FormLabel htmlFor={selectId} fontSize='sm'>
        {intl.formatMessage({ id: 'category.filters.sortBy' })}
      </FormLabel>
      <Select
        id={selectId}
        fontSize='base'
        value={currentRefinement}
        onChange={(e) => handleChange(e)}
      >
        {items.map((item) => (
          <option
            style={{
              fontWeight: item.value === currentRefinement ? 'bold' : undefined,
            }}
            key={item.value}
            value={indexNameResolver({
              locale: intl.locale,
              sortBy: item.value,
            })}
          >
            {item.label}
          </option>
        ))}
      </Select>
    </Flex>
  )
}
