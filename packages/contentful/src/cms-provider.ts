import { GetCmsContext, UseCmsLivePreview } from '@oriuminc/cms-generic'
import { useContentfulLivePreview } from './hooks'
import { useContentfulLivePreviewAppRouter } from './hooks/use-contentful-live-preview-app-router'
import { getContentfulCmsContext } from './utils'

interface CmsProviderProperties {
  getContext: GetCmsContext
  useCmsLivePreview?: UseCmsLivePreview
  useCmsLivePreviewAppRouter: UseCmsLivePreview
}

export const contentfulProvider: CmsProviderProperties = {
  getContext: () => getContentfulCmsContext(),
  useCmsLivePreview: useContentfulLivePreview,
  useCmsLivePreviewAppRouter: useContentfulLivePreviewAppRouter,
}
