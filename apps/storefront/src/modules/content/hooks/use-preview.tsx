'use client'

import { contentfulProvider } from '@oriuminc/contentful'

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
    contentfulProvider.useCmsLivePreviewAppRouter?.({
      previewData,
      onUpdatePreview,
      onExitPreview,
    }) ?? {}
  return {
    isPreview: isPreview ?? false,
    isLoadingPreview: isLoadingPreview ?? false,
  }
}
