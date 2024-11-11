// New textStyles category need to be added here
const stringMapping: { [key: string]: string } = {
  'heading.desktop': 'desktop',
  'heading.mobile': 'mobile',
  'figma.linkHeading': 'linkHeading',
  'figma.strikethrough': 'strikethrough',
  body: 'body',
  eyebrow: 'eyebrow',
  link: 'link',
  'ui.button': 'button',
  'ui.buttonGhost': 'buttonGhost',
  'callouts.blockquote': 'blockquote',
  'callouts.pullquote': 'pullquote',
}

export const getTypographyName = (input: string): string => {
  if (!input.includes('.')) return input

  const prefix = input.split('.').slice(0, -1).join('.')
  const suffix = input.split('.').slice(-1)
  return `${stringMapping[prefix] ?? prefix}-${suffix}`
}
