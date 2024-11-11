import { Box, Button, Text, Center } from '@chakra-ui/react'
import { useToken } from '@chakra-ui/react'

export const ComponentBannerPreview = ({
  closeRoute,
}: {
  closeRoute: string
}) => {
  const [bgColor, fontColor] = useToken('colors', ['black', 'white'])
  const [boxPadding] = useToken('sizes', ['1'])

  return (
    <Box backgroundColor={bgColor} p={boxPadding}>
      <Center flexWrap='wrap' gap='2'>
        <Text color={fontColor}>Viewing in Live Preview</Text>
        <form action={closeRoute}>
          <Button
            size='md'
            variant='link'
            bgColor={bgColor}
            color={fontColor}
            type='submit'
          >
            Close Preview
          </Button>
        </form>
      </Center>
    </Box>
  )
}
