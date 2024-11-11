import { ArticleCard } from '@oriuminc/ui'
import { Box } from '@chakra-ui/react'
import { ComposableArticleCard } from '@oriuminc/cms-generic'

export const ComponentArticleCard = ({
  priority = false,
  image,
  eyebrow,
  title,
  content,
  href,
  textAlign,
}: ComposableArticleCard & { priority?: boolean }) => {
  return (
    <ArticleCard
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
      textAlign={textAlign}
    />
  )
}
