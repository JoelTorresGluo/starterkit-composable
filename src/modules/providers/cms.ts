/**
 * Keep this file here, the CLI init command targets this location.
 * The CLI deletes this and its references changes to the actual CMS package.
 *
 */
import { contentstackProvider } from '@oriuminc/contentstack'
import { GetCmsContext, UseCmsLivePreview } from '@oriuminc/cms-generic'
import { contentfulProvider } from '@oriuminc/contentful'

type CmsProvider = 'contentful' | 'contentstack' | 'amplience'
type ImplementedCommerceProvider = Extract<
  CmsProvider,
  'contentstack' | 'contentful'
>

const provider = (process.env.NEXT_PUBLIC_CMS_PROVIDER ||
  'contentstack') as CmsProvider

interface CmsProviderProperties {
  getContext: GetCmsContext
  useCmsLivePreview?: UseCmsLivePreview
  useCmsLivePreviewAppRouter?: UseCmsLivePreview
}

const cmsProviders: Record<ImplementedCommerceProvider, CmsProviderProperties> =
  {
    contentstack: contentstackProvider,
    contentful: contentfulProvider,
    // amplience: amplienceInterface,
    // mocked: mockedInterface
  }

export const cmsProvider = cmsProviders[provider as ImplementedCommerceProvider]
