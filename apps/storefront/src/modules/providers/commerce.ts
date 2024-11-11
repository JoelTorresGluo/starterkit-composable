/**
 * Keep this file here, the CLI init command targers this location.
 * The CLI deletes this and its references changes to the actual commerce package.
 *
 */
import { CommerceContext } from '@oriuminc/commerce-generic'
import {
  CommerceProviderProperties,
  commercetoolsProvider,
} from '@oriuminc/commercetools'
import { shopifyProvider } from '@oriuminc/shopify'

type CommerceProvider =
  | 'commercetools'
  | 'bigcommerce'
  | 'elasticpath'
  | 'shopify'
  | 'salesforce'

type ImplementedCommerceProvider = Extract<
  CommerceProvider,
  'commercetools' | 'shopify' | 'bigcommerce' | 'elasticpath' | 'salesforce'
>

const provider =
  (process.env.NEXT_PUBLIC_COMMERCE_PROVIDER as CommerceProvider) ||
  'commercetools'

const commerceProviders: Record<CommerceProvider, CommerceProviderProperties> =
  {
    commercetools: commercetoolsProvider,
    shopify: shopifyProvider,
    salesforce: {
      getAppRouterContext: function (): Promise<CommerceContext> {
        throw new Error('Provider not implemented yet.')
      },
      authOptions: undefined,
    },
    bigcommerce: {
      getAppRouterContext: function (): Promise<CommerceContext> {
        throw new Error('Provider not implemented yet.')
      },
      authOptions: undefined,
    },
    elasticpath: {
      getAppRouterContext: function (): Promise<CommerceContext> {
        throw new Error('Provider not implemented yet.')
      },
      authOptions: undefined,
    },
  }

export const commerceProvider = commerceProviders[provider]
