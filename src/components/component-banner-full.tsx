import { Box } from '@chakra-ui/react'
import { ComposableBannerFull } from '@oriuminc/cms-generic'
import { BannerFull } from '@oriuminc/ui'

export const ComponentBannerFull = ({
  priority = false,
  imageDesktop,
  imageMobile,
  eyebrow,
  title,
  content,
  ctaAlphaHref,
  ctaAlphaLabel,
  ctaBetaHref,
  ctaBetaLabel,
  linkLabel1,
  linkHref1,
  linkLabel2,
  linkHref2,
  linkLabel3,
  linkHref3,
  linkLabel4,
  linkHref4,
  linkLabel5,
  linkHref5,
  linkLabel6,
  linkHref6,
  theme,
  textPosition,
}: ComposableBannerFull & { priority?: boolean }) => {
  const links = [
    { label: linkLabel1, href: linkHref1 },
    { label: linkLabel2, href: linkHref2 },
    { label: linkLabel3, href: linkHref3 },
    { label: linkLabel4, href: linkHref4 },
    { label: linkLabel5, href: linkHref5 },
    { label: linkLabel6, href: linkHref6 },
  ]

  return (
    <BannerFull
      priority={priority}
      theme={theme as any}
      textPosition={textPosition as any}
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
        ctaButtonSecondary: {
          children: ctaBetaLabel,
          href: ctaBetaHref ?? '',
        },
        ctaLinkItems: links
          .filter((el) => el.label)
          .map((el) => {
            return {
              children: el.label,
              href: el.href ?? '',
            }
          }),
      }}
    />
  )
}
