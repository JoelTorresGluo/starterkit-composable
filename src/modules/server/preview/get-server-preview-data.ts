import { DRAFT_MODE_DATA_COOKIE_NAME } from '@modules/general'
import { draftMode } from 'next/headers'

export const getServerPreviewData = () => {
  const { isEnabled } = draftMode()
  let previewData = null
  if (isEnabled) {
    /**
     * Next's Draft Mode doesnt allow to access cookies if the route is exporting
     * dynamic = 'force-static'.
     * With this workaround we are able to get cookies if Draft Mode is on.
     */
    previewData = JSON.parse(
      (draftMode() as any)?._provider?._mutableCookies?._parsed?.get(
        DRAFT_MODE_DATA_COOKIE_NAME
      )?.value || 'null'
    )
  }
  return previewData
}
