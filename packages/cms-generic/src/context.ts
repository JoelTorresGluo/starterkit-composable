import { CmsClient } from './client'

export interface CmsContext {
  client: CmsClient
}

export type GetCmsContext = () => Promise<CmsContext>

export type UseCmsLivePreview<PreviewData = any> = (props: {
  previewData?: PreviewData
  onUpdatePreview?: () => void
  onExitPreview?: () => void
}) => {
  isPreview: boolean
  isLoadingPreview: boolean
}
