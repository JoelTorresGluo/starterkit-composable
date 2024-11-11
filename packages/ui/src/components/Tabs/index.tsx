'use client'
import { ReactNode } from 'react'
import {
  Box,
  Tabs as ChakraTabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

export interface TabsProps {
  showLeftIcon?: boolean
  showRightIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
  tabs?: TabItemProps[]
  variant?: TabVariant
}

export type TabItemProps = {
  label: String
  content?: ReactNode
}
export type TabVariant = 'line' | 'soft-rounded' | 'solid-rounded' | 'highlight'

export const Tabs = ({
  showLeftIcon = false,
  showRightIcon = false,
  size = 'md',
  tabs = [],
  variant = 'line',
}: TabsProps) => {
  if (!tabs || tabs.length === 0) {
    return null
  }

  const iconSize = size === 'sm' ? 4 : size === 'md' ? 5 : 6
  const tabGap = size === 'sm' ? 1 : size === 'md' ? 2 : 2

  return (
    <Box display='flex' flexDirection='column' justifyContent='center'>
      <ChakraTabs py='2' variant={variant} size={size}>
        <TabList flexWrap='wrap'>
          {tabs.map((tab, index) => (
            <Tab gap={tabGap} key={index}>
              {showLeftIcon && (
                <CheckIcon mr={2.5} color='inherit' h={iconSize} w={iconSize} />
              )}
              {tab.label}
              {showRightIcon && (
                <CheckIcon ml={2.5} color='inherit' h={iconSize} w={iconSize} />
              )}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel p='4' key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </ChakraTabs>
    </Box>
  )
}
