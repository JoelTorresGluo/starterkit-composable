import { getSlug } from '../utils/products'
import { localize } from '../utils/transformations'
import { CTCreateCategoryPayload, ResourceRef } from '../types'

export const createCategoryPayload = (
  categoryName: string,
  parent?: ResourceRef<'category'>
): CTCreateCategoryPayload => ({
  name: localize(categoryName),
  slug: localize(getSlug(categoryName)),
  parent,
})

export const getCategoryPayload = (
  categoryId: string
): ResourceRef<'category'> => ({
  typeId: 'category',
  id: categoryId,
})
