import {
  Box,
  Container,
  List,
  ListItem,
  SimpleGrid,
  Text,
  LinkProps,
} from '@chakra-ui/react'
import { Link } from '@chakra-ui/next-js'
import { MegaMenuItemProps } from './MegaMenuItem'

export const MegaMenuContentColumns = (props: {
  data?: (MegaMenuItemProps | null | undefined)[]
  linkProps: LinkProps
  prefetchChildNavs: boolean | undefined
}) => {
  return (
    <Container p='10' maxW='container.lg'>
      <SimpleGrid w='full' columns={4} spacing='10'>
        {props.data?.map((el, idx) => {
          if (!el) return null
          const key = el.id
          return (
            <MegaMenuContentColumnsColumn
              key={`${idx}-${key}`}
              data={el}
              level={0}
              linkProps={props.linkProps}
              prefetchChildNavs={props.prefetchChildNavs}
            />
          )
        })}
      </SimpleGrid>
    </Container>
  )
}

const MegaMenuContentColumnsColumn = (props: {
  data: MegaMenuItemProps
  linkProps: LinkProps
  level?: number
  prefetchChildNavs: boolean | undefined
}) => {
  const { label, href, children = [] } = props.data ?? {}
  const level = props.level ?? 1
  const hasChildren = children.length > 0
  return (
    <>
      {hasChildren ? (
        <Box>
          <Text
            mb='3'
            fontWeight='bold'
            as={!!level ? 'h3' : 'h2'}
            fontSize={!!level ? 'sm' : 'md'}
            color='gray.600'
          >
            {label}
          </Text>
          <List aria-hidden={false} aria-label={`${label} submenu`}>
            {children?.map((el, idx) => {
              if (!el) return null
              return (
                <ListItem key={`${idx}-${el.href}`}>
                  <MegaMenuContentColumnsColumn
                    data={el}
                    level={level}
                    linkProps={props.linkProps}
                    prefetchChildNavs={props.prefetchChildNavs}
                  />
                </ListItem>
              )
            })}
          </List>
        </Box>
      ) : (
        <Link
          prefetch={props.prefetchChildNavs}
          href={href}
          tabIndex={0}
          py='1'
          display='inline-block'
          color='gray.800'
          fontSize='sm'
          {...props.linkProps}
        >
          {label}
        </Link>
      )}
    </>
  )
}
