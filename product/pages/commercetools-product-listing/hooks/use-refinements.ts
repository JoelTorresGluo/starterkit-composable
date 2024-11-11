import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { VALID_REFINEMENT_KEYS } from '../constants'

export interface RangeParams {
  name: string
  range: [number, number]
}

const SortParamsSchema = yup.object({
  sortBy: yup.string().required(),
  sortOrder: yup.string().oneOf(['asc', 'desc']).required(),
})

const RefinementKeySchema = yup.string().oneOf(VALID_REFINEMENT_KEYS).required()

const RefinementParamsSchema = yup.object({
  param: RefinementKeySchema,
  value: yup.string().required(),
  checked: yup.boolean(),
})

type SortParams = yup.InferType<typeof SortParamsSchema>
type RefinementKey = yup.InferType<typeof RefinementKeySchema>
type RefinementParams = yup.InferType<typeof RefinementParamsSchema>

export const useRefinements = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateUrl = (updatedParams: URLSearchParams) => {
    updatedParams.sort()

    router.push({ pathname, search: updatedParams.toString() }, undefined, {
      shallow: true,
    })
  }

  const handleSort = ({ sortBy, sortOrder }: SortParams) => {
    const updatedParams = new URLSearchParams(searchParams)
    const isValid = SortParamsSchema.isValidSync({ sortBy, sortOrder })

    if (isValid) {
      updatedParams.set('sortBy', sortBy)
      updatedParams.set('sortOrder', sortOrder)
    } else {
      updatedParams.delete('sortBy')
      updatedParams.delete('sortOrder')
    }

    updateUrl(updatedParams)
  }

  const handleRangeChange = ({ name, range }: RangeParams) => {
    if (!name) return

    const updatedParams = new URLSearchParams(searchParams)
    const [min, max] = range

    updatedParams.set(name, `${min}-${max}`)

    updateUrl(updatedParams)
  }

  const handleRefinement = ({ param, value, checked }: RefinementParams) => {
    const updatedParams = new URLSearchParams(searchParams)
    const isValid = RefinementParamsSchema.isValidSync({ param, value })

    if (isValid && checked) {
      updatedParams.append(param, value)
    } else {
      updatedParams.delete(param, value)
    }

    updateUrl(updatedParams)
  }

  const handleClearSingleRefinement = (param: RefinementKey, value: string) => {
    if (!param || !value) {
      return
    }

    const updatedParams = new URLSearchParams(searchParams)
    updatedParams.delete(param, value)

    updateUrl(updatedParams)
  }

  const handleClearAllRefinement = () => {
    const updatedParams = new URLSearchParams(searchParams)

    for (const name of updatedParams.keys()) {
      if (VALID_REFINEMENT_KEYS.includes(name)) {
        updatedParams.delete(name)
      }
    }

    updateUrl(updatedParams)
  }

  return {
    handleSort,
    handleRangeChange,
    handleRefinement,
    handleClearAllRefinement,
    handleClearSingleRefinement,
  }
}
