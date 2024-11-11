import React, { useEffect, useRef } from 'react'
import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { dataSources } from '../../integrations'
import { StoreList } from './store-list'
import { StoreBookmarkList } from './store-bookmark-list'
import { useStores } from '../../hooks/use-stores'

export interface StoreResultsProps {
  notFound?: boolean
}

export const StoreResults = ({ notFound }: StoreResultsProps) => {
  const { bookmarks } = useStores()
  const { Toolbar } = dataSources()

  return (
    <Box h='full' overflow='auto' display='flex' flexDirection='column'>
      <Toolbar />
      <Tabs>
        <TabList px={[4, null, 8]}>
          <Tab>Nearby</Tab>
          <Tab>
            Favourites {bookmarks.length ? `(${bookmarks.length})` : ''}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel px={0} py={0}>
            <StoreList notFound={notFound} />
          </TabPanel>
          <TabPanel px={0} py={0}>
            <StoreBookmarkList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}
