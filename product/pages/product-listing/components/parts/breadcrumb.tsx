import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react'
import { useIntl } from 'react-intl'

interface BreadcrumbProps {
  query: string
  isSearchPage?: boolean
}

export const Breadcrumb = ({
  query,
  isSearchPage = false,
}: BreadcrumbProps) => {
  const intl = useIntl()
  return (
    <ChakraBreadcrumb fontSize='sm' color={'gray.600'}>
      <BreadcrumbItem>
        <BreadcrumbLink href='/'>Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink
          href='#'
          textTransform={isSearchPage ? 'none' : 'capitalize'}
        >
          {isSearchPage
            ? intl.formatMessage(
                { id: 'category.breadcrumb.resultsFor' },
                { query }
              )
            : query}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </ChakraBreadcrumb>
  )
}
