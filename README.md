# commercetools Utils

Scripts to support new commercetools projects.

### Scripts you can find here

- Initial push of products to commercetools (from a JSON file)
- Initial push of products to Algolia (from published commercetools products)
- Initial push of products to Bloomreach (from published commercetools products).

### Usage

#### Prerequisites
Create the file `apps/commercetools-utils/.env`. This file must contain the following:
```
COMMERCETOOLS_HOST=https://api.us-central1.gcp.commercetools.com
COMMERCETOOLS_AUTH_URL=https://auth.us-central1.gcp.commercetools.com
COMMERCETOOLS_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxx
COMMERCETOOLS_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
COMMERCETOOLS_PROJECT_KEY=xxxxxxxxxxxxxxxxxxx
COMMERCETOOLS_MANIFOLD_STORE_NAME=MANIFOLD
COMMERCETOOLS_SPLASH_STORE_NAME=SPLASH

ALGOLIA_APP_ID=xxxxxxxxxxxxxxxxxxx
ALGOLIA_WRITE_API_KEY=xxxxxxxxxxxxxxxxxxx
ALGOLIA_BASE_INDEX=STARTER_commercetools

#BLOOMREACH
BLOOMREACH_HOST=https://api.connect.bloomreach.com
BLOOMREACH_MANIFOLD_ACCOUNT_ID='xxx'
BLOOMREACH_MANIFOLD_CATALOG_NAME_EN='xxx'
BLOOMREACH_MANIFOLD_CATALOG_NAME_FR='xxx'
BLOOMREACH_MANIFOLD_API_KEY='xxx'
BLOOMREACH_SPLASH_ACCOUNT_ID='xxx'
BLOOMREACH_SPLASH_CATALOG_NAME_EN='xxx'
BLOOMREACH_SPLASH_CATALOG_NAME_FR='xxx'
BLOOMREACH_SPLASH_API_KEY='xxx'
```

***

#### Initial push of products to commercetools
These scripts will push a set a products, from a JSON file, to commercetools.

```
NOTE: We are using commercetools keys with suffixes to make references for channels, product selections and tax categories.
```

##### Run
1. Place the csv products file in `src/products/csvDataFile/SampleData.csv` (there's an sample file included).
2. Run the `commercetools:convert-csvToJson` command. This will generate JSON file in `src/products/products.raw.json`.
3. Run the `commercetools:build-products` command. This will generate another JSON file in `src/products/products.json`.
```
pnpm commercetools:build-products
```

4. Run the `commercetools:push-products` command. This command will execute the push to commercetools.
```
pnpm commercetools:push-products
```


***


#### Initial push of products to Algolia
These scripts will setup Algolia and then get all the products in commercetools to push them into the indexes.

##### Run
1. Run the `algolia:build-indexes` command.  
This will create one primary index per locale, with their corresponding replicas (for sorting).
It will also configure the indexes with the given settings (searchable attributes, facets, rankings).
```
pnpm algolia:build-indexes
```
2. Run the `algolia:push-products` command.
```
pnpm algolia:push-products
```


***


#### Initial push of products to Bloomreach
This script only pushes products to an existing catalog in Bloomreach, this implementation takes into account two stores and supports two languages (en-US and fr-CA) for each store. After pushing products to a catalog an index update is requested.

##### Run
1. Run the `bloomreach:push-products` command.
```
pnpm bloomreach:push-products
```