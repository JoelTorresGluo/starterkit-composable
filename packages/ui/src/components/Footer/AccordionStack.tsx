'use client'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react'
import { LinkStack } from './LinkStack'
import { MegaMenuItemProps } from '../MegaMenu'

interface AccordionStackProps {
  itemData: MegaMenuItemProps
}

export const AccordionStack = ({ itemData }: AccordionStackProps) => {
  const { id, label, children } = itemData

  return (
    <Accordion allowToggle w='full' mt='0 !important'>
      <AccordionItem borderTop='none'>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton h='14'>
                <Box flex='1' textAlign='left'>
                  {label}
                </Box>
                {isExpanded ? (
                  <MinusIcon fontSize='xs' />
                ) : (
                  <AddIcon fontSize='xs' />
                )}
              </AccordionButton>
            </h2>
            <AccordionPanel pb='4'>
              {children?.map((child, idx) => {
                return (
                  child && (
                    <LinkStack key={`${idx}-${child.id}`} itemData={child} />
                  )
                )
              })}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}
