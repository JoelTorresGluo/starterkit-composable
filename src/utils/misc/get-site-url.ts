export const getSiteUrl = () => {
  // for production, define NEXT_PUBLIC_SITEMAP_HOST to the production domain, ex "storefront.composable.com"
  if (process.env.NEXT_PUBLIC_SITEMAP_HOST) {
    return process.env.NEXT_PUBLIC_SITEMAP_HOST
  }

  // Vercel Support
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // Netlify Support
  if (process.env.NEXT_PUBLIC_NETLIFY_URL) {
    return process.env.NEXT_PUBLIC_NETLIFY_URL
  }

  // Localhost
  return `http://localhost:${process.env.PORT ?? 3001}`
}
