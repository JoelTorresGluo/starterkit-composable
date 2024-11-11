import { GetCmsContext } from '@oriuminc/cms-generic'
import { ContentfulCmsClient } from '../cms-client'

export const getContentfulCmsContext: GetCmsContext = async () => {
  return {
    client: ContentfulCmsClient.getInstance(),
  }
}
