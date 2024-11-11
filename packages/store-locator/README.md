# Store Locator

## Features

- Interactive Google Maps interface.
- Pins on the map indicating different stores.
- UI Components for listing, sorting, and filtering Stores for easy navigation and selection.
- Bookmarks feature for saving favorite stores.
- Selecting a store in the list or map pin highlights the store.
- Store Details UI.
- Store "opening hours" feature (supports: intervals, "holidays" (`open_overrides`) and timezones).
- Responsive design for optimal viewing on different devices.
- Static and Dynamic (with Algolia) integrations.
- Uses browser Geolocation API for finding the user's location.

## Usage

- Define the Google Maps API key in the `.env` file.
- Render the `StoreLocator` component in your app.

### Example:

```tsx
// pages/store-locator.tsx

import { StoreLocator } from '@oriuminc/store-locator'

export default StoreLocator
```

## Integrations

This applicaiton uses local static demo data stored in `src/mock-data/stores.json` for demonstration purposes. An example Algolia integration is also provided.

In a customer deployment context, the Store information should be managed externally, such as in a CMS or Commerce API to facilitate maintaince by business users. The Store information should also be synced with a Search service, such as Algolia.

### Demo Data (default)

The default data source uses provided static demo data `src/mock-data/stores.json` as the source for Store information. Search, filters, and sorting are not available, but the components are still rendered as placeholders/examples. The data model used for the mocked Stores should be used as a starting point and modified to what each project requires.

```
// .env
NEXT_PUBLIC_STORE_LOCATOR_INTEGRATION = static
```

### Algolia

This application provides an Algolia integration to power the search and filtering of the demo data. If you wish to take advantage of the Algolia integration (search, filters, geolocation sorting); you'll need to [configure Algolia](#algolia-configuration).

```
// .env
NEXT_PUBLIC_STORE_LOCATOR_INTEGRATION = algolia
```

#### Algolia Configuration

- Create an index.
- Import your data (feel free to use the `src/mock-data/stores.json` file).
- Configure searchable attributes.
- Configure facets/filters (using `service_options`, `offerings`, `dining_options` attributes as examples; feel free to rename/add/remove).

#### Algolia .env Variables

Update your `.env` file with your Algolia keys:

```
NEXT_PUBLIC_STORE_LOCATOR_ALGOLIA_INDEX_NAME=
NEXT_PUBLIC_STORE_LOCATOR_ALGOLIA_APP_ID=
NEXT_PUBLIC_STORE_LOCATOR_ALGOLIA_API_KEY=
```

## Development

### Dev mode

Store Locator will be in "dev mode" if `process.env.NODE_ENV` is set to `development`.

The "dev mode" currently mocks the user's latitude/longitude.

To enforce "dev mode" in production builds, define the following in the `.env` file:

```
NEXT_PUBLIC_STORE_LOCATOR_DEV_MODE=1
```

For disabling/extending the "dev mode" feature, please check the `DEV_MODE` constant usages.

### Codebase

#### `components/`

These components are Store Locator specific. Logic is abstracted to hooks.

#### `hooks/`

Store Locator logic.

- `use-aside-drawer.ts`: Aside drawer handler (used for the mobile version).
- `use-data-urls.ts`: Helper hook for generating icons/images with data URLs.
- `use-map-api`: Hook to access the Google Maps API and its services.
- `use-map-init`: Store Locator map initialization.
- `use-store-locator-router`: Store Locator router.
- `use-stores`: Store Locator stores handler. You can handle the rendering of stores/bookmarks from here.
- `use-select-store`: This hook provides the `handleSelectStore` function to select a store.
- `use-user-geo-init`: Initializes the user geolocation.
- `use-user-lat-lng`: Hook to access the user's latitude/longitude.

#### `integrations/`

Backend integrations. Currently, there are two options: "static" and "algolia".

Switch between them by changing the `NEXT_PUBLIC_STORE_LOCATOR_INTEGRATION` constant in the `.env` file.

Before going live, please delete unused integrations to reduce the Store Locator bundle size.

#### `mock-data/`

Mock data for testing and static integration.

#### `ui/`

- Stateless UI components that depend exclusively on props to render UI.

### `utils/`

Helper functions.

## .env.example

```
NEXT_PUBLIC_STORE_LOCATOR_GOOGLE_MAPS_API_KEY={your-google-maps-api-key}
NEXT_PUBLIC_STORE_LOCATOR_INTEGRATION=algolia
NEXT_PUBLIC_STORE_LOCATOR_ALGOLIA_INDEX_NAME=stores
NEXT_PUBLIC_STORE_LOCATOR_ALGOLIA_APP_ID=Y840O8T3C6
NEXT_PUBLIC_STORE_LOCATOR_ALGOLIA_API_KEY={your-algolia-api-key}
NEXT_PUBLIC_STORE_LOCATOR_DEV_MODE=1
```
