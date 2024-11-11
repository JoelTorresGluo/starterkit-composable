'use client'

import { Box, Center, Flex, Text, useToken } from '@chakra-ui/react'
import { useCMSPreview } from '../hooks/use-preview'
import { exitPreview, revalidatePreview } from '@modules/server/preview/actions'

export const CmsPreview = ({ previewData }: { previewData?: any }) => {
  const { isPreview, isLoadingPreview } = useCMSPreview({
    previewData,
    onUpdatePreview: revalidatePreview,
    onExitPreview: exitPreview,
  })
  const [bgColor, fontColor] = useToken('colors', ['black', 'white'])
  const [boxPadding] = useToken('sizes', ['1'])

  if (!isPreview) return null

  return (
    <>
      {isLoadingPreview && <PreviewLoadingOverlay />}

      <Box backgroundColor={bgColor} padding={boxPadding}>
        <Center flexWrap='wrap' gap={2}>
          <Text color={fontColor}>Viewing in Live Preview</Text>
        </Center>
      </Box>
    </>
  )
}

export const PreviewLoadingOverlay = () => {
  return (
    <Flex
      position='fixed'
      top={0}
      left={0}
      width='full'
      height='full'
      backgroundColor='rgba(0, 0, 0, 0.7)'
      justifyContent='center'
      alignItems='center'
      zIndex={9999}
    >
      <Box color='white' fontSize='2rem' fontWeight='bold'>
        Loading Preview...
      </Box>
    </Flex>
  )
}
