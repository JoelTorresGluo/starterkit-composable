import { UseCtConnector } from '@oriuminc/base'
import { PageContentField } from '@oriuminc/cms-generic'

export interface ContentItemsInterface {
  content: PageContentField
  ProductsConnector?: (props: any) => React.ReactElement | null
  useCtConnector?: UseCtConnector
  showPrice?: boolean | null
}

export interface ContentItemByTypeInterface {
  ProductsConnector?: (props: any) => React.ReactElement | null
  useCtConnector?: UseCtConnector
  content: PageContentField[number]
  priority: boolean
  showPrice?: boolean | null
}
