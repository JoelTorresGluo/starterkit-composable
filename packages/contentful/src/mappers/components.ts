import { ComposablePageComponent } from '@oriuminc/cms-generic'
import { Entry } from 'contentful'

export function parseContentfulPageComponent({
  entry,
  contentType,
}: {
  entry: Entry
  contentType: ComposablePageComponent['contentType']
}) {
  switch (contentType) {
    case 'componentCtProductList':
    case 'componentCtConnector':
      return contentfulCtProductListToComposableCtProductList(
        entry as unknown as any
      )
    case 'componentShopifyProductList':
    case 'componentShopifyConnector':
      return contentfulShopifyProductListToComposableShopifyProductList(
        entry as unknown as any
      )
  }
  return entry
}

function contentfulCtProductListToComposableCtProductList(entry: Entry) {
  return {
    ...entry,
    fields: {
      ...entry.fields,
      productList2: {
        // The Contentful commercetools connector returns a list of ids
        skus: entry.fields.productList,
      },
    },
  } as Entry
}

function contentfulShopifyProductListToComposableShopifyProductList(
  entry: Entry
) {
  return {
    ...entry,
    fields: {
      ...entry.fields,
      productList2: {
        // The Contentful shopify connector returns a list of ids
        ids: entry.fields.productList,
      },
    },
  } as Entry
}
