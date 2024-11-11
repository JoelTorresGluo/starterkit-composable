import { DEFAULT_SORTBY } from './constants'
import {
  getAlgoliaHierarchicalMenu,
  getAlgoliaStateFilters,
  getRouteFilters,
  getRouteHierarchicalMenu,
  getSortByFromIndex,
} from './utils'
import { UiState } from 'instantsearch.js/es/types'
import { AlgoliaFilter, AlgoliaSortByOption } from '@oriuminc/cms-generic'

interface CustomRouteSearchState {
  query?: string
  sort?: string
  page?: number
  [filters: string]: any
}

interface GetSingleIndexRouterProps {
  historyFn: (props: any) => any
  indexName: string
  locale: string
  isSearchPage: boolean
  ignorePaging: boolean
  url: string
  indexNameResolver?: (props: {
    locale: string
    sortBy?: string
    isLoggedIn?: boolean
  }) => string
  filters: AlgoliaFilter[]
  sortByOptions: AlgoliaSortByOption[]
}

export const getStateMapping = (
  props: Omit<GetSingleIndexRouterProps, 'historyFn' | 'url'>
) => {
  return {
    stateToRoute: (uiState: UiState) => stateToRoute(props, uiState) as UiState,
    routeToState: (routeState: CustomRouteSearchState) =>
      routeToState(props, routeState),
  }
}

const stateToRoute = (
  props: Omit<GetSingleIndexRouterProps, 'historyFn' | 'url'>,
  uiState: UiState
): CustomRouteSearchState => {
  const {
    indexName,
    locale,
    isSearchPage,
    ignorePaging,
    indexNameResolver,
    filters,
    sortByOptions,
  } = props
  const indexUiState = uiState[indexName]
  const sort = getSortByFromIndex({
    indexName: indexUiState.sortBy || indexName,
    locale,
    indexNameResolver,
    sortByOptions,
  })
  const refinementList = getRouteFilters(indexUiState.refinementList, filters)
  const hierarchicalMenu = getRouteHierarchicalMenu(
    indexUiState.hierarchicalMenu
  )
  const numericMenu = getRouteFilters(indexUiState.numericMenu, filters)
  const range = getRouteFilters(indexUiState.range, filters)

  return {
    ...hierarchicalMenu,
    ...refinementList,
    ...numericMenu,
    ...range,
    // @ts-ignore
    query: isSearchPage ? indexUiState.configure?.query : undefined,
    sort: sort !== DEFAULT_SORTBY ? sort : undefined,
    page: !ignorePaging ? indexUiState.page : undefined,
  }
}

const routeToState = (
  {
    indexName,
    locale,
    ignorePaging,
    indexNameResolver,
    filters: filtersConfig,
  }: Omit<GetSingleIndexRouterProps, 'historyFn' | 'url'>,
  routeState: CustomRouteSearchState
): UiState => {
  const { query, sort, page, ...rawFilters } = routeState
  const filters = getAlgoliaStateFilters(rawFilters, filtersConfig)
  const hierarchicalMenu = getAlgoliaHierarchicalMenu(rawFilters)

  const indexState: UiState[string] = {
    ...hierarchicalMenu,
    ...filters,
    sortBy: indexNameResolver?.({ locale, sortBy: sort }),
    page: !ignorePaging ? page : undefined,
  }

  if (query) {
    indexState['query'] = query
  }

  return {
    [indexName]: indexState,
  }
}
