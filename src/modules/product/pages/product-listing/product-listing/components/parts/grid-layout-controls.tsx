import { Flex, FlexProps } from '@chakra-ui/react'
import {
  GridLargeIcon,
  GridMediumIcon,
  GridSingleIcon,
  GridSmallIcon,
} from '@oriuminc/ui'
import { FunctionComponent } from 'react'
import { LayoutButton } from './layout-button'

export const GridLayoutControls: FunctionComponent<FlexProps> = ({
  ...rest
}) => {
  return (
    <Flex {...rest}>
      <LayoutButton layout='single' icon={<GridSingleIcon />} />
      <LayoutButton layout='comfortable' icon={<GridSmallIcon />} />
      <LayoutButton layout='standard' icon={<GridMediumIcon />} />
      <LayoutButton layout='condensed' icon={<GridLargeIcon />} />
    </Flex>
  )
}
