import { BannerTextOnly } from '@oriuminc/ui'
import { Box } from '@chakra-ui/react'
import { ComposableBannerTextOnly } from '@oriuminc/cms-generic'

export const ComponentBannerTextOnly = ({
  eyebrow,
  title,
  content,
  ctaAlphaHref,
  ctaAlphaLabel,
  centered,
}: ComposableBannerTextOnly) => {
  return (
    <BannerTextOnly
      centered={centered ?? undefined}
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
