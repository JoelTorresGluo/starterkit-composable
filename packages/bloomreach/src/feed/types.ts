export type CategoryPath = {
  id: string
  name: string
}

export interface BloomreachProduct {
  op: string
  path: string
  value: {
    attributes: {
      title: string
      price: number
      fractionDigits: number
      currency: string
      description: string
      url: string
      thumb_image: string
      category_paths: Array<CategoryPath[]>
      availability: boolean
      [attribute: string]:
        | string
        | string[]
        | number
        | boolean
        | Array<CategoryPath[]>
        | undefined
    }
  }
}
