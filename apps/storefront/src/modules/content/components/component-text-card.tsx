import { TextCard } from '@oriuminc/ui'
import { Box } from '@chakra-ui/react'
import { ComposableTextCard } from '@oriuminc/cms-generic'

export const ComponentTextCard = ({
  priority = false,
  image,
  title,
  content,
  ctaLabel,
  ctaHref,
  textAlign,
  theme,
}: ComposableTextCard & { priority?: boolean }) => {
  return (
    <TextCard
      priority={priority}
      image={{
        src: image?.url ?? '',
        alt: image?.title ?? '',
      }}
      title={{
        children: title ?? '',
      }}
      description={{
        children: content ? (
          <Box dangerouslySetInnerHTML={{ __html: content }} />
        ) : undefined,
      }}
      button={{
        children: ctaLabel ?? '',
        href: ctaHref ?? '',
        whiteSpace: 'normal',
      }}
      textAlign={textAlign}
      theme={theme as any}
    />
  )
}
