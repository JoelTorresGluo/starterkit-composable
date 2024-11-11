// Static
import { StaticProvider } from './static/static-provider'
import { Toolbar as ToolbarStatic } from './static/toolbar'
import { Aside as AsideStatic } from './static/aside'

// Algolia
import { AlgoliaProvider } from './algolia/components/algolia-provider'
import { Aside as AsideAlgolia } from './algolia/components/aside'
import { Toolbar as ToolbarAlgolia } from './algolia/components/toolbar'

// Types
export type IntegrationValue = 'algolia' | 'static'

// Integration value
const INTEGRATION_VALUE: IntegrationValue =
  (process.env.NEXT_PUBLIC_STORE_LOCATOR_INTEGRATION as IntegrationValue) ||
  'static'

// Data Sources Container
export const IntegrationProvider = (props: {
  children: React.ReactElement
}) => {
  if (INTEGRATION_VALUE === 'algolia') {
    return <AlgoliaProvider>{props.children}</AlgoliaProvider>
  }

  if (INTEGRATION_VALUE === 'static') {
    return <StaticProvider>{props.children}</StaticProvider>
  }

  return props.children
}

const algoliaComponents = {
  Aside: AsideAlgolia,
  Toolbar: ToolbarAlgolia,
} as const

const staticComponents = {
  Aside: AsideStatic,
  Toolbar: ToolbarStatic,
} as const

export const dataSources = () =>
  ((
    {
      algolia: algoliaComponents,
      static: staticComponents,
    } as const
  )[INTEGRATION_VALUE])
