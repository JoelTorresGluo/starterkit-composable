import { Box } from '@chakra-ui/react'
import { ComposableTextCard } from '@oriuminc/cms-generic'
import { TextCard } from '@oriuminc/ui'

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
      textAlign={textAlign as any}
      theme={theme as any}
    />
  )
}
