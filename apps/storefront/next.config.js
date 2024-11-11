const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.contentstack.io' },
      { hostname: 'images.ctfassets.net' },
      { hostname: 'images.cdn.us-central1.gcp.commercetools.com' },
      {
        hostname: '**.ssl.cf1.rackcdn.com',
      },
      {
        hostname:
          'bbb4a369bac2c50dfb98-6bc5a59cd78d90eb75ec315577607655.ssl.cf1.rackcdn.com',
      },
      { hostname: 'cdn.shopify.com' },
    ],
  },
  transpilePackages: [
    '@oriuminc/algolia',
    '@oriuminc/amplience',
    '@oriuminc/base',
    '@oriuminc/chakra',
    '@oriuminc/checkout',
    '@oriuminc/cms-generic',
    '@oriuminc/commerce-generic',
    '@oriuminc/commercetools',
    '@oriuminc/contentful',
    '@oriuminc/contentstack',
    '@oriuminc/shopify',
    '@oriuminc/store-locator',
    '@oriuminc/templates',
    '@oriuminc/ui',
  ],
  // there are differences in how sitemaps are generated in prod/dev. See: https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps#urls
  rewrites: async () => [
    {
      source: '/sitemap/products/sitemap.xml',
      destination:
        process.env.NODE_ENV === 'production'
          ? '/sitemap/products/sitemap/0.xml'
          : '/sitemap/products/sitemap.xml/0',
    },
    {
      source: '/sitemap/products/sitemap-:id.xml',
      destination:
        process.env.NODE_ENV === 'production'
          ? '/sitemap/products/sitemap/:id.xml'
          : '/sitemap/products/sitemap.xml/:id',
    },
    // PDP routes without the variant param will be redirected to the primary one
    {
      source: '/:locale/product/:slug',
      destination: '/:locale/product/:slug/0',
    },
  ],

  // Shopify Redirections (remove if not in use)
  redirects() {
    if (process.env.NEXT_PUBLIC_COMMERCE_PROVIDER === 'shopify') {
      const shopifyStoreName = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

      return [
        {
          source: '/account/dashboard/address',
          destination: `https://${shopifyStoreName}.myshopify.com/account/addresses`,
          permanent: false,
        },
        {
          source: '/account/dashboard/order',
          destination: `https://${shopifyStoreName}.myshopify.com/account`,
          permanent: false,
        },
      ]
    }

    return []
  },

  experimental: {
    // these 2 settings avoid getting throttled by third-party apis
    workerThreads: false,
    cpus: 1,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
