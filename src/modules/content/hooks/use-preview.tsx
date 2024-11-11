'use client'

import { cmsProvider } from '@modules/providers/cms'

export const useCMSPreview = ({
  previewData,
  onUpdatePreview,
  onExitPreview,
}: {
  previewData?: any
  onUpdatePreview?: () => void
  onExitPreview?: () => void
}) => {
  const { isPreview, isLoadingPreview } =
    cmsProvider.useCmsLivePreviewAppRouter?.({
      previewData,
      onUpdatePreview,
      onExitPreview,
    }) ?? {}
  return {
    isPreview: isPreview ?? false,
    isLoadingPreview: isLoadingPreview ?? false,
  }
}
