export const parseUrlTemplate = (urlTemplateString?: string | null) => {
  const templateValue = process.env.NEXT_PUBLIC_BRAND_PICKER_URL_TEMPLATE_VALUE
  if (!templateValue) return urlTemplateString
  const templateRegexToReplace = /{{(\w|-)*?}}/
  return urlTemplateString?.replace(templateRegexToReplace, templateValue)
}
