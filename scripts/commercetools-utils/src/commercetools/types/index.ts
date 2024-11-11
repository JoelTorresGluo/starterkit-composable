/**
 * This interface should match your products.raw.json file
 */
export interface UnprocessedRawProduct {
  seller: string[]
  type: 'wine' | 'accessories'
  name: string
  brand: string
  price: number
  description: string
  images: string[]
  terroir?: string
  producer_bio?: string
  sku?: string
  classification?: string[]
  varietals?: string[]
  region?: string
}

/**
 * This interface should match your processed products.json file
 */
export interface RawProduct extends UnprocessedRawProduct {
  sku: string
  rating: number
  [index: string]: any
}

export interface RawProducts {
  stores: string[]
  transformedProducts: ProcessedProducts[]
}

export interface ProcessedProducts {
  productType: ProductType
  mainCategory: string
  products: RawProduct[]
}

export type ResourceRef<T> =
  | { key: string; id?: string }
  | ({ id: string; key?: string } & { typeId: T })

export interface ProductType {
  name: string
  description: string
  attributes: ProductAttribute[]
}

export type LabelLocation = 'en-US' | 'en-CA' | 'fr-CA' | 'es-MX'

export type LabelAttribute = {
  [index in LabelLocation]?: string
}

interface TypeAttribute {
  name: string
}

export interface ProductAttribute {
  type?: TypeAttribute
  isSearchable?: boolean
  inputHint?: string
  name?: string
  label: LabelAttribute
  isRequired?: boolean
  attributeConstraint?: string
}

export type SavedRawProduct = RawProduct & {
  id: string
}

export interface GetProductTemplate {
  productTypeId: string
  categories: string[]
  product: RawProduct
}

export interface CTAttributePayload {
  name: string
  value: string
}

export interface CTPricesPayload {
  value: PriceValue
}

export interface CTProductPayload {
  version: number
  productType: ResourceRef<'product-type'>
  name: {
    [index: string]: string
  }
  description: {
    [index: string]: string
  }
  slug: {
    [index: string]: string
  }
  key: string
  categories: ResourceRef<'category'>[]
  masterVariant: {
    sku: string
    attributes: CTAttributePayload[]
    prices: CTPricesPayload[]
  }
  variants?: any
  taxCategory: ResourceRef<'tax-category'>
}

export interface CTCreateCategoryPayload {
  name: {
    [locale: string]: string
  }
  slug: {
    [locale: string]: string
  }
  parent?: ResourceRef<'category'>
}

export type UpdateAction = {
  action: string
  [key: string]: any
}

export interface CTProductActionPayload {
  version: number
  actions: UpdateAction[]
}

export interface CTProductInProductSelection {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: LastModifiedBy
  createdBy: CreatedBy
  productType: ProductType
  masterData: MasterData
  lastVariantId: number
}

export interface LastModifiedBy {
  clientId: string
  isPlatformClient: boolean
}

export interface CreatedBy {
  clientId: string
  isPlatformClient: boolean
}

export interface MasterData {
  current: Current
  staged: Staged
  published: boolean
  hasStagedChanges: boolean
}

export interface Current {
  name: Name
  description: Description
  categories: Category[]
  categoryOrderHints: CategoryOrderHints
  slug: Slug
  masterVariant: MasterVariant
  variants: any[]
  searchKeywords: SearchKeywords
}

export interface Name {
  [lang: string]: string
}

export interface Description {
  [lang: string]: string
}

export interface Category {
  typeId: string
  id: string
  obj: Obj
}

export interface Obj {
  id: string
  version: number
  versionModifiedAt: string
  lastMessageSequenceNumber: number
  createdAt: string
  lastModifiedAt: string
  lastModifiedBy: LastModifiedBy
  createdBy: CreatedBy
  name: Name
  slug: Slug
  ancestors: any[]
  orderHint: string
  assets: any[]
}

export interface Slug {
  [lang: string]: string
}

export interface CategoryOrderHints {}

export interface MasterVariant {
  id: number
  sku: string
  prices: Price[]
  images: Image[]
  attributes: Attribute[]
  assets: any[]
}

export interface Price {
  id: string
  value: PriceValue
}

export interface PriceValue {
  type: string
  currencyCode: 'USD' | 'CAD' | 'MXN'
  centAmount: number
  fractionDigits: number
}

export interface Image {
  url: string
  dimensions: Dimensions
}

export interface Dimensions {
  w: number
  h: number
}

export interface Attribute {
  name: string
  value: any
}

export type Locale = {
  languageCode: 'en' | 'fr' | 'es'
  countryLanguageCode: 'en-US' | 'en-CA' | 'fr-CA' | 'es-MX'
  currency: 'USD' | 'CAD' | 'MXN'
}

export interface SearchKeywords {}

export interface Staged {
  name: Name
  description: Description
  categories: Category[]
  categoryOrderHints: CategoryOrderHints
  slug: Slug
  masterVariant: MasterVariant
  variants: any[]
  searchKeywords: SearchKeywords
}

export interface ProjectSettings {
  currencies?: string[]
  languages?: string[]
  countries?: string[]
  storefrontSearch?: boolean
  ordersSearch?: boolean
  countryTaxRateFallback?: boolean
}

export interface ShippingSettings {
  zones?: {
    name: string
    countries: string[]
  }[]
  shippingMethods?: {
    isDefault?: boolean
    name: string
    localizedDescription?: {
      [locale: string]: string
    }
    rates: {
      [currency: string]: number
    }
  }[]
}
