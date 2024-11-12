// See https://github.com/i18nexus/next-i18n-router?tab=readme-ov-file#config-options for more information on the configuration options

/** @type {import("next-i18n-router/dist/types").Config} */
const i18nConfig = {
  locales: ['en-US'],
  defaultLocale: 'en-US',
  // prefixDefault: true, // Uncomment this line to prefix the default locale, ex for default 'en-US' the path would be 'storefront.com/en-US/product/123'
}

module.exports = i18nConfig
