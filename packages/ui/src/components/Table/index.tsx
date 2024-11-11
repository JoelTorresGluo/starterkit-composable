import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

export interface TableProps {
  header: HeaderFormat[]
  tableData: DataFormat[]
  variant: TableVariants
  size: TableSize
}

interface HeaderFormat {
  title: ReactNode
  isNumeric?: boolean
}

interface ObjectType {
  data: ReactNode
  isNumeric?: boolean /* isNumeric aligns the content on right side in styled variants */
}

type DataFormat = ObjectType[]
export type TableVariants = 'simple' | 'striped' | 'unstyled'
export type TableSize = 'sm' | 'md' | 'lg'

export const Table = ({ header, tableData, variant, size }: TableProps) => {
  return (
    <TableContainer>
      <ChakraTable variant={variant} size={size}>
        <Thead>
          <Tr>
            {header?.map((headerItem, i) => (
              <Th key={`th-${i}`} isNumeric={headerItem.isNumeric}>
                {headerItem.title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {tableData?.map((dataItem, i) => {
            return (
              <Tr key={`tr-${i}`}>
                {dataItem.map((item: any, j: number) => {
                  return (
                    <Td key={`tr-${i}-${j}`} isNumeric={item.isNumeric}>
                      {item.data}
                    </Td>
                  )
                })}
              </Tr>
            )
          })}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  )
}
