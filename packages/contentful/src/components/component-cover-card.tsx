import { Box } from '@chakra-ui/react'
import { ComposableCoverCard } from '@oriuminc/cms-generic'
import { CoverCard } from '@oriuminc/ui'

export const ComponentCoverCard = ({
  priority = false,
  image,
  eyebrow,
  title,
  content,
  href,
  textAlign,
  theme,
}: ComposableCoverCard & { priority?: boolean }) => {
  return (
    <CoverCard
      priority={priority}
      image={{
        src: image?.url ?? '',
        alt: image?.title ?? '',
      }}
      eyebrow={{
        children: eyebrow ?? '',
      }}
      title={{
        children: title ?? '',
      }}
      description={{
        children: content ? (
          <Box dangerouslySetInnerHTML={{ __html: content }} />
        ) : undefined,
      }}
      href={href ?? ''}
      textAlign={textAlign as any}
      theme={theme as any}
    />
  )
}
