import Script from 'next/script'

interface GoogleAnalyticsProps {
  googleAnalyticsId?: string
}

export const GoogleAnalyticsScript = ({
  googleAnalyticsId,
}: GoogleAnalyticsProps) => {
  if (!googleAnalyticsId) {
    return null
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      />
      <Script
        id="gtag-ga4"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  send_page_view: true,
                  page_path: window.location.pathname,
                  debug_mode: ${
                    process.env.NODE_ENV === 'development' ? 'true' : 'false'
                  }
                });
              `,
        }}
      />
    </>
  )
}
