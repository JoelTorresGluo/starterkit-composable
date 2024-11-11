'use client'

import { Stack } from '@chakra-ui/react'
import { SizePicker } from '@oriuminc/templates/product'

interface variationOption {
  variantId: string | number
  label?: string
  disabled?: boolean
  outOfStock?: boolean
  stock?: number
}

export interface DynamicVariantSectionProps {
  value: number
  variantionName: string
  variationOptions?: variationOption[]
  onChange?: (id: string | number) => void
}

export const DynamicVariantSection = ({
  value,
  variantionName,
  variationOptions,
  onChange,
}: DynamicVariantSectionProps) => {
  if (!variationOptions) return null

  return (
    <Stack flex='1' aria-label='Product variants'>
      <SizePicker
        key={variantionName}
        value={value.toString() ?? ''}
        name={variantionName}
        onChange={(val) => onChange?.(val)}
        options={variationOptions.map((data, index) => ({
          key: data.label,
          label: data.label ?? '',
          value: index,
          id: data.variantId,
          stock: data.stock,
        }))}
      />
    </Stack>
  )
}
