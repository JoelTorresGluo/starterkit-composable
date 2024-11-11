import { useInstantSearch, useClearRefinements } from 'react-instantsearch'
import { AsideLayout, AsideLayoutProps } from '../../../ui/aside-layout'
import {
  StoreLocatorRouterValue,
  useStoreLocatorRouter,
} from '../../../hooks/use-store-locator-router'
import { StoreDetails } from '../../../components/store-details'
import { StoreResults } from '../../../components/store-results'
import { Filters } from './filters'

export const Aside = () => {
  const { value, goTo, store } = useStoreLocatorRouter()
  const { results } = useInstantSearch()
  const { refine } = useClearRefinements()

  const title: Record<StoreLocatorRouterValue, string> = {
    map: 'Store Locator',
    results: 'Store Locator',
    filters: 'Filter Locations',
    details: 'Store Details',
    preview: 'Store Locator',
  }

  const backButton: Record<
    StoreLocatorRouterValue,
    AsideLayoutProps['backButton']
  > = {
    map: undefined,
    results: undefined,
    filters: {
      ariaLabel: 'Back to stores list',
      onClick: () => goTo('results'),
    },
    details: {
      ariaLabel: 'Back to stores list',
      onClick: () => goTo('preview', store?.id),
    },
    preview: undefined,
  }

  const storeResults = (
    <StoreResults
      notFound={!results.hits.length && results.processingTimeMS > 0}
    />
  )

  const content: Record<StoreLocatorRouterValue, React.ReactElement | null> = {
    map: storeResults,
    results: storeResults,
    filters: null,
    details: store ? <StoreDetails store={store} /> : <></>,
    preview: storeResults,
  }

  return (
    <AsideLayout
      title={title[value]}
      continueButton={
        store
          ? {
              children: 'Start Order',
            }
          : undefined
      }
      cancelButton={
        value !== 'filters'
          ? undefined
          : {
              children: 'Reset',
              onClick: () => {
                refine()
                goTo('map')
              },
            }
      }
      applyButton={
        value !== 'filters'
          ? undefined
          : {
              children: 'Apply',
              onClick: () => {
                goTo('map')
              },
            }
      }
      backButton={backButton[value]}
    >
      <>
        {content[value]}
        <Filters
          rootProps={{ display: value === 'filters' ? 'block' : 'none' }}
        />
      </>
    </AsideLayout>
  )
}
