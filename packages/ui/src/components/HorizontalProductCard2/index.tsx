import {
  HorizontalProductCardEditable,
  HorizontalProductCardEditableProps,
} from './HorizontalProductCardEditable'
import {
  HorizontalProductCardReadOnly,
  HorizontalProductCardReadOnlyProps,
} from './HorizontalProductCardReadOnly'

export type HorizontalProductCard2Props = (
  | HorizontalProductCardEditableProps
  | HorizontalProductCardReadOnlyProps
) & {
  editable?: boolean
}

export const HorizontalProductCard2 = (props: HorizontalProductCard2Props) => {
  const { editable } = props
  return editable ? (
    <HorizontalProductCardEditable {...props} />
  ) : (
    <HorizontalProductCardReadOnly {...props} />
  )
}
