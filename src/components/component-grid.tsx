import { Grid } from '@chakra-ui/react'
import { ComponentArticleCard } from './component-article-card'
import { ComponentCoverCard } from './component-cover-card'
import { ComponentTextCard } from './component-text-card'
import { ComposableGrid } from '@oriuminc/cms-generic'
import { CmsComponentError, CmsComponentUnknown } from '@oriuminc/ui'

export const ComponentGrid = (
  props: ComposableGrid & { priority?: boolean }
) => {
  const { priority = false, content, columns, gridGap } = props

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
      {content.map((component, i) => {
        if (!component) return null
        if (component._errors_) {
          if (process.env.NODE_ENV == 'production') return null
          return (
            <CmsComponentError
              key={component?.id}
              id={component?.id}
              contentType={component?.contentType}
              errors={component?._errors_}
            />
          )
        }

        const _priority = priority && i === 0

        switch (component?.contentType) {
          case 'componentArticleCard': {
            return (
              <ComponentArticleCard
                key={component.id}
                {...component}
                priority={_priority}
              />
            )
          }

          case 'componentCoverCard': {
            return (
              <ComponentCoverCard
                key={component.id}
                {...component}
                priority={_priority}
              />
            )
          }

          case 'componentTextCard': {
            return (
              <ComponentTextCard
                key={component.id}
                {...component}
                priority={_priority}
              />
            )
          }

          default: {
            if (process.env.NODE_ENV === 'production') return null
            return (
              <CmsComponentUnknown
                id={(component as any)?.id}
                contentType={(component as any)?.contentType}
                message={
                  !(component as any)?.contentType
                    ? 'Grid component data was not loaded. Increase the value of "include" in the contentfulPageFetchService'
                    : undefined
                }
              />
            )
          }
        }
      })}
    </Grid>
  )
}
