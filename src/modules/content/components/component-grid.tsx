import { Box, Grid } from '@chakra-ui/react'
import { ComposableGrid } from '@oriuminc/cms-generic'
import { CmsComponentError, CmsComponentUnknown } from '@oriuminc/ui'
import { ComponentArticleCard } from './component-article-card'
import { ComponentCoverCard } from './component-cover-card'
import { ComponentTextCard } from './component-text-card'
import { ComponentRichText } from './component-rich-text'

export const ComponentGrid = (
  props: ComposableGrid & { priority?: boolean }
) => {
  if (props.contentType !== 'componentGrid') return null

  const { priority = false, columns, gridGap, content } = props

  if (!content || content.length === 0) return null

  const _columns = columns ?? content.filter((item) => item).length

  return (
    <Grid
      gridGap={gridGap || 0}
      alignItems='stretch'
      templateColumns={{
        base: `repeat(${_columns > 2 ? 2 : _columns}, 1fr)`,
        md: `repeat(${_columns > 4 ? 4 : _columns}, 1fr)`,
        lg: `repeat(${_columns > 6 ? 6 : _columns}, 1fr)`,
      }}
    >
      {content.map((contentItem, i) => {
        if (!contentItem) return null
        if (contentItem._errors_) {
          if (process.env.NODE_ENV == 'production') return null
          return (
            <CmsComponentError
              key={contentItem?.id}
              id={contentItem?.id}
              contentType={contentItem?.contentType}
              errors={contentItem?._errors_}
            />
          )
        }

        const _priority = priority && i === 0

        switch (contentItem?.contentType) {
          case 'componentArticleCard': {
            return (
              <ComponentArticleCard
                key={contentItem.id}
                {...contentItem}
                priority={_priority}
              />
            )
          }

          case 'componentCoverCard': {
            return (
              <ComponentCoverCard
                key={contentItem.id}
                {...contentItem}
                priority={_priority}
              />
            )
          }

          case 'componentTextCard': {
            return (
              <ComponentTextCard
                key={contentItem.id}
                {...contentItem}
                priority={_priority}
              />
            )
          }

          case 'richText': {
            return (
              <Box>
                <ComponentRichText key={contentItem.id} {...contentItem} />
              </Box>
            )
          }

          default: {
            if (process.env.NODE_ENV === 'production') return null
            return (
              <CmsComponentUnknown
                id={(contentItem as any)?.id}
                contentType={(contentItem as any)?.contentType}
              />
            )
          }
        }
      })}
    </Grid>
  )
}
