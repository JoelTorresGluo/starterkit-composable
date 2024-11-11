import { Box } from '@chakra-ui/react'
import { useMapInit } from '../hooks/use-map-init'

export const Map = () => {
  // Initialize google maps
  const { ref } = useMapInit()

  return (
    <>
      <Box
        ref={ref}
        id='map'
        w='full'
        sx={{
          // TODO: Replace pixel values with tokens.
          'button.gm-ui-hover-effect': {
            // visibility: 'hidden',
            borderRadius: '999px',
            top: '1px !important',
            right: '1px !important',
          },
          '.gm-style-iw.gm-style-iw-c': {
            padding: '30px 12px 20px !important',
          },
        }}
      />
    </>
  )
}
