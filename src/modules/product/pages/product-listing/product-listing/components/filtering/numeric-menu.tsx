'use client'

import React, { FunctionComponent } from 'react'
import { useClearRefinements, useNumericMenu } from 'react-instantsearch'
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
import { NumericMenuProps } from '@oriuminc/algolia'

export const NumericMenu: FunctionComponent<
  NumericMenuProps & { prefix: string }
> = (props) => {
  const { label, attribute, prefix } = props
  const { items, refine } = useNumericMenu(props)
  const { refine: clearRefine } = useClearRefinements({
    includedAttributes: [attribute],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: string
  ) => {
    if (e.target.checked) {
      refine(item)
    } else {
      clearRefine()
    }
  }

  return (
    <AccordionItem w='full' border='none' borderBottomWidth='0 !important'>
      {({ isExpanded }) => (
        <>
          <Heading>
            <AccordionButton
              px='0'
              borderBottom='md'
              borderBottomColor='var(--chakra-colors-gray-200)'
            >
              <Box flex='1' textAlign='left'>
                <Text>{label}</Text>
              </Box>
              {isExpanded ? (
                <MinusIcon color='inherit' fontSize='xs' />
              ) : (
                <AddIcon color='inherit' fontSize='xs' />
              )}
            </AccordionButton>
          </Heading>
          <AccordionPanel px='0-5'>
            <UnorderedList listStyleType='none' mx='0'>
              {items.map((item) => {
                return (
                  <Box w='full' key={item.label}>
                    <ListItem>
                      <Checkbox
                        colorScheme='shading'
                        id={`${prefix}_${item.label}`}
                        isChecked={item.isRefined}
                        onChange={(e) => handleChange(e, item.value)}
                        size='sm'
                      >
                        {item.label}
                      </Checkbox>
                    </ListItem>
                  </Box>
                )
              })}
            </UnorderedList>
          </AccordionPanel>
        </>
      )}
    </AccordionItem>
  )
}
