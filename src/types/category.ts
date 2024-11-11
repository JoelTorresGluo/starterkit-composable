import { ComposableImage } from './image'

export interface ComposableCategory {
  id: string
  key?: string
  slug: string
  name: string
  description?: string
  image?: ComposableImage
}
