import {
  CircularProgress as ChakraCircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react'

export interface CircularProgressProps {
  showLabel: boolean
  value: number
}

export const CircularProgress = ({
  showLabel = false,
  value,
}: CircularProgressProps) => {
  return (
    <ChakraCircularProgress value={value} color='primary' textStyle='body-75'>
      {showLabel && <CircularProgressLabel>{value}%</CircularProgressLabel>}
    </ChakraCircularProgress>
  )
}
