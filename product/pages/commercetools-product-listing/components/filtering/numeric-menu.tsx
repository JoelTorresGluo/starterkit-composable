import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'
import { useRefinements } from '../../hooks'
import { RefinementNumericItem } from '../../types'
import { useCommercetoolsSearch } from '../provider'

interface NumericMenuProps extends RefinementNumericItem {}

export const NumericMenu = ({ label, hidden, items }: NumericMenuProps) => {
  const { formatMessage } = useIntl()
  const { handleRefinement } = useRefinements()
  const { checked } = useCommercetoolsSearch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.id) return

    const [param, value] = e.target.id.split('|')

    handleRefinement({ param, value, checked: e.target.checked })
  }

  if (hidden) return null

  return (
    <AccordionItem w='full' border='0' borderBottomWidth='0 !important'>
      {({ isExpanded }) => (
        <>
          <Heading>
            <AccordionButton
              px='none'
              borderBottom='md'
              borderBottomColor='var(--chakra-colors-gray-200)'
            >
              <Box as='span' flex='1' textAlign='left' display='inline-block'>
                <Text as='span'>
                  {formatMessage({
                    id: `category.refinements.${label.toLocaleLowerCase()}`,
                  })}
                </Text>
              </Box>
              {isExpanded ? (
                <MinusIcon color='inherit' fontSize='xs' />
              ) : (
                <AddIcon color='inherit' fontSize='xs' />
              )}
            </AccordionButton>
          </Heading>
          <AccordionPanel px='0-5'>
            <UnorderedList listStyleType='none' mx='none'>
              {items.map((item) => {
                const id = `${label}|${item.label}`
                const isChecked = Boolean(checked[id])

                return (
                  <ListItem key={item.label}>
                    <Checkbox
                      colorScheme='shading'
                      id={id}
                      isChecked={isChecked}
                      onChange={handleChange}
                      size='sm'
                    >
                      {item.label}
                    </Checkbox>
                  </ListItem>
                )
              })}
            </UnorderedList>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
