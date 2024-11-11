import { TransformedFormat } from '.'

export const mergeTextStyles = ({
  baseStyle,
  mdStyle,
}: {
  baseStyle: TransformedFormat
  mdStyle: TransformedFormat
}): { [key: string]: { base: string; md: string } } => {
  return {
    fontFamily: { base: baseStyle.fontFamily, md: mdStyle.fontFamily },
    fontWeight: { base: baseStyle.fontWeight, md: mdStyle.fontWeight },
    lineHeight: { base: baseStyle.lineHeight, md: mdStyle.lineHeight },
    fontSize: { base: baseStyle.fontSize, md: mdStyle.fontSize },
    letterSpacing: { base: baseStyle.letterSpacing, md: mdStyle.letterSpacing },
    textIndent: { base: baseStyle.textIndent, md: mdStyle.textIndent },
    textTransform: { base: baseStyle.textTransform, md: mdStyle.textTransform },
    textDecoration: {
      base: baseStyle.textDecoration,
      md: mdStyle.textDecoration,
    },
  }
}
