import { createClient } from 'contentful'

const previewConfig = {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? 'no-space',
  accessToken:
    process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_ACCESS_TOKEN ??
    'no-access-token',
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
  host: 'preview.contentful.com',
}

const deliveryConfig = {
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID ?? 'no-space',
  accessToken:
    process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ?? 'no-access-token',
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
}

export const initContentfulClient = ({
  isPreview = false,
}: { isPreview?: boolean } = {}) => {
  return createClient(isPreview ? previewConfig : deliveryConfig)
}
