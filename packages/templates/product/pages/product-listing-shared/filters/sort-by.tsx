import { Flex, FormLabel, Select } from '@chakra-ui/react'
import { SortOptionUI } from '../types'

interface SortByProps {
  label: string
  options: SortOptionUI[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  prefix?: string
}

export const SortBy = (props: SortByProps) => {
  const { label, options, onChange, prefix = '' } = props
  if (!options || options.length === 0) return null
  const selected =
    options.find((opt) => opt.status === 'selected') ?? options[0]
  const _labelId = `${prefix}_${selected?.id}`
  return (
    <Flex direction='column'>
      <FormLabel htmlFor={_labelId} fontSize='sm'>
        {label}
      </FormLabel>
      <Select
        id={_labelId}
        fontSize='base'
        value={selected.value}
        onChange={(e) => onChange(e)}
      >
        {options.map((option) => (
          <option
            style={{
              fontWeight: option.value === selected.value ? 'bold' : undefined,
            }}
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>
    </Flex>
  )
}
