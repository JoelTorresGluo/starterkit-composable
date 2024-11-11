import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { useStoreLocatorInit } from '../hooks/use-store-locator-init'
import { API_KEY } from '../constants'
import { Layout } from '../ui/layout'
import { dataSources, IntegrationProvider } from '../integrations'
import { AsideDrawer } from './aside-drawer'
import { Map } from './map'

export const StoreLocator = () => {
  const { enableAsideDrawer, geolocationAvailable } = useStoreLocatorInit()
  const { Aside } = dataSources()

  return (
    <IntegrationProvider>
      <Wrapper
        apiKey={API_KEY}
        libraries={['places', 'marker']}
        version='beta'
        render={(status) => {
          return <Layout error={status === Status.FAILURE} loading />
        }}
      >
        <Layout
          main={<Map />}
          aside={
            <AsideDrawer enabled={enableAsideDrawer}>
              <Aside />
            </AsideDrawer>
          }
          geolocationAvailable={geolocationAvailable}
        />
      </Wrapper>
    </IntegrationProvider>
  )
}
