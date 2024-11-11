import { ReactElement } from 'react'
import { Box, Button, ButtonProps, useToken } from '@chakra-ui/react'

export interface AsideLayoutProps {
  title: string
  children: ReactElement | null
  continueButton?: ButtonProps
  cancelButton?: ButtonProps
  applyButton?: ButtonProps
  backButton?: ButtonProps & {
    ariaLabel: string
    onClick: () => void
  }
}

export const AsideLayout = ({
  children,
  title,
  continueButton,
  cancelButton,
  applyButton,
  backButton,
}: AsideLayoutProps) => {
  const hasFooter = continueButton || (cancelButton && applyButton)
  const [sizePx, size12] = useToken('sizes', ['sizes.px', 'sizes.12'])

  return (
    <Box h='full' display='flex' flexDirection='column'>
      <Box position='relative'>
        {backButton && (
          <Button
            aria-label={backButton.ariaLabel}
            variant='unstyled'
            position='absolute'
            zIndex={2}
            top={`calc(${sizePx} * 3)`}
            left={`calc(${sizePx} * 3)`}
            // TODO: Replace pixel values with token.
            w='42px'
            h='42px'
            display='flex'
            alignItems='center'
            justifyContent='center'
            onClick={() => backButton.onClick()}
          >
            <svg width='10' height='16' viewBox='0 0 10 16' fill='none'>
              <path
                d='M8.375 1.25L1.625 8L8.375 14.75'
                stroke='#111111'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Button>
        )}

        <Box
          h='12'
          textStyle='mobile-200'
          fontWeight='700'
          display='flex'
          alignItems='center'
          justifyContent='center'
          borderBottom='sm'
          borderBottomColor='shading.200'
        >
          <Box visibility={{ base: 'hidden', md: 'visible' }}>{title}</Box>
        </Box>
      </Box>
      <Box
        flexGrow='1'
        // TODO: Replace pixel value with token.
        maxH={
          hasFooter ? `calc(100% - ${size12} - 70px)` : `calc(100% - ${size12})`
        }
      >
        {children}
      </Box>

      {continueButton && (
        <Box
          position={{ base: 'fixed', md: 'static' }}
          bottom='none'
          left='none'
          w='full'
          // TODO: Replace pixel value with token.
          h='70px'
          px='6'
          display='flex'
          alignItems='center'
          justifyContent='center'
          justifyItems='center'
          bg='white'
          // TODO: Replace box shadow value with token.
          boxShadow='0 -3px 5px rgba(0, 0, 0, 0.07)'
        >
          <Button type='button' w='full' {...continueButton} />
        </Box>
      )}

      {cancelButton && applyButton && (
        <Box
          position={{ base: 'fixed', md: 'static' }}
          bottom='none'
          left='none'
          w='full'
          // TODO: Replace pixel value with token.
          h='70px'
          px='6'
          display='flex'
          alignItems='center'
          justifyContent='center'
          justifyItems='center'
          bg='white'
          // TODO: Replace box shadow value with token.
          boxShadow='0 -3px 5px rgba(0, 0, 0, 0.07)'
        >
          <Button
            type='button'
            w='50%'
            variant='outline'
            {...cancelButton}
            mr='3'
          />
          <Button type='button' w='50%' {...applyButton} ml='3' />
        </Box>
      )}
    </Box>
  )
}
