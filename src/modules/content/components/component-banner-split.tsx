import { BannerSplit } from '@oriuminc/ui'
import { Box } from '@chakra-ui/react'
import { ComposableBannerSplit } from '@oriuminc/cms-generic'

export const ComponentBannerSplit = ({
  priority = false,
  imageDesktop,
  imageMobile,
  eyebrow,
  title,
  content,
  ctaAlphaHref,
  ctaAlphaLabel,
  inverted,
}: ComposableBannerSplit & { priority?: boolean }) => {
  return (
    <BannerSplit
      priority={priority}
      inverted={inverted}
      image={{
        imageDesktop: {
          src: imageDesktop?.url ?? '',
          alt: imageDesktop?.title ?? '',
        },
        imageMobile: {
          src: imageMobile?.url ?? '',
          alt: imageMobile?.title ?? '',
        },
      }}
      text={{
        eyebrow: {
          children: eyebrow,
        },
        title: {
          children: title,
        },
        body: {
          children: content ? (
            <Box dangerouslySetInnerHTML={{ __html: content }} />
          ) : undefined,
        },
        ctaButtonPrimary: {
          children: ctaAlphaLabel,
          href: ctaAlphaHref ?? '',
        },
      }}
    />
  )
}
