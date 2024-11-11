import { Twitter } from 'next-seo/lib/types'

export const getTwitterMetaTag = () => {
  const SOCIAL_X_HANDLE = process.env.NEXT_PUBLIC_SOCIAL_X_HANDLE

  if (SOCIAL_X_HANDLE) {
    const twitter: Twitter = {
      cardType: 'summary_large_image',
      //your oraganization's twitter @username
      site: SOCIAL_X_HANDLE,
    }

    return twitter
  }
}
