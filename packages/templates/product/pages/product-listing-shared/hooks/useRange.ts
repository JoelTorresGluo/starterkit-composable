import { useState, useEffect } from 'react'

interface UseRangeOptions {
  min: number
  max: number
}

interface UseRangeReturn {
  refineRange: (value: number[]) => void
  currentRange: number[]
  range: { min: number; max: number }
  canRefine: boolean
}

export const useRange = ({ min, max }: UseRangeOptions): UseRangeReturn => {
  const [range, setRange] = useState({ min, max })
  const [currentRange, setCurrentRange] = useState<number[]>([min, max])
  const [canRefine, setCanRefine] = useState(true) // You can set logic to determine this

  useEffect(() => {
    // Initialize or re-initialize when min or max changes
    setRange({ min, max })
    setCurrentRange([min, max])
  }, [min, max])

  const refineRange = (value: number[]) => {
    setCurrentRange(value)
  }

  return {
    refineRange,
    currentRange,
    range,
    canRefine,
  }
}
