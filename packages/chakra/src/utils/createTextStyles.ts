export interface TextStyleItem {
  fontFamily: string
  fontWeight: string
  lineHeight: string
  fontSize: string
  letterSpacing: string
  paragraphSpacing: string
  paragraphIndent: string
  textCase: string
  textDecoration: string
}

export interface TransformedFormat {
  fontFamily: string
  fontWeight: string
  lineHeight: string
  fontSize: string
  letterSpacing: string
  textIndent: string
  textTransform: string
  textDecoration: string
}

type StyleTuple = [string, OriginalTextStyle]

interface OriginalTextStyle {
  [key: string]: TextStyleItem
}

interface TransformedTextStyle {
  [key: string]: TransformedFormat
}

const transformTextStyle = (
  prefix: string,
  originalJson: OriginalTextStyle
): TransformedTextStyle => {
  return Object.fromEntries(
    Object.keys(originalJson).map((key) => {
      const originalFormat: TextStyleItem = originalJson[key]
      const transformedKey = `${prefix}-${key}`
      const transformedValue = {
        fontFamily: originalFormat.fontFamily,
        fontWeight: originalFormat.fontWeight,
        lineHeight: originalFormat.lineHeight,
        letterSpacing: originalFormat.letterSpacing,
        textIndent: originalFormat.paragraphIndent,
        textTransform: originalFormat.textCase,
        textDecoration: originalFormat.textDecoration,
        fontSize: originalFormat.fontSize,
      }
      return [transformedKey, transformedValue]
    })
  )
}

/**
 * Creates a text style object from the given text style tokens.
 * New textStyles category need to be added here
 *
 * @param tokens - Figma token json object.
 * @returns The textStyles object.
 */
export const createTextStyles = (
  tokens: any
): Record<string, TransformedFormat> => {
  return [
    ['desktop', tokens.heading.desktop],
    ['mobile', tokens.heading.mobile],
    ['linkHeading', tokens.figma.linkHeading],
    ['strikethrough', tokens.figma.strikethrough],
    ['body', tokens.body],
    ['eyebrow', tokens.eyebrow],
    ['link', tokens.link],
    ['button', tokens.ui.button],
    ['buttonGhost', tokens.ui.buttonGhost],
    ['blockquote', tokens.callouts.blockquote],
    ['pullquote', tokens.callouts.pullquote],
  ].reduce(
    (acc, [key, value]) => ({
      ...acc,
      ...transformTextStyle(key, value),
    }),
    {}
  )
}
