'use client'

import {
  Box,
  Button,
  ButtonProps,
  Collapse,
  HStack,
  Text,
  useDisclosure,
  useToken,
} from '@chakra-ui/react'
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5'
import { useIntl } from 'react-intl'

export interface SidebarAccordionProps {
  children: React.ReactElement
  expanded?: Boolean
  icon?: React.ReactElement
  label: string
  rootProps?: Omit<ButtonProps, 'children'>
}

export const SidebarAccordion = ({
  children,
  expanded,
  icon,
  label,
  rootProps,
}: SidebarAccordionProps) => {
  const [size6] = useToken('sizes', ['sizes.6'])

  const { isOpen, onToggle } = useDisclosure()
  const intl = useIntl()
  return (
    <>
      <Button
        aria-label={intl.formatMessage({ id: 'account.dashboard.title' })}
        aria-expanded={isOpen}
        borderBottom={{ base: 'sm', md: 'none' }}
        borderRadius='none'
        display='flex'
        h='12'
        justifyContent='space-between'
        onClick={onToggle}
        p='48'
        variant='unstyled'
        {...rootProps}
      >
        <HStack spacing='2' w='full' aria-hidden>
          {icon}
          <Text textStyle='blockquote-100'>{label}</Text>
        </HStack>
        {isOpen ? (
          <IoChevronDownOutline aria-hidden size={size6} />
        ) : (
          <IoChevronUpOutline aria-hidden size={size6} />
        )}
      </Button>

      <Collapse in={expanded ? !isOpen : isOpen} animateOpacity>
        <Box padding='4'>{children}</Box>
      </Collapse>
    </>
  )
}
