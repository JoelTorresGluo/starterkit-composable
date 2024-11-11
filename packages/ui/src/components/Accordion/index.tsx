'use client'

import { ReactNode } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import {
  Accordion as ChackraAccordion,
  AccordionProps as ChackraAccordionProps,
  AccordionButton,
  AccordionButtonProps as ChackraAccordionButtonProps,
  AccordionItem,
  AccordionItemProps as ChackraAccordionItemProps,
  AccordionPanel,
  AccordionPanelProps as ChackraAccordionPanelProps,
  Flex,
  Text,
  useToken,
} from '@chakra-ui/react'

type DefaultStyleItemType = {
  fontSize: string
  textStyle?: string
  height: string
}

type DefaultStylesTypes = {
  small: DefaultStyleItemType
  medium: DefaultStyleItemType
  large: DefaultStyleItemType
}

const DefaultStyles: DefaultStylesTypes = {
  small: {
    fontSize: 'sm',
    height: '10',
  },
  medium: {
    fontSize: 'base',
    height: '14',
  },
  large: {
    fontSize: 'lg',
    textStyle: 'body-300',
    height: '16',
  },
}

export interface AccordionProps {
  accordionButtonProps?: ChackraAccordionButtonProps
  accordionItemProps?: ChackraAccordionItemProps
  accordionPanelProps?: ChackraAccordionPanelProps
  accordionProps?: ChackraAccordionProps
  items?: AccordionItemProps[]
  showLeftIcon?: boolean
  showRightIcon?: boolean
  size?: AccordionSize
}

export type AccordionItemProps = {
  label: String
  content?: ReactNode
  isDisabled?: boolean
}

export type AccordionSize = 'small' | 'medium' | 'large'

export const Accordion = ({
  accordionButtonProps,
  accordionItemProps,
  accordionPanelProps,
  accordionProps,
  items = [],
  showLeftIcon = false,
  showRightIcon = true,
  size = 'medium',
}: AccordionProps) => {
  const [sizePx] = useToken('sizes', ['sizes.px'])

  if (!items || items.length === 0) {
    return null
  }

  const renderLeftIcon = (fontSize: string) => (
    <AddIcon fontSize={fontSize} mr='4' />
  )

  const renderRightIcon = (isExpanded: boolean, fontSize: string) => {
    return (
      <AddIcon
        fontSize={fontSize}
        transform={isExpanded ? 'rotateY(0deg) rotate(45deg)' : ''}
        transition='transform 0.2s ease'
      />
    )
  }

  return (
    <Flex flexDirection='column' justifyContent='center'>
      <ChackraAccordion allowToggle w='full' mt='0' {...accordionProps}>
        {items.map((item, index) => {
          const label = item?.label ?? ''
          const content = item?.content
          const isDisabled = item?.isDisabled ?? false
          const fontSize = DefaultStyles[size].fontSize
          const itemHeight = DefaultStyles[size].height
          const textStyle = DefaultStyles[size].textStyle ?? undefined

          return (
            <AccordionItem
              border='0'
              isDisabled={isDisabled}
              key={index}
              {...accordionItemProps}
            >
              {({ isExpanded }) => (
                <>
                  <h2
                  // TODO: Investigate why not using Heading component
                  >
                    <AccordionButton
                      h={itemHeight}
                      {...accordionButtonProps}
                      borderBottom='sm'
                      mb={`calc(${sizePx} * -1)`}
                    >
                      {showLeftIcon && renderLeftIcon(fontSize)}
                      <Text
                        as='span'
                        flex='1'
                        textAlign='left'
                        fontSize={fontSize}
                        textStyle={textStyle}
                      >
                        {label}
                      </Text>
                      {showRightIcon && renderRightIcon(isExpanded, fontSize)}
                    </AccordionButton>
                  </h2>
                  <AccordionPanel p='4' mx='2' {...accordionPanelProps}>
                    {content}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          )
        })}
      </ChackraAccordion>
    </Flex>
  )
}
